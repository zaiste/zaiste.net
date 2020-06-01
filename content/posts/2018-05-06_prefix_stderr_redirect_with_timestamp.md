
+++
date = 2018-05-06T00:00:00.000Z


title = "Prefix stderr redirect with timestamp"
topics = [ "shell" ]
abstract = ""

[extra]
priority = 0.8

+++


```bash
foo() { while IFS='' read -r line; do echo "$(date) $line" >> file.txt; done; };
```

It creates a function which reads one line of raw (`-r`) input from stdin. `IFS=''` prevents ignoring blank lines.
It, then, prepends each line with a timestamp.

Test it

```bash
echo 42 > >(foo)
```

or with `tee`

```bash
echo 42 | tee >(foo)
```
