
+++

+++
# How To Use `mv` Command with `find` command in Linux

```bash
find . -name '*<pattern here>*' -exec mv -t desination/ {} +
```

+ `-t` specifies the destination path *before* the argument file (designated by `{}` in `find`)
+ `{}` is the current file matching the `find` command criteria
+ `+` the `find` command line is built by appending each selected file name at the end; the total number of invocations of the ~mv~ command will be much less than the number of matched files.

