---
created_at: 2018-01-03
kind: article
publish: true
title: "Zsh: Get Filename or Extension from Path"
tags:
- zsh
- shell
sitemap:
  priority: 0.8
abstract: >
  Use path modifiers: `:h` for head, `:t` for tail, `:r` for root, `:e` for extension.
---

Get the filename from a path using `:t` modifier. This removes all leading pathname components, leaving just the tail. It works like `basename`.

```bash
#!/bin/zsh

fullpath="/etc/nginx/nginx.conf"
filename=$fullpath:t
echo $filename
```
```
nginx.conf
```

Or, get the path without the filename using `:h` modifier


```bash
#!/bin/zsh

fullpath="/etc/nginx/nginx.conf"
filename=$fullpath:h
echo $filename
```
```
/etc/nginx
```

Get the filename without the extension by combining two path modifiers `:t` and `:r`

```bash
#!/bin/zsh

fullpath="/etc/nginx/nginx.conf"
filename=$fullpath:t:r
echo $filename
```
```
nginx
```

Get just the extension by combining `:t` and `:e` path modifiers

```bash
#!/bin/zsh

fullpath="/etc/nginx/nginx.conf"
ext=$fullpath:t:e
echo $ext
```
```
conf
```