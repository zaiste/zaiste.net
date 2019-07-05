---
created_at: 2018-05-12
kind: article
publish: true
title: "Delete empty files using find"
tags:
- shell
sitemap:
  priority: 0.8
abstract: >
  Use `find . -empty -delete` to delete empty files from current directory
---

The following command will delete all empty files in the current directory and in all of its subdirectories:

```bash
find . -size 0 -delete
```

There is also a `-empty` flag, but it's not POSIX

```bash
find . -empty -delete
```

Add `-maxdepth 1` to limit the search only to the current directory (no subdirectories)

The `.` (dot) is optional only for Linux. On macOS it is required to specify it.
