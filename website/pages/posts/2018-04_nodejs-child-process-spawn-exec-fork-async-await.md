---
created_at: 2018-04-09
kind: article
publish: true
title: "Node.js Child Processes using spawn, exec, fork & async/await"
tags:
- nodejs
- javascript
- child_process
- async
sitemap:
  priority: 0.8
---

Node.js runs in a single thread. You can, however take advantage of multiple processes.

`child_process` module allows to create child processes in Node.js. Those
processes can easily communicate with each other using a built-in messaging system.

There are four different ways to create a child process in Node: `spawn()`, `fork()`, `exec()`, and `execFile()`.

`spawn` launches a command in a new process:

```js
const { spawn } = require('child_process')

const child = spawn('ls', ['-a', '-l']);
```

You can pass arguments to the command executed by the `spawn` as array using its second argument.

`spawn` returns a `ChildProcess` object. As `ChildProcess` inherits from `EventEmitter` you can register handlers for
events on it.

```js
child.on('exit', code => {
  console.log(`Exit code is: ${code}`);
});
```

Apart from `exit` event, there are also `disconnect`, `error`, `close` and
`message` events.

`message` event allows for the caller/parent to communicate with the child
process. This event is emitted when child process uses `process.send()`.

Child processes have three standard IO streams available: `stdin` (writeable),
`stdout` (readable) and `stderr` (readable). Streams also inherit from
`EventEmitter`. On readable streams there is `data` event emitted when a
commands run inside a child process outputs something.

```js
// Async Iteration available since Node 10
for await (const data of child.stdout) {
  console.log(`stdout from the child: ${data}`);
};
```

Since `stdin` of the main process is a readable stream, you can `pipe` it into
the `stdin` of the child process (which is a writeable stream).

```js
const { spawn } = require('child_process')

const child = spawn('wc');

process.stdin.pipe(child.stdin)

for await (const data of child.stdout) {
  console.log(`stdout from the child: ${data}`);
};
```

You can also pass the output of one child process as the input to the another
child process.

```js
const { spawn } = require('child_process')

const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-l']);

find.stdout.pipe(wc.stdin);

for await (const data of wc.stdout) {
  console.log(`number of files: ${data}`);
};
```

`spawn` doesn't create a shell to execute the command while `exec` does create a
shell. Thus, it's possible to specify the command to execute using the shell
syntax. `exec` also buffers the command's entire output instead of using a stream.

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
  const { stdout, stderr } = await exec('find . -type f | wc -l');

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`Number of files ${stdout}`);
}

main()
```

You can force `spawn` to create a shell using `shell: true` option.

```js
const { stdout, stderr } = await exec('find . -type f | wc -l', { shell: true });
```

`spawn` can also directly use IO streams of the parent/caller by specifying
`stdio: inherit` option. This way the output from the script will be displayed
immediately.

You can specify a directory to use for the command being executed by `spawn`
using `cwd` option.

You can also pass shell variables to the child process using `env` option. The
child process won't have access to environment variables of parent/caller.

```js
const child = spawn('echo $PYTHON_PYTH', {
  env: { PYTHON_PATH: '/usr/bin/python' },
});
```

`fork` is a variation of `spawn` where both the parent/caller and the child
process can communicate with each other via `send()`.

Thanks to `fork`, computation intensive tasks can be separated from the main
event loop.

In the example below, the server won't be blocked by the computation
intensive task triggered by `/compute` route. The task will be handled by
another Node process. Once it finished, the result will be send back to the
server so that it can be then returned over HTTP as a response.

```js
const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  };
  return sum;
};

process.on('message', message => {
  const result = longComputation();
  process.send(result);
});
```

```js
const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();

server.on('request', (request, response) => {
  if (request.url === '/compute') {
    const compute = fork('compute.js');
    compute.send('start');

    compute.on('message', result => {
      res.end(`Long computation result: ${result}`)
    });
  } else {
    res.end('Route not found')
  }
});

server.listen(3000);
```
