+++
title = "Specify custom environment variables for Nix Shell"
[taxonomies]
topics = [ "Nix" ]
+++

Use `pkgs.stdenv.mkDerivation.shellHook`:

```
{ pkgs ? import <nixpkgs> {}
}:
pkgs.mkShell {
  name = "taskiapp-environment";
  buildInputs = [
    pkgs.postgresql_12
  ];
  shellHook = ''
    export PGDATA=./db/content
  '';
}
```

