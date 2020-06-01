
+++
date = 2015-04-02T00:00:00.000Z


title = "Renaming multiple files"
topics = [ "cli" ]

+++

For [zsh][1] there is `zmv` module which must be loaded with `autoload`;
make sure extendedglob is on

```
autoload -U zmv
setopt extendedglob
```

Lower case the filename in the current directory

```
zmv '(*)' '${(L)1}'
```

Lower case the extension for each file in the current directory:

```
zmv '(*.JPG)' '${1:r}.${(L)1:e}'
```

or using recursive traversal:

```
zmv '(**/)(*.JPG)' '$1${2:r}.${(L)2:e}'
```

On Debian/Ubuntu there is [rename][2] tool.

```
apt-get install rename
```

Lower case the entire filename in the current directory

```
rename 'y/A-Z/a-z/' *
```

If you get `Argument list too long` error, combine it with `find`

```
find . -exec rename 'y/A-Z/a-z/' {} \;
```

On case insensitive filesystems such as OS X's HFS+, you need to add the `-f` flag

```
rename -f 'y/A-Z/a-z/' *
```