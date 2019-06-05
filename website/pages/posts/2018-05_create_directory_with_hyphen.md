---
created_at: 2018-05-02
kind: article
publish: true
title: "Create Directory with Hypen"
tags:
- shell
sitemap:
  priority: 0.8
abstract: >
  Use -- to create directory with hyphen.
---

Use `mkdir` with `--` to create a directory with a hyphen in the name. This disables further option parsing.

```sh
mkdir -- -my-dir
```

Put additional options always before `--`

```sh
mkdir -p -- -my-dir/foo
```

This is a convention that is part of the POSIX standard. The argument `--` is a delimiter indicating the end of options. Any following arguments should be treated as operands, even if they begin with the '-' character.

Alternatively, use the current directory prefix

```sh
mkdir ./-my-dir
```

This also applies to other commands such as `cd`:

```sh
cd -- -my-dir
```

or `rm`

```sh
rm -r -- -my-dir
```
