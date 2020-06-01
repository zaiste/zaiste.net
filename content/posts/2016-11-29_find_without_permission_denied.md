
+++
date = 2016-11-29T00:00:00.000Z


title = "find without permission denied"
topics = [ "cli" ]

+++

Find a file named `boo` in the current directory without printing *permission
denied* message once the file is not accessible

```
fint . ! -readable -prune -name boo -print
```

Alternatively,

```
find . -name boo 2>&1 -print | grep -v 'permission denied'
```
