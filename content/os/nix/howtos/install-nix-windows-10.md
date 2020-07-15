+++
title = "Install Nix on Windows 10"
[taxonomies]
topics = [ "Nix" ]
+++

Enable [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about) and select the Ubuntu image. Once installed, update its packages:

```
sudo apt update
sudo apt upgrade
```

Create `/etc/nix/nix.conf`:

```
sandbox = false
use-sqlite-wal = false
```

Install Nix

```
curl https://nixos.org/nix/install | sh
```

Test Nix installation:

```
nix-shell -p busybox --run 'echo $PATH'
```