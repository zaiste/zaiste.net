+++
title = "Redirect Output to a File in Node.js"
[taxonomies]
topics = ["Node.js", "JavaScript"]
+++

Create a writeable stream using `fs.createWriteStream` with the `a` (append) flag:

```js
const fs = require('fs');
const { spawn } = require('child_process');

const logging = fs.createWriteStream('yourfile.log', { flags: 'a' });

const lsProcess = spawn('ls', ['-lh', '/etc']);
ls.stdout.pipe(logging);
ls.stderr.pipe(logging);

ls.on('close', code => {
  console.log(code);
});
```

Note that it is unsafe to use `fs.write` multiple times on the same file without waiting for its callback. For this scenario, `fs.createWriteStream` should be used.