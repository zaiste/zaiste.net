
+++
date = 2018-02-21T00:00:00.000Z


title = "JavaScript: Check for undefined, null and blank values"
topics = [ "javascript" ]
description = """
Use `if (value)` to check if the variable has a `truthy` value.
"""

[extra]
priority = 0.8

+++

In JavaScript:

```js
if (value) {
  ...
}
```

will evaluate to `true` if and only if `value` is **NOT**:
* `undefined`
* `null`
* `NaN` (Not a Number)
* `""` (empty string)
* `0`
* `false`

All those values are considered falsy and return `false` with the `if` statement.
