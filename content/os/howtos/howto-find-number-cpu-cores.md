
+++

+++
# How To: Find the Number of CPU cores

```bash 
cat /proc/cpuinfo | grep -c processor
```

```bash 
cat /proc/cpuinfo | grep 'core id'
core id         : 0
core id         : 1
```

```bash 
nproc
```

```bash 
lscpu
```

