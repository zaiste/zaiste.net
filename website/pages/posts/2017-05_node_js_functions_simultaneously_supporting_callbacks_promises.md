---
created_at: 2017-05-04 
kind: article
publish: true
title: "Node.js functions simultaneously supporting callbacks & Promises"
tags:
- nodejs
- promise
- javascript
---

Here's a simple trick to augment an existing callback function in Node.js with
a possibility to be used in a Promise context.

Let's start with the following function:

```js
function readFileAsArray(file, cb) {
  fs.readFile(file, (err, data) => {
    if (err) return cb(err);

    const lines = data.toString().trim().split('\n');
    cb(null, lines);
  });
};
```

Here's the same function augmented with Promise, so it can be used either if
callback context if it's specified or as Promise if the callback is omitted.

```js
function readFileAsArray(file, cb = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        reject(err);
        return cb(err);
      }
      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};
```

This trick is interesting in itself and it shouldn't be used in regular
programming practice as it may be confusing.

