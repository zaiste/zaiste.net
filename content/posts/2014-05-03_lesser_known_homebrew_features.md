
+++
date = 2014-05-03T00:00:00.000Z


title = "Lesser-known Homebrew features"
topics = [ "homebrew", "tips" ]

+++

[Homebrew][1] is a package manager for OSX that greatly simplifies software installation. It has many interesting features that are not widely known and that may substantially improve your workflow. In this article I will present some of them.

## Software versions

Once a package is upgraded you can easily switch back to older version with `switch`. Check currently installed versions with `info`,

```
brew info elasticsearch
elasticsearch: stable 1.1.1, HEAD
http://www.elasticsearch.org
/usr/local/Cellar/elasticsearch/0.90.1 (30 files, 19M)
  Built from source
/usr/local/Cellar/elasticsearch/1.1.1 (31 files, 21M)
  Built from source
From: https://github.com/Homebrew/homebrew/commits/master/Library/Formula/elasticsearch.rb
```

and then switch to an older version if needed

```
brew switch elasticsearch 0.90.1
Cleaning /usr/local/Cellar/elasticsearch/0.90.1
Cleaning /usr/local/Cellar/elasticsearch/1.1.1
3 links created for /usr/local/Cellar/elasticsearch/0.90.1
```

Currently active version can be checked with `which`

```
brew which elasticsearch
elasticsearch: 0.90.1
```

If you need to install older software at any time, simply add `homebrew/versions` tap

```
brew tap homebrew/versions
```

Check available software versions with `search` or [on Github][2].

```
brew search postgresql
```

## OSX Applications with Cask

[Cask][4] is a Homebrew plugin that allow to install OSX applications distributed as binaries. Usually you get a `dmg` file and then drag-n-drop into `/Applications` - with Cask this process can be automated using the command line.

Install Cask

```
brew tap caskroom/cask
```

```
brew install brew-cask
```

Install an OSX application

```
brew cask install adium
```

Cask puts applications into `/opt/homebrew-cask/Caskroom` and the symlinks them to `/Applications`.

The list of OSX applications that can be installed with Cask is available [on Github][3]. You can also use `search` command i.e.

```
brew cask search google
==> Partial matches
google-chrome		  google-earth		  ...
```

## Brewfile

Homebrew allows to define dependencies with single file `Brewfile` similar to `bundler` from Ruby world and its `Gemfile`, .e.g

```
install curl
install openssl
link --force openssl
```

Once defined, you can install those dependencies by running `brew bundle`. Each command prefixed with `brew` and executed in defined order.

`Brewfile` provides a useful method to store in one place all software needed to be installed on given machine.


[1]: http://brew.sh/
[2]: https://github.com/Homebrew/homebrew-versions
[3]: https://github.com/caskroom/homebrew-cask
[4]: http://caskroom.io/
