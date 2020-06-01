
+++
date = 2013-04-07T00:00:00.000Z


title = "Towards Simplicity: From rbenv to chruby"
topics = [ "ruby", "osx" ]

+++

[`chruby`][1] is a Ruby version manager: a tool that makes easy to switch Ruby
version along with the *context* either on a local directory or system-wide
basis. What makes `chruby` stand out is its design simplicity. Also, it has
only ~90 LoC.

Both `rbenv` and `rvm` may seem unnecessarily complicated. The former operates on [shims][5]
and does context switching each time any Ruby or gem binary is executed. It
requires to run `rbenv rehash` each time there is a new binary installed. The
latter overrides `cd` command for that purpose (hence it is done only once), but
it can also install Ruby, manage gemsets and more. Those additions make `rvm`
feel heavy and complex. `chruby` uses [PROMPT_COMMAND][4] to switch the context.

## Installing chruby

`chruby` can be installed in various ways. For OSX, it is as simple as:

```
brew install chruby
```

Next, add the two following lines to your *shell profile file* (`.bashrc`,
`.zshrc`, etc.)

```
source '/usr/local/share/chruby/chruby.sh'
source '/usr/local/share/chruby/auto.sh'
```

In addition to that, I use [Bundler][2] to manage dependencies - which makes
gemsets obsolete - and [ruby-build][3] to install Ruby versions; I keep them under
`~/.rubies`:

```
λ brew install ruby-build
λ ruby-build 1.9.3-p392 ~/.rubies/ruby-1.9.3-p392
λ ruby-build jruby-1.7.3 ~/.rubies/jruby-1.7.3
```

## Using chruby

To see a **list** of available Ruby versions, type:

```
λ chruby
```

To **switch** between Ruby versions, type:

```
λ chruby jruby-1.7.3
λ chruby ruby-1.9.3
```

To use the **system Ruby**, type:

```
λ chruby system
```

To set **default Ruby**, put the following line inside your shell *profile* file
(e.g. `.bashrc`, `.zshrc`, etc):

```
λ chruby ruby-1.9
```

To specify local, **per-project Ruby version**, put its name inside `.ruby-version`
file in that project directory.

## Summary

`chruby` provides the most elegant way to manage Ruby versions. It does
only one thing, without unnecessary additions and complications.

[1]: https://github.com/postmodern/chruby
[2]: http://gembundler.com/
[3]: https://github.com/sstephenson/ruby-build
[4]: http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/x264.html
[5]: https://github.com/sstephenson/rbenv/#understanding-shims
