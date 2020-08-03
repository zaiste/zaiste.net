+++
date = 2020-07-30T00:00:00.000Z
title = "Rewritten in Rust: Modern Alternatives of Command-Line Tools"
[taxonomies]
topics = [ "Shell", "Rust"  ]
+++

Shell is the essential tool for every programmer. The more familiar you become with the available tools, the more efficient you can be with using your computer. Here's a list of command-line tools written in Rust that aim to provide modern, often much faster, alternatives to the existing shell commands.

## `bat`

`bat` is a `cat` clone with syntax highlighting and Git integration that works on Windows, MacOS and Linux. It provides syntax highlighting for many file extensions by default.

![bat](/images/posts/bat.png)

[GitHub](https://github.com/sharkdp/bat)

## `exa`

`exa` is a modern replacement for `ls`, the default command-line program in Unix/Linux for listing directory contents. `exa` supports icons with the `--icons` flag.

![exa](/images/posts/exa.png)

[GitHub](https://github.com/ogham/exa)

## `fd`

`fd` is a fast and user-friendly alternative to `find`, the built-in command-line program in Unix/Linux for walking a file hierarchy. `fd` provides opinionated defaults for the most common use cases. To find a specific file by name, you write `fd PATTERN` instead of `find -iname ‘*PATTERN*’`. `fd` is also extremely fast and it comes with a ton of options like ignoring hidden directories, files and patterns from `.gitignore` by default.

![fd](/images/posts/fd.png)

[GitHub](https://github.com/sharkdp/fd)

## `procs`

`procs` is a modern replacement for `ps`, the default command-line program in Unix/Linux for getting information about processes. It provides convenient, human-readable (and colored) output format by default.

![procs](/images/posts/procs.png)

[GitHub](https://github.com/dalance/procs)

## `sd`

`sd` is an intuitive find & replace command-line tool, it is an alternative to `sed`, the built-in command-line program in Unix/Linux for parsing and transforming text (). `sd` has simpler syntax for replacing all occurrences and it uses the convenient regex syntax that you already know from JavaScript and Python. `sd` is also 2x-11x faster than `sed`. 

`sed` is a programmable text editor, with search and replace being a common use case. In that light, `sd` is more like `tr`, but on steroids. (thanks [/u/oleid](https://www.reddit.com/user/oleid/) for the suggestion).

![sd](/images/posts/sd.png)

[GitHub](https://github.com/chmln/sd)

## `dust`

`dust` is a more intuitive version of `du`, the built-in command-line program in Unix/Linux for displaying disk usage statistics. By default `dust` sorts the directories by size.

![dust](/images/posts/dust.png)

[GitHub](https://github.com/bootandy/dust)

## `starship`

The minimal, blazing-fast, and infinitely customizable prompt for any shell.

[GitHub](https://starship.rs/guide/)

## `ripgrep`

`ripgrep` is an extremely fast alternative to `grep`, the built-in command-line program in Unix/Linux for searching files by pattern. `ripgrep` is a line-oriented search tool that recursively searches your current directory for a regex pattern. By default, ripgrep respects `.gitignore` and automatically skips hidden files, directories and binary files.

![ripgrep](/images/posts/ripgrep.gif)

[GitHub](https://github.com/BurntSushi/ripgrep)

## `tokei`

`tokei` is a program that displays statistics about your code. It shows the number of files, total lines within those files and code, comments, and blanks grouped by language.

![tokei](/images/posts/tokei.png)

[GitHub](https://github.com/XAMPPRocky/tokei)

## `hyperfine`

`hyperfine` is a command-line benchmarking tool. Among many features, it provides  statistical analysis across multiple runs, support for arbitrary shell commands, constant feedback about the benchmark progress and current estimates and more.

![hyperfine](/images/posts/hyperfine.gif)

[GitHub](https://github.com/sharkdp/hyperfine)

## `ytop`

`ytop` is an alternative to `top`, the built-in command-line program in Unix/Linux for displaying information about processes.

![ytop](/images/posts/ytop.gif)

[GitHub](https://github.com/cjbassi/ytop)

## `tealdeer`

`tealdeer` is a very fast implementation of  [tldr](https://github.com/tldr-pages/tldr), a command-line program for displaying simplified, example based and community-driven man pages.

![tealdeer](/images/posts/tealdeer.gif)

[GitHub](https://github.com/dbrgn/tealdeer)

## `bandwhich`

`bandwhich` is a CLI utility for displaying current network utilization by process, connection and remote IP or hostname.

![bandwhich](/images/posts/bandwhich.gif)

[GitHub](https://github.com/imsnif/bandwhich)

## `grex`

`grex` is a command-line tool and library for generating regular expressions from user-provided test cases.

![grex](/images/posts/grex.gif)

[GitHub](https://github.com/pemistahl/grex)

## `rmesg`

`rmesg` is a dmesg implementation in Rust (and available as a library for Rust programs to consume kernel message logs.)

![rmesg](/images/posts/rmesg.png)

[GitHub](https://github.com/polyverse/rmesg/)

## `zoxide`

`zoxide` is a blazing fast autojumper, intended to completely replace the `cd` command. It allows you to change directories without typing out the entire path name.

![zoxide](/images/posts/zoxide.gif)

[GitHub](https://github.com/ajeetdsouza/zoxide)

## Bonus: `nushell`

`nushell` is a new type of shell, written in Rust. Its goal is to create a modern shell alternative that's still based on the Unix philosophy, but adapted to the current era.
It supports piping and filtering in a way similar to `awk` and `sed` with a column view so that you can combine operations like in `SQL`. (thanks [/u/matu3ba](https://www.reddit.com/user/matu3ba/) for the suggestion).

![nushell](/images/posts/nushell.gif)

[GitHub](https://github.com/nushell/nushell)

---

Have I missed an interesting command-line tool? Let me know [on Twitter](https://twitter.com/zaiste), or [submit a PR](https://github.com/zaiste/zaiste.net) to this website on GitHub.
