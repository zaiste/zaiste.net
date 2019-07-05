---
created_at: 2018-01-12
kind: article
publish: true
title: "Node.js: Pass Command Line Arguments"
tags:
- nodejs
sitemap:
  priority: 0.8
abstract: >
  Use `process.argv`
---

Use `process.argv` to read the command line arguments

```js
// app.js
const args = process.argv;
console.log(args);
```

Run `app.js`


```bash
node app.js a b=2 -c
```
```
['node', '/path/to/app.js', 'a', 'b=c', '-c']
```

There are many packages in the Node.js ecosystem that provide more sophisticated argument parsing:

* [yargs](https://github.com/yargs/yargs)
* [commander.js](https://github.com/tj/commander.js)
* [meow](https://github.com/sindresorhus/meow)
* [vorpal.js](https://github.com/dthree/vorpal)
