---
created_at: 2018-01-02
kind: article
publish: true
title: "Bash: Get Filename or Extension from Path"
tags:
- bash
sitemap:
  priority: 0.8
abstract: >
  Use `$(basename "$fullpath")`
---

```bash
#!/bin/bash

fullpath="/etc/nginx/nginx.conf"
filename=$(basename "$fullpath")
echo $filename
```
```
nginx.conf
```

Drop the extension

```bash
#!/bin/bash

fullpath="/etc/nginx/nginx.conf"
filename=$(basename "$fullpath")
fname="${filename%.*}"
echo $fname
```
```
nginx
```

Just the extension

```bash
#!/bin/bash

fullpath="/etc/nginx/nginx.conf"
filename=$(basename "$fullpath")
ext="${filename##.*}"
echo $ext
```
```
conf
```

For more details, check [shell parameters expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html) in Bash manual.

In general,

* `${variable%pattern}` - Trim the shortest match from the end
* `${variable##pattern}` - Trim the longest match from the beginning
* `${variable%%pattern}` - Trim the longest match from the end
* `${variable#pattern}` - Trim the shortest match from the beginning