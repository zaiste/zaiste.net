+++
date = 2015-04-16T00:00:00.000Z
title = "Skipping headers in Python's CSV reader"
aliases = [
  "skipping_headers_in_python_csv_reader"
]
[taxonomies]
topics = [ "Python" ]
+++

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