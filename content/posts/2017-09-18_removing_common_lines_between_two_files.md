
+++
date = 2017-09-18T00:00:00.000Z


title = "Removing common lines between two files"
topics = [ "cli" ]

+++

To remove common lines between two files you can use `grep`, `comm` or `join` command.

`grep` only works for small files. Use `-v` along with `-f`.

```bash
grep -vf file2 file1
```

This displays lines from `file1` that do not match any line in `file2`.

`comm` is a utility command that works on lexically sorted files. It takes two files as input and produces three text columns as output: lines only in the first file; lines only in the second file; and lines in both files. You can suppress printing of any column by using `-1`, `-2` or `-3` option accordingly.

```bash
comm -1 -3 file2 file1
```

This displays lines from `file1` that do not match any line in `file2`.

Finally, there is `join`, a utility command that performs an equality join on the specified files. Its `-v` option also allows to remove common lines between two files.

```bash
join -v1 -v2 file1 file2
```
