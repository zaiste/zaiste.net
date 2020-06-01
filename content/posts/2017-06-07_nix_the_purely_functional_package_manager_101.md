
+++
date = 2017-06-07T00:00:00.000Z


title = "Nix: The Purely Functional Package Manager 101"
topics = [ "nix", "macOS", "101" ]

+++

[Nix](https://nixos.org/nix/) is a package manager drawing inspiration from functional programming. It treats packages like values built by pure functions (i.e. no side-effects: packages never change after they have been built). There can be multiple versions or variants of a package installed at the same time. Nix runs on Linux, macOS and other Unix systems. It provides atomic upgrades and rollbacks.

Nix stores packages in the Nix store, by default `/nix/store` with each package having its own unique subdirectory e.g. `/nix/store/b6gvzjyb2pg0kjfwrjmg1vfhh54ad73z-firefox-33.1/` where `b6gvzjy...d73z` is a unique identifier for this package that captures all its dependencies (a cryptographic hash of the package’s build dependency graph). As a result, Nix provides additional reliability: different versions of a package have different paths in the Nix store, any dependencies between them are eliminated. Moreover, upgrading or uninstalling packages cannot break  applications depending on it. Nix will never pollute your `/usr` or `/usr/local`: removing Nix is a matter to deleting that `/nix` directory.

Nix has multi-user support, i.e. non-privileged users can securely install any package. Each user have a profile which corresponds to a subset of packages in the Nix store that appear in that user’s `PATH`. A package installed by several users at the same time will be downloaded only once.

Packages are built from Nix expressions: they describe all dependencies that go into a package build action, i.e. other packages, sources, the build script, environment variables for the build script, etc. Nix tries to ensure that those expressions are deterministic i.e. building a Nix expression twice yields the same result.

Nix can automatically skip building from source and instead use a binary cache, i.e. a server that provides pre-built binaries.

[nixpkgs](https://github.com/NixOS/nixpkgs) is the default source of packages for the nix package manager; it's available on GitHub

* List all the installed packages: `nix-env -q`
* Find a package: `nix-env -qa somepackage`



