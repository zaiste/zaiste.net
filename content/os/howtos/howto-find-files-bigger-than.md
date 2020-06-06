
+++

+++
# How To Find Files Bigger Than X

Using `find`:

```bash
find / -type f -size +50M -exec du -h {} \; | sort -n
```

Using `fd`:

```bash
sudo fd --type f --size +200M . / -x du -h
```

