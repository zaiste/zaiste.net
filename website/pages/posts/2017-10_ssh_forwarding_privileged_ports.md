---
created_at: 2017-10-13 
kind: article
publish: true
title: "SSH: Forwarding privileged ports"
tags:
- ssh
- trick
---

Let's assume you have an access to a machine aliased as `tx2` in your `.ssh/config`

```
Host tx2
  Hostname 1.1.1.1
  User zaiste
```

Let's try to forward the port `80`

```
ssh tx2 -L 80:localhost:80
Privileged ports can only be forwarded by root.
```

Let's try to overcome that with `sudo`

```
sudo ssh tx2 -L 80:localhost:80
ssh: Could not resolve hostname tx2: Name or service not known
```

 `tx2` is a host configured in `root`'s `~/.ssh/config`. This can be fixed with `-F` option.

```
sudo ssh -F ~/.ssh/config tx2 -L 80:localhost:80
```

This tries to connect as `root` user and prompts for a password.  

We can use `-l $USER` (or explicitly `-l zaiste`) to set a proper user name. `-E` to sudo preserves the environment allowing a proper SSH agent to be used.

```
sudo -E ssh -F ~/.ssh/config -l $USER tx2 -L 80:localhost:80
```
