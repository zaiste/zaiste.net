---
created_at: 2014-09-02
kind: article
publish: true
title: "Find files in Ubuntu/Debian APT package"
tags:
 - Sysadmin
 - Debian
 - Ubuntu
---

`apt-file` allows to search through Ubuntu/Debian APT packages and
to find by name particular files inside.

```
apt-get install apt-file
```

Initialize `apt-file` database

```
apt-file update
```

Finally, search and find a package to which `NAME` belongs to

```
apt-file search NAME
```


