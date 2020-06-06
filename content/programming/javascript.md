+++
title = "JavaScript"
[extra]
howtos = true
+++

JavaScript is a programming language.

It has many awkward edge cases and clunky idioms.

## [JavaScript Snippets](@/programming/javascript/snippets.md)

## [JavaScript Libraries](@/programming/javascript/libraries.md)

## JavaScript HowTos

-   [How to Flat an Array in JavaScript](@/programming/javascript/howtos/how-to-flat-array-javascript.md)
-   [How to Make an HTTP Request using XMLHttpRequest (XHR)](@/programming/javascript/howtos/how-to-make-http-request-xhr.md)
-   [How to Reduce over Objects](@/programming/javascript/howtos/how-to-reduce-objects.md)

## Prototypes

Prototypes in JavaScript correspond to trait in [Self](@/programming/self.md).

The last 10 years have seen an influx of users who didn't bother to learn the older feature of JavaScript and pushed for features from Java and other languages, such as class-based inheritance)

JavaScript is now a language with both systems with many inconsistencies between them. Thus, it isn't a good idea to use both in the same codebase. It is better to use the class-based features which are more common/popular today. Mixing in prototypical and class-based systems will result in an incoherent system.

### Rules of Prototypes in JavaScript

1. Prototypes in JavaScript are objects or `null`.
2. Every object in JavaScript can have one and only one prototype.
3. For a property that doesn't exist on the object, the object will delegate
   the lookup to its prototype.
4. When calling a function on an object, the `this` will be bound to that
   object, even if the function is defined in the object's prototype.
5. Every prototype is an object, thus this prototype can also have a prototype.


## ES6 (ES2015)

ECMAScript 2015 introduced a class model.

## Async Iterators

Async iterators are a [candidate feature (stage 3 Proposal) for ECMAScript](https://github.com/tc39/proposal-async-iteration) that allows iteratators to produce results asynchronously. Async interators can be only used inside asynchronous functions.

```js
for await (let line of readlines()) {
  console.log(line);
}
```

To build an asynchronous source of data, async generators can be used:

```js
async function * readlines() {
  for (let i = 0; i < 10; i++) {
    yield getRandomLine();
  }
}
```

## Engines

### ChakraCore

[ChakraCore](https://github.com/microsoft/ChakraCore) is an open source JavaScript engine that powers Microsoft Edge and Windows 10 applications. It supports JIT compilation, garbage collection, and a wide range of ESNext features.

## Generators

Generators are a particular case of coroutines. A coroutine is a procedure (function, method) that retains its execution state between consecutive calls.

## Console

The `console` module provides functions to print information on both `stdout`
and `stderr` streams.

`console.log` prints to `stdout` with the newline at the end. It supports
`printf`-like formating (`%s` string, `%i` integer, `%o` object, `%f` float,
`%d` decimal)


```js
console.log('You age is %d', 17);
```

Also, `console.log` output can be formatted using CSS:

```js
console.log("%cThe text is blue and the background is pink", "color: blue; background-color: pink;")
```

`console.error` is exactly as `console.log`, but it prints to `stderr` instead
of `stdout`.

`console.dir` formats its arguments using `util.inspect` and prints the result
to `stdout`.

`console.time(label)` starts a timer with the `label` as a bookmark, while
`console.timerEnd(label)` ends a timer started with `label`, and it prints the
elapsed time to `stdout.`

`console.trace` prints out a stack trace where it's invoced.

`console.count(label)` prints how many times a log with the `labal` has been printed

`console.assert(condition)` prints only if the condition is *not* satisfied

```js
console.assert(n % 3 === 0, "n is not divisable by 3")
```

`console.table` prints objects in tabular way using three columns: index, key, value.

`console.group` allows to group other logs with a graphical delimiters.

## Modules

### ECMAScript Modules

The ECMAScript modules standard uses the `export` and `import` keywords.

### CommonJS

The CommonJS standard uses `module.exports` and `require()` function.

