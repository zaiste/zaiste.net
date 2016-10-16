---
created_at: 2016-11-29
kind: article
publish: true
title: "find without permission denied"
tags:
- cli
---

Find a file named `boo` in the current directory without printing *permission
denied* message once the file is not accessible

```
fint . ! -readable -prune -name boo -print
```

Alternatively,

```
find . -name boo 2>&1 -print | grep -v 'permission denied'
```
