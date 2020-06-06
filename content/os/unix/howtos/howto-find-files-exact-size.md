+++
title = "How To Find Files of an Exact Size in Linux"
+++

```bash
find . -type f -size 127c -exec ls -l {} \;
```

+ `b` (default) for 512-byte blocks
+ `c` for bytes
+ `w` for words (2 bytes)
+ `k` for kilobytes
+ `M` for megabytes
+ `G` for gigabytes


