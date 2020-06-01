
+++

+++
# How To Find Files Bigger Than X

Using ```
undefined
```:

```bash 
find / -type f -size +50M -exec du -h {} \; | sort -n
```

Using ```
undefined
```:

```bash 
sudo fd --type f --size +200M . / -x du -h
```

