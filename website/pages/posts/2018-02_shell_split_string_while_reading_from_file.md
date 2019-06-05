---
created_at: 2018-02-09
kind: article
publish: true
title: "Shell: Split string while reading from file"
tags:
- shell
sitemap:
  priority: 0.8
abstract: >
  Use `IFS` variable (Input Field Separator).
---

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