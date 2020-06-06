+++
date = 2018-02-09T00:00:00.000Z
title = "Shell: Split string while reading from file"
description = """
Use `IFS` variable (Input Field Separator).
"""
aliases = [
  "shell_split_string_while_reading_from_file"
]
[taxonomies]
topics = [ "CLI" ]
[extra]
priority = 0.8
+++

Given the following file

```
zaiste:admin
zosia:regular
krysia:admin
```

Use `IFS` variable (Input Field Separator) shell script to split each line from an input file on `:` character:

```bash
#!/bin/bash

while IFS=':' read -r name role
do
  echo $name
  echo $role
done < users.txt
```
```
```