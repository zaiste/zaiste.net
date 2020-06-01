
+++
date = 2012-06-03T00:00:00.000Z


title = "How I use Git - Extracting Info"
topics = [ "git", "cli" ]

+++

In the 2nd post of the series I'll show how I extract information from a Git repository. There are three layers I will operate on:

 1. highlighting output to draw the attention on a particular piece of information on the screen
 2. formatting a log message
 3. searching through commit messages or through the codebase

For the purpose of this article I will use two Git repositories:

 1. a small personal project which has some changes in both the working directory and the staged files,
 1. [Noir framework](http://webnoir.org/) repository from [GitHub](https://github.com/ibdknox/noir)

## git status

Let’s start by putting some colours on `git status`. We have to modify
`~/.gitconfig` and add the following part:

```
[color "status"]
  added = blue
  changed = yellow
  untracked = white ul
```

```
λ git status
```

Now, `git status` will get some nice coloring, like on the
screen below:

![git status](/assets/images/git-status.jpg)

Let’s remove unnecessary information from `git status` by adding the `--short`
option. I use it pretty often so I have binded it to `git s` for convenience.

```
λ git status --short
```

As shown below there is only the essential status information

![git status short](/assets/images/git-status-short.jpg)

## git diff

Another area of improvement concerns `git diff` command.  As before let’s add
some colours to the output by modifing `~/.gitconig`.

```
[color "diff"]
  meta = white bold
  frag = magenta ul
  old = red bold
  new = green bold
```

Now `git diff` will render an output similiar to the one below

![git diff](/assets/images/git-diff.jpg)

There is a useful option called `--stat` which provides a summary for each file
from `git diff`. It can be used for staged files as well.

```
λ git diff --stat
λ git diff --cached --stat
```

![git diff](/assets/images/git-diff-stat.jpg)


## git log

`git log` shows the commit logs.

```
λ git log
```
![git log](/assets/images/git-log.jpg)

There is a lot of information here and it takes of lot space. In the following
paragraphs I'll propose some neat alternatives.

### Log with Diff Stat

We can include `diff` stats in the log output using `--stat` option.

```
λ git log --stat
```

![git log stat](/assets/images/git-log-stat.jpg)

### Log with Patch

We can also associate `diff` content with each commit in the log output using
`-p` option. There is also `-2` which limits the output to only the last two entries

```
λ git log -p
λ git log -p -2
````

![git log p](/assets/images/git-log-p.jpg)


### Log Format: Graph

We can apply various formats to `git log` output. For example, we could display
a ASCII graph on the left thanks to `--graph` option.

```
λ git log --graph --date=short
```

![git graph](/assets/images/git-graph.jpg)

### Log Format: Short

Let's create a more concise `git log` output using the following format.

```
λ git log --pretty=format:'[%h] %an %cr: %s'
```
I have binded it to `git los` alias.

![git short](/assets/images/git-short.jpg)

### Log Format: Changes

Let's add to the previous output a list of files changed for each commit. It
could be done this way:

```
λ git log --pretty=format:'[%h] %an %cr: %s' --name-status
```
I have binded it to `git changes` alias.

![git changes](/assets/images/git-changes.jpg)

### Log Format: Summary

We can go even further and adjust the previous output with a `git diff` stats
that visually show how a file or files associated with each commit changed

```
λ git log --pretty=format:'[%h] %an %ar: %s' --stat
```
I have binded it to `git summary` alias.

![git summary](/assets/images/git-summary.jpg)

### Log Format: Changelog

We can also generate a simple change log (aliased to `git changelog`) by using:

```
λ git log --pretty=format:' * %s'
```
As before I have `git changelog` alias for that format in my `~/.gitconfig`.

![git changelog](/assets/images/git-changelog.jpg)

### Log Format: Full Graph

Or a neat graph which is binded to `git lof` in my personal config.

```
λ git log --graph --pretty=format:'[%h] -%d %an %cr: %s' --abbrev-commit --date=relative
```

![git lof](/assets/images/git-lg.jpg)


## Log Filtering

`git log` output can be filtered in various ways.

### Time Range

Time range can be specified using `--since` or `--before` options:

```
λ git log --since=2.weeks
```

### By Author OR By Commit Message

To easily find commits authored by a specific person, I use `git log` with `--author`
option. If I wanted to search through commit message instead, there is `--grep` option.
It can be easily combined with other options, like `--since` for example.

```
λ git log --author=Zaiste!
λ git log --grep=Merge --since=1.week
```

### By Author AND By Commit Message

In order to find commits authored by a specific person that contain certain
words in the commit message, I could use one of the following commands.

```
λ git log --author=Zaiste! --grep=Merge --since=1.month
λ git log --all-match --grep=Merge --author=Zaiste!
```

It differs from what says `git help` as the first of these commands is supposed
to look for an author OR a message, but it does AND instead; as a result `--all-match` is not needed.

## Code Filtering

At this point, we already know how to look through commit messages, find commits
authored by a specific person, etc. Let's learn how to search in the source
code.

The simplest command looks like this:

```
λ git grep <regexp>
```

It searches for a specifc `regex` expression in the working tree. There is a
useful option, called `--function-context` which gives a « context » for the
search. Let's compare:

### without `--function-context`

![git grep](/assets/images/git-grep.jpg)

### with `--function-context`

![git grep context](/assets/images/git-grep-context.jpg)

For a more clear `git grep` output with filename heading & line numbers, I use
three additional options: `--break`, `--heading` and `--line-number`.

To search in the current head, use the following command:

```
λ git grep <regex> HEAD
```

To search only through `.md` files, in the working directory, try this:

```
λ git grep 'map' -- '*.md'
```

These options can be easily combinated. For example, to search in the `HEAD` of
branch called `feature` and only through `.clj`, use following:

```
λ git grep -e 'map' next HEAD -- '*.clj'
```

We can also search all revisions for a specified `regexp`, like so:

```
λ git grep <regexp> $(git rev-list --all)
```

Or, we can limit the search to all revisions between rev1 and rev2, like so:

```
λ git grep <regexp> $(git rev-list <rev1>..<rev2>)
```

We can combine several `regexp` expressions. For example, to search working tree for lines lines matching both *init* AND *defn*:

```
λ git grep -e init --and -e defn
```

![git grep and](/assets/images/git-grep-and.jpg)

Or, to search working tree for lines that match at least one of these two
`regex` expressions:

```
λ git grep -e init -e defn
```

![git grep and](/assets/images/git-grep-or.jpg)

Finally, the following command will give the names of the _files_ that have both *defn* and *init* somewhere in them:

```
λ git grep -l --all-match -e defn -e init
```

## Summary

In this article, I only scratched the surface. There is much more options for `git diff`, `git status`, `git log` and `git grep` commands. You can get more details on each of these commands via `git help <command>`.

In the next post I'll show how `git` can be integrated with our favorite text editor: [Vim](http://vim.org). Stay tuned!
