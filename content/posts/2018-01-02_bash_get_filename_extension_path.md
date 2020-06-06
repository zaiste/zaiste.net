+++
date = 2018-01-02T00:00:00.000Z
title = "Bash: Get Filename or Extension from Path"
description = """
Use `$(basename "$fullpath")`
"""

[taxonomies]
topics = [ "Bash", "CLI" ]
[extra]
priority = 0.8
+++

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