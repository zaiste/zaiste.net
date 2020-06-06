+++
date = 2012-07-13T00:00:00.000Z
title = "Brand, new rsync for OSX"
[taxonomies]
topics = [ "CLI" ]
+++

[rsync](http://rsync.samba.org/) that comes with OSX Lion is pretty outdated. The easiest way to upgrade it is to use [Homebrew](http://mxcl.github.com/homebrew/) package manager. The formula used to be situated in a separate repository, accessible via `brew tap`. This is no longer needed. `rsync` is now part of `homebrew-core` (thanks redcore)

To install a brand, new rsync version:

```
brew install rsync
```

Voilà!
