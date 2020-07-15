+++
title = "Nix"
[extra]
howtos = true
+++

Nix is a powerful package manager for Linux and other Unix systems that makes package management reliable and reproducible. It allows you to setup self-contained environments for all your development needs, i.e. a more lightweight and less cumbersome alternative to Docker.

`nix-shell -p` means get me into a shell with the following packages in scope

```bash
nix-channel --list
```

```bash
nix search ghc
```

Nix uses a central store located at `/nix/store` where you’ll find every package in use by your current installation.

## Check installed packages

```
nix-env -q
```


## Uninstall a package

```
nix-env -e ruby
```

## Clean the nix store

```
nix-collect-garbage -d
```