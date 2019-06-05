---
created_at: 2018-02-21
kind: article
publish: true
title: "JavaScript: Check for undefined, null and blank values"
tags:
- javascript
sitemap:
  priority: 0.8
abstract: >
  Use `if (value)` to check if the variable has a `truthy` value.
---

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
