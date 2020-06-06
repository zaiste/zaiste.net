+++
title = "How To Find the Number of CPU cores"
+++

```bash
cat /proc/cpuinfo | grep -c processor
```

or

```bash
cat /proc/cpuinfo | grep 'core id'
core id         : 0
core id         : 1
```

or

```bash
nproc
```

or

```bash
lscpu
```

