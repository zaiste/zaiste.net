+++
title = "Capture `File Not Found` error for fs.readFile in Node.js"
[taxonomies]
topics = [ "Node.js", "JavaScript" ]
+++

First catch the error using the `try / catch` block:

```js
try {
  const content = await fs.readFile('foo.bar', 'utf-8');
} catch (error) {
  // ...
}
```

You cannot detect which error has been thrown just by looking at its prototype chain. You need to check the `code` property instead:

```js
try {
  const content = await fs.readFile('foo.bar', 'utf-8');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('File not found!');
  } else {
    throw err;
  }
}
```

This way, you deal only with this specific error and re-throw all the others.
