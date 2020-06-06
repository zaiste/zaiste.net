+++
date = 2018-05-12T00:00:00.000Z
title = "Delete empty files using find"
description = """
Use `find . -empty -delete` to delete empty files from current directory
"""
[taxonomies]
topics = [ "CLI" ]
[extra]
priority = 0.8
+++

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
