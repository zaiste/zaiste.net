---
created_at: 2017-10-01 
kind: article
publish: true
title: "Truncate file"
tags:
- cli
- unix
- sed
---

Use `sed` to truncate a file in-place `sed`

```	
sed -i '11001,$ d' filename
```

* `-i` means in place.
* `d` means delete.
* `11001,$` means the lines from 11001 to the end.

As a result, this command will create a file with `11,000` max.
