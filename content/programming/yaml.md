+++
+++

# YAML

`>` folded - it removes newlines within the string and adds one at the end:

```yaml
key: >
  this is a long string and this will be
  displayed
```

The result:

```
this is a long string and this will be displayed
```

`|` literal - it turns newlines within the string into explicit newlines in the result and adds one at the end:

```yaml
key: >
  this is a long string and this will be
  displayed
```

The result:

```
this is a long string and this will be\n displayed\n
```

