
+++
date = 2014-09-02T00:00:00.000Z


title = "Find files in Ubuntu/Debian APT package"
topics = [ "Sysadmin", "Debian", "Ubuntu" ]

+++

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


