+++
date = 2018-03-09T00:00:00.000Z
title = "Shell: Get the PID of the last command"
description = """
`!` shell variable holds the PID of the last executed command. Don't forget to access it by prefixing with `$` i.e. `$!`.
"""
[taxonomies]
topics = [ "CLI" ]
[extra]
priority = 0.8

+++

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
