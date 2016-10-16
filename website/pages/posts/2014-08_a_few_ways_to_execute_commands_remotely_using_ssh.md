---
created_at: 2014-08-11
kind: article
publish: true
title: "A few ways to execute commands remotely using SSH"
tags:
- ssh
- cli
---

In this article I describe a few ways to execute commands on a remote host using
SSH. If you want to follow along, first set `HOST` variable to your testing
server, optimaly configured with `publickey` authentication.

## Single-line command

Executing a single command:

```
ssh $HOST ls
```

Executing several commands, inlined, separated with `;`

```
ssh $HOST ls; pwd; cat /path/to/remote/file
```

Executing a command with sudo

```
ssh $HOST sudo ls /root
sudo: no tty present and no askpass program specified
```

`sudo` requires interactive shell, it can be enabled with `-t` parameter.

```
ssh -t $HOST sudo ls /root
[sudo] password for zaiste:
```

## Simple multi-line command

```
VAR1="Variable 1"
ssh $HOST '
ls
pwd
if true; then
    echo "True"
    echo $VAR1      # <-- it won't work
else
    echo "False"
fi
'
```

Shell variables won't be expanded with this method.

## Multi-line command with variables expansion

In order to make variables expansion work, use `bash -c`.

```
VAR1="Variable 1"
ssh $HOST bash -c "'
ls
pwd
if true; then
    echo $VAR1
else
    echo "False"
fi
'"
```

## Multi-line command from local script

A local script can be executed against remote machine with a simple `stdin` redirection.

```
cat script.sh
ls
pwd
hostname
```

```
ssh $HOST < script.sh
```

## Multi-line command using Heredoc

Using `heredoc` is probably the most convenient way to execute multi-line
commands on a remote machine. Also, variables expansion works out-of-the-box.

```
VAR1="boo"
ssh -T $HOST << EOSSH
ls
pwd
if true; then
  echo $VAR1
else
  echo "False"
fi
EOSSH
```

If you need to assign variables within the `heredoc` block, put the opening `heredoc`
in single quotes.

```
ssh -T $HOST <<'EOSSH'
VAR1=`pwd`
echo $VAR1

VAR2=$(uname -a)
echo $VAR2

EOSSH
```

The following warning message

```
Pseudo-terminal will not be allocated because stdin is not a terminal.
```

can be disabled by adding `-T` parameter to `ssh` execution.





