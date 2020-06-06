+++
date = 2017-10-01T00:00:00.000Z
title = "Truncate file"
[taxonomies]
topics = [ "CLI" ]
+++

Use `sed` to truncate a file in-place `sed`

```
sed -i '11001,$ d' filename
```

* `-i` means in place.
* `d` means delete.
* `11001,$` means the lines from 11001 to the end.

As a result, this command will create a file with `11,000` max.
