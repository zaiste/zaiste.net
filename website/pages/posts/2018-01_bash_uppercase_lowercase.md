---
created_at: 2018-01-21
kind: article
publish: true
title: "Bash: Uppercase, Lowercase"
tags:
- bash
sitemap:
  priority: 0.8
abstract: >
  Use `${var,,}` for lowercasing and `${var^^}` for uppercasing for Bash 4+
---

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
