
+++
date = 2012-08-01T00:00:00.000Z


title = "Fast way to install Node.js on Linux and OSX"
topics = [ "nodejs", "osx", "linux" ]

+++

The fastest way I know to install [Node.js](http://nodejs.org/) on `*nix` systems is by using [Node
Version Manager](https://github.com/creationix/nvm). This script
helps you as well easily manage multiple [Node.js](http://nodejs.org/) versions.

## Dependencies

For Ubuntu/Debian, install following packages:

```
apt-get install libssl-dev git-core pkg-config build-essential curl gcc g++
checkinstall
```

For OSX, you must have XCode installed.

## NVM

Clone NVM repository to your home directory and activate it by sourcing the
script.

```
git clone git://github.com/creationix/nvm.git ~/nvm
source ~/nvm/nvm.sh
```

You should add the last line to your `.bashrc` or `.zshrc`.

## Install Node.js

In order to install Node.js just issue the following command:

```
nvm install v0.8.8
```

And to use it, do:

```
nvm use v0.8.8
```

That's all.
