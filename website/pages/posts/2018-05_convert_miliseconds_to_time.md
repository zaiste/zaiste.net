---
created_at: 2018-05-04
kind: article
publish: true
title: "Convert Miliseconds to hh:mm:ss.mmm Time in JavaScript"
tags:
- javascript
sitemap:
  priority: 0.8
abstract: >
---

The following JavaScript function converts miliseconds to `hh:mm:ss.mmm` time format:

```js
const msToTime = miliseconds => {
  const pad = (n, z = 2) => ('00' + n).slice(-z);
  const hh = pad(miliseconds / 3.6e6 | 0);
  const mm = pad((miliseconds % 3.6e6) / 6e4 | 0);
  const ss = pad((miliseconds % 6e4) / 1000 | 0);
  const mmm = pad(miliseconds % 1000, 3);

  return `${hh}:${mm}:${ss}.${mmm}`
}
```

Let's use it to convert the current UTC time:

```js
console.log(msToTime(new Date() % 8.64e7))
```

If the number of miliseconds is less than `86400000` (i.e. 24 hours), it can be simplified to the following function:

```js
const time = ms => new Date(ms).toISOString().slice(11, -1);
```
