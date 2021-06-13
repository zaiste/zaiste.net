+++
date = 2020-07-30T00:00:00.000Z
title = "Rewritten in Rust: Modern Alternatives of Command-Line Tools"
[taxonomies]
topics = [ "Shell", "Rust"  ]
+++

Shell is the essential tool for every programmer. The more familiar you become with the available tools, the more efficient you can be with using your computer. Here's a list of command-line tools written in Rust that aim to provide modern, often much faster, alternatives to the existing shell commands.

## `bat`

`bat` is a `cat` clone with syntax highlighting and Git integration that works on Windows, MacOS and Linux. It provides syntax highlighting for many file extensions by default.

![bat](https://user-images.githubusercontent.com/200613/90223573-9b9eb780-de0e-11ea-94e3-908957fe5a4e.png)

[GitHub](https://github.com/sharkdp/bat)

## `exa`

`exa` is a modern replacement for `ls`, the default command-line program in Unix/Linux for listing directory contents. `exa` supports icons with the `--icons` flag.

![exa](https://user-images.githubusercontent.com/200613/90223612-aa856a00-de0e-11ea-8cec-133becefa6f2.png)
[GitHub](https://github.com/ogham/exa)

## `fd`

`fd` is a fast and user-friendly alternative to `find`, the built-in command-line program in Unix/Linux for walking a file hierarchy. `fd` provides opinionated defaults for the most common use cases. To find a specific file by name, you write `fd PATTERN` instead of `find -iname ‘*PATTERN*’`. `fd` is also extremely fast and it comes with a ton of options like ignoring hidden directories, files and patterns from `.gitignore` by default.

![fd](https://user-images.githubusercontent.com/200613/90223646-bbce7680-de0e-11ea-98f4-0ef2d5f30920.png)

[GitHub](https://github.com/sharkdp/fd)

## `procs`

`procs` is a modern replacement for `ps`, the default command-line program in Unix/Linux for getting information about processes. It provides convenient, human-readable (and colored) output format by default.

![procs](https://user-images.githubusercontent.com/200613/90223676-c8eb6580-de0e-11ea-8e3e-fea30f173aab.png)

[GitHub](https://github.com/dalance/procs)

## `sd`

`sd` is an intuitive find & replace command-line tool, it is an alternative to `sed`, the built-in command-line program in Unix/Linux for parsing and transforming text (). `sd` has simpler syntax for replacing all occurrences and it uses the convenient regex syntax that you already know from JavaScript and Python. `sd` is also 2x-11x faster than `sed`.

`sed` is a programmable text editor, with search and replace being a common use case. In that light, `sd` is more like `tr`, but on steroids. (thanks [/u/oleid](https://www.reddit.com/user/oleid/) for the suggestion).

![sd](https://user-images.githubusercontent.com/200613/90223698-d6a0eb00-de0e-11ea-85e7-7bf590794ac0.png)

[GitHub](https://github.com/chmln/sd)

## `dust`

`dust` is a more intuitive version of `du`, the built-in command-line program in Unix/Linux for displaying disk usage statistics. By default `dust` sorts the directories by size.

![dust](https://user-images.githubusercontent.com/200613/90223722-e0c2e980-de0e-11ea-8c75-343273fed6f3.png)

[GitHub](https://github.com/bootandy/dust)

## `starship`

The minimal, blazing-fast, and infinitely customizable prompt for any shell.

[GitHub](https://starship.rs/guide/)

## `ripgrep`

`ripgrep` is an extremely fast alternative to `grep`, the built-in command-line program in Unix/Linux for searching files by pattern. `ripgrep` is a line-oriented search tool that recursively searches your current directory for a regex pattern. By default, ripgrep respects `.gitignore` and automatically skips hidden files, directories and binary files.

![ripgrep](https://user-images.githubusercontent.com/200613/90223748-ecaeab80-de0e-11ea-9140-ac9219f5747c.gif)

[GitHub](https://github.com/BurntSushi/ripgrep)

## `tokei`

`tokei` is a program that displays statistics about your code. It shows the number of files, total lines within those files and code, comments, and blanks grouped by language.

![tokei](https://user-images.githubusercontent.com/200613/90223779-f89a6d80-de0e-11ea-8dc7-3469f245d84c.png)

[GitHub](https://github.com/XAMPPRocky/tokei)

## `hyperfine`

`hyperfine` is a command-line benchmarking tool. Among many features, it provides  statistical analysis across multiple runs, support for arbitrary shell commands, constant feedback about the benchmark progress and current estimates and more.

![hyperfine](https://user-images.githubusercontent.com/200613/90223809-03ed9900-de0f-11ea-879e-0c50970f20b5.gif)

[GitHub](https://github.com/sharkdp/hyperfine)

## `ytop`

`ytop` is an alternative to `top`, the built-in command-line program in Unix/Linux for displaying information about processes.

![ytop](https://user-images.githubusercontent.com/200613/90223841-14057880-de0f-11ea-8c27-b1700edb02fe.gif)

[GitHub](https://github.com/cjbassi/ytop)

## `tealdeer`

`tealdeer` is a very fast implementation of  [tldr](https://github.com/tldr-pages/tldr), a command-line program for displaying simplified, example based and community-driven man pages.

![tealdeer](https://user-images.githubusercontent.com/200613/90223870-22539480-de0f-11ea-837c-7795a150d7df.gif)

[GitHub](https://github.com/dbrgn/tealdeer)

## `bandwhich`

`bandwhich` is a CLI utility for displaying current network utilization by process, connection and remote IP or hostname.

![bandwhich](https://user-images.githubusercontent.com/200613/90223929-3d260900-de0f-11ea-98ae-3e9905746c59.gif)

[GitHub](https://github.com/imsnif/bandwhich)

## `grex`

`grex` is a command-line tool and library for generating regular expressions from user-provided test cases.

![grex](https://user-images.githubusercontent.com/200613/90223991-4ca55200-de0f-11ea-98af-80f2e8342bd2.gif)

[GitHub](https://github.com/pemistahl/grex)

## `rmesg`

`rmesg` is a dmesg implementation in Rust (and available as a library for Rust programs to consume kernel message logs.)

![rmesg](https://user-images.githubusercontent.com/200613/90224040-5dee5e80-de0f-11ea-8def-09fa36e4cab7.png)

[GitHub](https://github.com/polyverse/rmesg/)

## `zoxide`

`zoxide` is a blazing fast autojumper, intended to completely replace the `cd` command. It allows you to change directories without typing out the entire path name.

![zoxide](https://user-images.githubusercontent.com/200613/90224077-6ba3e400-de0f-11ea-821e-4dbc0f356fbf.gif)

[GitHub](https://github.com/ajeetdsouza/zoxide)

## `tab`

`tab` is an intuitive, config-driven terminal multiplexer designed for software engineers.  Tab has a built-in fuzzy finder, and persistent configurable sessions.

![tab](https://user-images.githubusercontent.com/2111479/99866824-519e3e00-2b82-11eb-9123-6c0a6599814e.png)

## `tp-note`

`Tp-Note` is a template tool that enhances the clipboard with a _save and edit as a note file_ function. After creating a new note file, `Tp-Note` launches the user's favorite file editor (for editing) and web browser (for viewing).

![tp-note](https://blog.getreu.net/20210317-note-taking-for-minimalists/tp-note.png)

[GitHub](https://github.com/getreu/tp-note)


## Bonus: `nushell`

`nushell` is a new type of shell, written in Rust. Its goal is to create a modern shell alternative that's still based on the Unix philosophy, but adapted to the current era.
It supports piping and filtering in a way similar to `awk` and `sed` with a column view so that you can combine operations like in `SQL`. (thanks [/u/matu3ba](https://www.reddit.com/user/matu3ba/) for the suggestion).

![nushell](https://user-images.githubusercontent.com/200613/90224111-778fa600-de0f-11ea-9310-6c34ff0f2670.gif)

[GitHub](https://github.com/nushell/nushell)

---

Have I missed an interesting command-line tool? Let me know [on Twitter](https://twitter.com/zaiste), or [submit a PR](https://github.com/zaiste/zaiste.net) to this website on GitHub.
