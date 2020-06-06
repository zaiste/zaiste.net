
+++
date = 2017-04-26T00:00:00.000Z


title = "Asynchronous JavaScript and Event Loop Explained"
topics = [ "javascript" ]

+++

What does it mean **asynchronous** in the context of JavaScript ? In order to understand that term, let's take a look at the following code:

```js
fs.readFile('poem.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

There is a single function `fs.readFile` being invoked which takes two arguments as its input: a string with the name of a file and another function often named as callback.

Asynchronous means the program will continue running right after the `fs.readFile` invocation without waiting for the callback to be completed or even to be run. The function passed in as argument  (callback) will be triggered (called back) at some point in the future. Additionally, the callback gets a [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) i.e. the variables outside of the function will be available at the time of executing it - being able to quickly identify those variables feels natural when writing JavaScript, but it's not that obvious when considering how it's implemented internally (you can read more about closure [here](https://stackoverflow.com/questions/36636/what-is-a-closure), [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures), [here](https://stackoverflow.com/questions/111102/how-do-javascript-closures-work) and [here](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36)). Behind the scene `fs.readFile` calls a potentially blocking system call.

This is possible because JavaScript has a concurrency model known as « event loop ». Let's review some basic concepts. A frame is a function name, its arguments and its local variables.  A stack is a registry consisting of frames of invoked and not yet finished functions. A heap is an unstructured region of memory where objects are allocated. A message queue is a list of messages to be processed.

[Google's V8](https://en.wikipedia.org/wiki/Chrome_V8) or [Microsoft's Chakra](https://en.wikipedia.org/wiki/Chakra_(JScript_engine)) are examples of JavaScript runtimes. A JavaScript runtime contains a stack, a heap and a message queue. Each message in the queue corresponds to a function. A message is taken out of the queue and processed, which means its function is invoked when there is enough room on the stack (initial stack frame). The message processing ends when the stack becomes empty again. Each message is processed completely before any other message is processed. Messages are added to the queue any time an event occurs and there is an event listener attached to that event. If there is no listener, there's no message added to the queue and the event is lost. Calling `setTimeout` will add a message to the queue after the given time.  If there is no other message in the queue, the message is processed right away; however, if there are messages, the `setTimeout` message will have to wait for other messages to be processed. For that reason the second argument indicates a minimum time and not a guaranteed time.

Here's how event loop operates written as pseudo-code.

```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

`queue.waitForMessage` waits synchronously for a message to arrive if there is none currently. Once there is a message, it is processed; and the whole operation repeats.

Why it is done this way? JavaScript started as a sort of "quick and dirty" scripting language for web browsers at Netscape. Creating a completely separate, well-thought concurrency model wasn't possible. JavaScript ended up being single-threaded with callbacks that run within the same event loop as the browser GUI itself i.e. they share the same message queue. Node.js naturally inherited this concurrency mechanism.

It is important to avoid CPU-bound code in JavaScript or all the benefits of the "non-blocking" event loop model will be lost. CPU-bound means that a function hijacks CPU for computation intensive operation preventing other functions to use it. In other words, the process blocks on that particular function until it finishes and other ones cannot be treated.

In Node.js, while user application is single-threaded, the IO (network, filesystem) is asynchronous (i.e. it never blocks) and may be scheduled and executed on an thread-pool. I say « may » here, because it's an Node.js runtime implementation detail that depends on the operating system - it's different for Windows, Unix or *BSD, e.g. in Linux, network IO uses `epoll` while filesystem IO uses a thread pool. Node.js uses [libuv library](http://libuv.md) to abstract those asynchronous operations by using operating system's facilities (which are different on each OS).

A [web worker](https://en.wikipedia.org/wiki/Web_worker) or a cross-origin `iframe` has its own stack, heap, and message queue. Distinct runtimes  can only communicate by sending messages using `postMessage` method: it adds a message to the other runtime if that runtime has listeners set up for appropriate events. It should be noted that web workers are a browser specification; there are, however, some Node.js related implementations out there.

