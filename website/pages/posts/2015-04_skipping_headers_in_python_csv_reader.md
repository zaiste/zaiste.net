---
created_at: 2015-04-16 
kind: article
publish: true
title: "Skipping headers in Python's CSV reader"
tags:
- python
- csv
---

CSV reader objects i.e. `DictReader` instances and objects returned 
by the `reader()` function are iterable. `next()` function can be used 
skip any number of lines.

```
import csv

with open(filename) as f:
  reader = csv.DictReader(f, delimiter=';')
  header = reader.fieldnames

  a_line_after_header = next(reader)
  another_line_after_header = next(reader)

  # iterate over remaining lines
  for row in reader:
    ...
``` 