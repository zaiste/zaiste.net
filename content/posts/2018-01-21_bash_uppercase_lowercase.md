
+++
date = 2018-01-21T00:00:00.000Z


title = "Bash: Uppercase, Lowercase"
topics = [ "bash" ]
description = """
Use `${var,,}` for lowercasing and `${var^^}` for uppercasing for Bash 4+
"""

[extra]
priority = 0.8

+++

In Bash 4, to lowercase:

```bash
var = 'Hello, World'
echo ${var,,}
```
```
hello, world
```

and to uppercase:

```bash
var = 'Hello, World'
echo ${var^^}
```
```
HELLO, WORLD
```
