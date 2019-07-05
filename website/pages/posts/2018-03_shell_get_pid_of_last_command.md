---
created_at: 2018-03-09
kind: article
publish: true
title: "Shell: Get the PID of the last command"
tags:
- shell
sitemap:
  priority: 0.8
abstract: >
  `!` shell variable holds the PID of the last executed command. Don't forget to access it by prefixing with `$` i.e. `$!`.
---

`!` shell variable holds the PID of the last executed command.

```bash
long-process &
```
```
[1] 589
```

Access it as `$!`:

```bash
echo $!
```

Assign it to a variable:

```bash
long-process & export LONG_PROCESS_PID=$!
```
