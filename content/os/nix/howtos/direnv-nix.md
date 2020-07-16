+++
title = "Use Direnv with Nix"
+++

Install `direnv`

```
nix-env -i direnv
```

Add a `.envrc` at the root of a directory

```
use_nix
```

Run:

```
direnv allow
```

a security measure to prevent arbitrary scripts from being ran without you first allowing them