+++
date = 2014-11-21T00:00:00.000Z
title = "Executing commands via SSH using Go"
aliases = [
    "executing_commands_via_ssh_using_go"
]
[taxonomies]
topics = [ "Go", "SSH" ]
+++

[Secure Shell (SSH)][1] is a cryptographic network protocol for secure data communication, remote command-line login, remote command execution, and other secure network services between two networked computers.

[go.crypto/ssh][2] is an implementation of SSH protocol in Go.

```
go get golang.org/x/crypto/ssh
```

Connect to specified servers in parallel and execute the given command on all
of them. Finish in 10 seconds all execution and display the results from the
servers that have managed to execute so far. Log in with a name set via `USER`
environment variable. By default, use a port `22`, otherwise set a port number
via `PORT` environment variable.

```
func main() {
    cmd := os.Args[1]
    hosts := os.Args[2:]

    results := make(chan string, 10)
    timeout := time.After(10 * time.Second)

    port := os.Getenv("PORT")
    if len(port) == 0 {
        port = "22"
    }

    config := &ssh.ClientConfig{
        User: os.Getenv("USER"),
        Auth: []ssh.ClientAuth{makeKeyring()},
    }

    for _, hostname := range hosts {
        go func(hostname string, port string) {
            results <- executeCmd(cmd, hostname, port, config)
        }(hostname, port)
    }

    for i := 0; i < len(hosts); i++ {
        select {
        case res := <-results:
            fmt.Print(res)
        case <-timeout:
            fmt.Println("Timed out!")
            return
        }
    }
}
```

Use either `.ssh/id_rsa` or `.ssh/id_dsa` keys to sign in.

```
type SignerContainer struct {
    signers []ssh.Signer
}

func (t *SignerContainer) Key(i int) (key ssh.PublicKey, err error) {
    if i >= len(t.signers) {
        return
    }
    key = t.signers[i].PublicKey()
    return
}

func (t *SignerContainer) Sign(i int, rand io.Reader, data []byte) (sig []byte, err error) {
    if i >= len(t.signers) {
        return
    }
    sig, err = t.signers[i].Sign(rand, data)
    return
}

func makeSigner(keyname string) (signer ssh.Signer, err error) {
    fp, err := os.Open(keyname)
    if err != nil {
        return
    }
    defer fp.Close()

    buf, _ := ioutil.ReadAll(fp)
    signer, _ = ssh.ParsePrivateKey(buf)
    return
}

func makeKeyring() ssh.ClientAuth {
    signers := []ssh.Signer{}
    keys := []string{os.Getenv("HOME") + "/.ssh/id_rsa", os.Getenv("HOME") + "/.ssh/id_dsa"}

    for _, keyname := range keys {
        signer, err := makeSigner(keyname)
        if err == nil {
            signers = append(signers, signer)
        }
    }

    return ssh.ClientAuthKeyring(&SignerContainer{signers})
}
```

`Dial` starts a client connection to the given SSH server. It is a convenience function that connects to the given network address, initiates the SSH handshake, and then sets up a Client.

After establishing the dial up tcp to the remote machine,  we need to establish interactive session.

```
func executeCmd(command, hostname string, port string, config *ssh.ClientConfig) string {
    conn, _ := ssh.Dial("tcp", fmt.Sprintf("%s:%s", hostname, port), config)
    session, _ := conn.NewSession()
    defer session.Close()

    var stdoutBuf bytes.Buffer
    session.Stdout = &stdoutBuf
    session.Run(command)

    return fmt.Sprintf("%s -> %s", hostname, stdoutBuf.String())
}
```

Lastly, necesarry imports are

```
import (
    "bytes"
    "fmt"
    "golang.org/x/crypto/ssh"
    "io"
    "io/ioutil"
    "os"
    "time"
)
```


[1]: https://en.wikipedia.org/wiki/Secure_Shell
[2]: https://godoc.org/golang.org/x/crypto/ssh
