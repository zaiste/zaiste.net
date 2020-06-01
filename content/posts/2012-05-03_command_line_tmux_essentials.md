
+++
date = 2012-05-03T00:00:00.000Z


title = "Command & Line: Tmux Essentials"
topics = [ "tmux", "cli" ]

+++

Meet [Tmux](http://tmux.sourceforge.net/), an awesome terminal multiplexer. This is one of my favourite command line tools. Easy to use & set up, at the same time powerful; in addition to that it can impress your non-tech friends while you switch dark terminal screens, pretending to be doing some « complicated IT stuff ».

TL;DR
-----

*Multiplexer* is an application that let you run multiple terminals (or terminal programs) at once, easily switch between them, keep them running in background, etc. To see what it is all about, check this simple Tmux run:

[ASCII IO Cast](http://ascii.io/a/457)
<small>This terminal session was recorded via [ascii.io](http://ascii.io) - *No nonsense asciicasting for serious hackers* by [Marcin Kulik](https://github.com/sickill)</small>

If you like the status bar featured in this episode, check out [tmuxified](https://github.com/zaiste/tmuxified).



Basic Vocabulary
----------------
Tmux introduces a concept of **session** which is a group of terminals. When you start Tmux, it creatas its first session. Each session can have several **windows** i.e. what you see on screen at given time. Windows are numbered. Window can be splitted both horizonatlly or vertically. Each window can have one or several (when splitted) **panes** that run a terminal.

Tmux has two modes: *normal* where you enter commands and *copy-mode* where you can scroll around & copy text.

Configuration
-------------

I changed default prefix key from C-b to C-a. I find it easier to type and it doesn’t conflict with Vim bindings.

    unbind C-a ; unbind C-b ; set -g prefix C-a

It is also handy to set up a command sequence for nested Tmux sessions, for example:

    bind-key a send-prefix

For a more advanced Tmux configuration example, check out [tmuxified](http://github.com/zaiste/tmuxified).


Commands
--------

These are probably the most useful commands in Tmux

* create a new window: `C-a c`
* kill the current window: `C-a x`
* split horizontally: `C-a “`
* split vertically: `C-a %`
* show list of sessions and switch between them: `C-a s`
* show list of windows within the current session: `C-a w`
* copy mode & scroll: `C-a [` followed by `C-f` or `C-b`

Neat Features
-------------

**Vi or Emacs key bindings:** it is how you control Tmux *copy-mode*.

**Automatic Rename:** Tmux renames windows automatically using the command name running inside

**Live Config Reload:** to reload a configuration when inside Tmux, you can simply run:

    tmux source-file ~/.tmux.conf

There is a lot more! Check the man and references below to dive into more advanced stuff. Don’t get too much tmuxified though...

### Additional Reading

* [Tmux - The Terminal Multiplexer](http://blog.hawkhost.com/2010/06/28/tmux-the-terminal-multiplexer/)
* [A Tmux Crash Cours](http://robots.thoughtbot.com/post/2641409235/a-tmux-crash-course)
* [Practical Tmux](http://mutelight.org/articles/practical-tmux)

