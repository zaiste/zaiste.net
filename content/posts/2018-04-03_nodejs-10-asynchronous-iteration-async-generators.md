+++
date = 2018-04-03T00:00:00.000Z
title = "Node.js 10 Asynchronous Iteration & Async Generators"
aliases = [
  "nodejs_10_asynchronous_iteration_async_generators"
]
[taxonomies]
topics = [ "Node.js", "JavaScript" ]
[extra]
priority = 0.8
+++

Asynchronous iteration is an improvement over callback-based processing. It will be [available in Node 10](https://nodejs.org/download/nightly/v10.0.0-nightly2018033083d44bee01/docs/api/stream.html#stream_readable_asynciterator). This will allow to asynchronously iterate over readable streams. Additionally, it allows to use `map()` and `filter()` operations on asynchronous data.

Here’s the current, callback-based approach to asynchronously read the contents of a file.

```js
const stream = fs.createReadStream(filepath, {
  encoding: 'utf8',  // null -> buffers, 'utf8' -> strings with that encoding
  highWaterMark: 1024 // maximum size of each chunk (buffer or string)
});
stream.on('data', chunk => {
  console.log(`Read: ${chunk}`);
});
stream.on('end', () => {
  console.log('EOF');
});
```

Here’s the new approach to asynchronously read the contents of a file using asynchronous itertion.

```js
const stream = fs.createReadStream(filepath, {
  encoding: 'utf8',  // null -> buffers, 'utf8' -> strings with that encoding
  highWaterMark: 1024 // maximum size of each chunk (buffer or string)
});
for await (const chunk of stream) {
  console.log(`Read: ${chunk}`);
}
console.log('EOF');
```

This loop is only available inside async functions.

It is also possible to create asynchronous iterables (i.e. something that represents a collection of elements) from async functions using async generators so that the function is the source of that iterable.

Async generator consumes an asynchronous iterable (e.g. a readable streams) using `for-await-of` and returns another async iteration with data being pushed into it using `yield`.

As async functions can be combined, this way async iterables can be chained similarly to Unix piping.

Here’s an async generator that takes a collection of lines and returns a collection of numbered lines.

```js
async function* fromLinesToNumberedLines(lines) {
  let counter = 1;
  for await (const line of lines) {
    yield `${counter}: ${line}`;
    counter++;
  }
}
```

Combined functions are interwind. Each function processes each chunk as sonn as they arrive. This way such approach can handle large files without any memory-related problems.