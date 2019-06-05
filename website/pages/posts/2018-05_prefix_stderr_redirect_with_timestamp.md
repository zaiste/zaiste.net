---
created_at: 2018-05-06
kind: article
publish: true
title: "Prefix stderr redirect with timestamp"
tags:
- shell
sitemap:
  priority: 0.8
abstract: >
---


```sh
foo() { while IFS='' read -r line; do echo "$(date) $line" >> file.txt; done; };
```

It creates a function which reads one line of raw (`-r`) input from stdin. `IFS=''` prevents ignoring blank lines.
It, then, prepends each line with a timestamp.

Test it

```sh
echo 42 > >(foo)
```

or with `tee`

```sh
echo 42 | tee >(foo)
```