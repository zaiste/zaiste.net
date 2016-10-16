---
created_at: 2017-03-01
kind: article
publish: true
title: "Modern Node.js: async/await syntax"
tags:
- nodejs
- async
- await
---

`async/await` syntax greatly simplifies JavaScript code by making it more readable and shorter. It removes the need for many of external flow control libraries to deal with asynchronous code. Regular, synchronous JavaScript constructs such as `if`s or `for`s can be used in most cases, e.g. `for` based iteration often replaces recursive patterns used with Promise approach. It also unifies the error handling with the vanilla `try ... catch` construct, a single syntax to handle both synchronous & asynchronous errors. Starting from the version 7.6, Node.js provides native support for `async/await`.

`async` function are based on promises, i.e. its return value is always a promise. You can use `await` only within a function declared as `async`. Entities being `await`ed are in fact promises.

```js
async function unexpected() {
  const randomDelay1 = Math.floor(Math.random() * 1000 * 2);
  const randomDelay2 = Math.floor(Math.random() * 1000 * 2);

  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve('Hello, World!'), randomDelay1);
      setTimeout(() => reject(new Error('Something went wrong')), randomDelay2);
    });

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

unexpected();
```

Using `await` with any object that has a `then()` function will also work.

```js
async function awaitable() {
  await { then: resolve => setTimeout(() => resolve(), 1000) };
}

awaitable();
```

A promise either resolves (a slightly fancier way to say it finishes) and returns a value, or it rejects with an error. When using promises directly, the returned value is pushed to `.then`'s callback as the parameter while error are handled by the `.catch` clause.

```js
// `request` returns a promise
request("http://url.com")
  .then(response => {
    // handle the HTTP response
  })
  .catch(error => {
    // handle error
  })
```

`async/await` handles those two cases with synchronous construts i.e. an assignment when a resolved promise returns a value, and `try ... catch` for exceptions.

```js
try {
  const response = await request("http://url.com");
  // handle the HTTP response
} catch(error) {
  // handle error
}
```

Chaining `.then`s is no longer needed. Promises or `async` functions are supposed to be `await`ed, otherwise you will get a reference to the promise itself and not its value. The execution will resume once they resolve. Using `await` on a non-promise entity, simply returns that entity.

Additionally, variables are easier to access as they are available on the same scope and not limited to the scope of a callback from a particular `.then`  that may exist at each step of that promise chain. Asynchronous promise rejections become synchronous errors.

You can only `await` one thing at a time, which makes the following code to run *sequentially*

```js
// requests are made one after another
const response1 = await request("http://url-1.com");
const response2 = await request("http://url-2.com");
```

You could make concurrent requests by only starting those promises and then awaiting returned references, but this approach is not advised as it may be confusing.

```js
// requests are made « at the same time » i.e. concurrently
const request1 = request("http://url-1.com");
const request2 = request("http://url-2.com");
const response1 = await request1;
const response2 = await request2;
```

You can combine `await` with promise utilities such as `Promise.all` or `Promise.race` which will execute multiple promises concurenly and which provide a better coding pattern for handling concurrency.

`Promise.all` waits for every promise from an array to resolve and then resolves itself to an array containing the values of resolved promises.

```js
const request = require('request');

async function concurrentRequests() {
  const urls = [
    'https://domain1.com',
    'https://domain2.com',
    'https://domain3.com',
  ];

  const requests = urls.map(request);
  console.log(await Promise.all(requests));
}

concurrentRequests();
```

`Promise.race` waits for the first promise from an array to resolve and the resolves itself to a value of that promise. The remaining promises will continue executing as promises are not (yet) cancellable.

```js
async function execute(ms) {
  await new Promise(resolve => setTimeout(() => resolve(), ms));
  console.log('Worker executed for', ms);
}

async function main() {
  const workers = [333, 666, 999].map(execute);
  console.log('First who finished', await Promise.race(workers));
}

main();
```

In summary `async/await`  synxtax provides a simple way to write asynchronous code similar to how synchronous code is written. It not only fits well with Node.js asynchronous nature, but it makes writing that asynchonous code much easier.
