---
created_at: 2017-05-10 
kind: article
publish: true
title: "Promise .catch & filtering errors using Bluebird"
tags:
- javascript
- promise
---

`.catch` is a method from Promise API for handling errors in promise chains. Native promises support only *catch-all* functionality similar to the synchronous `catch(e) { ... }` block. You need to explicitly check error's type using `instanceof` and `if/else` statements. 

```js
somePromise.then(() => someActionWhichThrows)
  .catch(error => {
	  if (error instanceof TypeError) {
      // handle TypeError
    } else if (error instanceof RangeError) {
      // handle RangeError
    } else {
      // handle other errors
    } 
  })
```

Bluebird, however, introduces a `.catch` variant which allows to filter specific errors directly.  Note that each `.catch` handler can accept more than one error.

```js
somePromise.then(() => someActionWhichThrows)
  .catch(TypeError, ReferenceError, error => {
    // catch & handle TypeError or ReferenceError
  })
  .catch(NetworkError, TimeoutError, error => {
	  // catch & handle NetworkError or TimeoutError
  })
  .catch(error => {
	  // catch & handle other errors
  });
```

The `.catch` parameter is considered to be an error if its `.prototype` property is an `instanceof Error`, e.g.

```js
function CustomError(message = "") {
  this.name = "NotImplementedError";
  this.message = message;
}
CustomError.prototype = Object.create(Error.prototype);
```

In order to also have the stack traces included, the above example needs to be slightly modified, i.e. 

```js
function CustomError(message = "") {
  this.name = "NotImplementedError";
  this.message = message;
  Error.captureStackTrace(this, CustomError);
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;
```

