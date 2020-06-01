
+++
date = 2017-05-07T00:00:00.000Z


title = "What's new in Node 8"
topics = [ "nodejs", "javascript" ]

+++

Here's an incomplete list of new features and additions in [Node 8](https://nodejs.org/en/) with a commentary to provide some context. For the full list check [the official release](https://nodejs.org/en/blog/release/v8.0.0/).

### Promisify

Node 8 adds an ability to promisify callback functions to its core as `util.promisify`

```js
const promisify = require('util').promisify;
const stat = promisify(require('fs').stat);
```

`setTimeout` can be also  `promisify`'d despite having flipped arguments thanks to a built-in `util.promisify.custom` definition.

```js
const promisify = require('util').promisify;
const sleep = promisify(setTimeout);
```

`promisify` is very simple function, here's how we could implement it on our own.

```js
function promisify(fn, ctx) {
  return (...args) =>
    new Promise((resolve, reject) =>
      fn.apply(ctx, [ ...args,
        (err, data) => err ? reject(err) : resolve(data)
      ])
    )
}
```

### Buffers

Before Node 8, allocating new buffers using `new Buffer(Number)` constructor did not initialize the memory space with zeros; thus, `Buffer` instances could leak sensitive information, leading to security problems.

### npm 5 by default

Node 8 ships with `npm` 5 which provides:
* a  lockfile  (`package-lock.json`) meant for cross-package-manager compatibility
* `npm` installs are saved by default,  `--save` is no longer necessary
* node-gyp now supports node-gyp.cmd on Windows,
* package publishes includes now both `sha512` and `sha1` checksums.

### Naming & LTS

In order to avoid confusion with V8, the underlying JavaScript engine, Node.js team have dropped the "v" when referring to Node.js release versions. Node 8.0.0 is not an LTS release, the first 8.x LTS release will [happen in October](https://github.com/nodejs/lts).

### Trailing commas for function parameters & arguments

Since versions 0.x, Node.js supports trailing commas in objects and in arrays, making multiline object and array definitions easier to extend and to use with version control systems. Node 8 extends that support to function parameters and arguments.

Function parameters while defining a function.

```js
function func(
  param1,
  param2,
  param3, // this will throw a ParseError before Node 8
) {
  …
}
```

Function arguments while invoking a function.

```js
func(
  ‘a’,
  ‘b’,
  ‘c’, // this will throw a ParseError before Node 8
);
```

### Object rest and speard

Node 8 adds support for object rest & spread operators extending the existaing array rest & spread operators.

Similar to array rest, the object rest operators gathers the non-destructured keys remaining in that object:

```js
const h = { a: 1, b: 2, c: 3 };
const { a, ...rest } = h;
console.log(rest); // { b: 2, c: 3 }
```

Object spread inserts the respective object’s key-value pairs into the target object; it can be used as a replacement for `Object.assign`.

```js
const h1 = { a: 1, b: 2, c: 3 };
const h2 = { d: 4, e: 5 };
const h3 = {};

const h = { ...h1, ...h2, ...h3 };
console.log(h); // { a: 1, b: 2, c: 3, d: 4, e: 5 }
```

### Async Hooks

`async_hooks` module, formerly known as `async_wrap`, provides a diagnostics API to monitor the operation of the Node.js event loop, tracking asynchronous requests and handles through their complete lifecycle

### V8 5.8

Node 7.6 shipped with V8 version 5.5 which allowed for the native `async/await` support (without the `--harmony` flag). Node 8 pushes that further by shipping with V8 5.8 that includes major improvements in performance and developer facing APIs. Additionally, the V8 5.8 engine simplifies the upcoming transition to the new [TurboFan + Ignition](https://v8project.blogspot.com/2017/05/launching-ignition-and-turbofan.html) compiler pipeline, which promises to provide significant new performance optimizations for all Node.js applications.
