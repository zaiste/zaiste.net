
+++
date = 2014-04-11T00:00:00.000Z


title = "Check memory usage on Linux, FreeBSD, Solaris, AIX and HPUX"
topics = [ "freebsd" ]

+++

### Linux

```
dmesg | grep Memory
```

```
grep -i memtotal /proc/meminfo
```

```
free
```

```
cat /proc/meminfo
```

### FreeBSD

```
dmesg | grep memory
```

```
grep memory /var/run/dmesg.boot
```

```
sysctl -a | grep mem
```

### Solaris

```
dmesg | grep mem
```

```
prtdiag | grep Memory
```

```
prtconf -v | grep Memory
```

### AIX

```
bootinfo -r
```

```
lsattr -E1 sys0 -a realmem
```

```
getconf REAL_MEMORY
```

```
lsdev -C | grep mem
```


### HPUX

```
dmesg | grep Physical
```

```
/opt/ignite/bin/print_manifest | grep Memory
```

```
machinfo | grep Memory
```


