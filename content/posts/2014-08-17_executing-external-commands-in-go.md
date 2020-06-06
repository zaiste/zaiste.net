+++
date = 2014-08-17T00:00:00.000Z
title = "Executing external commands in Go"
aliases = [
  "executing_external_commands_in_go"
]
[taxonomies]
topics = [ "Go" ]
+++

Use [os/exec][1] package to execute external commands in Go. To run the
examples packages `os`, `bytes`, `syscall`, `fmt`, `time` must be imported.

```
output, err := exec.Command("echo", "Executing a command in Go").CombinedOutput()
if err != nil {
  os.Stderr.WriteString(err.Error())
}
fmt.Println(string(output))
```

## Environment variables

Expand environment variables

```
cmd := exec.Command("echo", os.Getenv("PATH"))
```
```
cmd := exec.Command("sh", "-c",  "echo $PATH")
```

## Stdout stream

Manually connect a buffer to capture the commands stdout stream.

```
cmd := exec.Command("go", "version")
cmdOutput := &bytes.Buffer{}
cmd.Stdout = cmdOutput
err := cmd.Run()
if err != nil {
  os.Stderr.WriteString(err.Error())
}
fmt.Print(string(cmdOutput.Bytes()))
```

## Exit codes

Output the exit codes of a command

```
cmd := exec.Command("ls", "/foo/bar")
var waitStatus syscall.WaitStatus
if err := cmd.Run(); err != nil {
  if err != nil {
    os.Stderr.WriteString(fmt.Sprintf("Error: %s\n", err.Error()))
  }
  if exitError, ok := err.(*exec.ExitError); ok {
    waitStatus = exitError.Sys().(syscall.WaitStatus)
    fmt.Printf("Output: %s\n", []byte(fmt.Sprintf("%d", waitStatus.ExitStatus())))
  }
} else {
  // Success
  waitStatus = cmd.ProcessState.Sys().(syscall.WaitStatus)
  fmt.Printf("Output: %s\n", []byte(fmt.Sprintf("%d", waitStatus.ExitStatus())))
}
```

## Async

Execute an asynchronous command and send signals to that command's process from
within the application.

```
cmd := exec.Command("cat", "/dev/random")
randomBytes := &bytes.Buffer{}
cmd.Stdout = randomBytes

// Start command asynchronously
err := cmd.Start()
if err != nil {
  os.Stderr.WriteString(err.Error())
}

ticker := time.NewTicker(time.Second)
go func(ticker *time.Ticker) {
  now := time.Now()
  for _ = range ticker.C {
    fmt.Printf("Ticker: %s\n", []byte(fmt.Sprintf("%s", time.Since(now))))
  }
}(ticker)

// Kill the process after 4 seconds
timer := time.NewTimer(time.Second * 4)
go func(timer *time.Timer, ticker *time.Ticker, cmd *exec.Cmd) {
  for _ = range timer.C {
    err := cmd.Process.Signal(os.Kill)
    if err != nil {
      os.Stderr.WriteString(err.Error())
    }
    ticker.Stop()
  }
}(timer, ticker, cmd)

// Wait for the command to finish
cmd.Wait()
fmt.Printf("Result: %d\n", []byte(fmt.Sprintf("%d bytes generated", len(randomBytes.Bytes()))))
```


[1]: http://golang.org/pkg/os/exec/

