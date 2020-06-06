+++
date = 2018-05-08T00:00:00.000Z
title = "Recursively count files using find"
description = """
Use `find . -type f | wc -l` to recursively count files in the current directory
"""
[taxonomies]
topics = [ "CLI" ]
[extra]
priority = 0.8
+++

Combine `find` and `wc` to count files in the current directory and in all of its subdirectories:

```bash
find . -type f | wc -l
```

* `-type f`: include only files
* `wc -l`: count lines only

If you remove `-type f` it will also count directories and symlinks.

Add `-name "*.EXT"` to count files with the specific extension. In the example below it counts only CSV files

```
find . -type f -name "*.csv" | wc -l
```
