
+++

+++
# JavaScript

JavaScript is a programming language.

It has many awkward edge cases and clunky idioms.

## [JavaScript Snippets](file:javascript/snippets.org)

## [JavaScript Libraries](file:javascript/libraries.org)

## JavaScript HowTos

-   [How to Flat an Array in JavaScript](file:javascript/howtos/how-to-flat-array-javascript.org)
-   [How to Make an HTTP Request using XMLHttpRequest (XHR)](file:javascript/howtos/how-to-make-http-request-xhr.org)
-   [How to Reduce over Objects](file:javascript/howtos/how-to-reduce-objects.org)

## Prototypes

Prototypes in JavaScript correspond to trait in [Self](file:self.org).

The last 10 years have seen an influx of users who didn't bother to learn the older feature of JavaScript and pushed for features from Java and other languages, such as class-based inheritance)

JavaScript is now a language with both systems with many inconsistencies between them. Thus, it isn't a good idea to use both in the same codebase. It is better to use the class-based features which are more common/popular today. Mixing in prototypical and class-based systems will result in an incoherent system.

### Rules of Prototypes in JavaScript

1.  Prototypes in JavaScript are objects or 

    ```
    undefined
    ```

    .
2.  Every object in JavaScript can have one and only one prototype.
3.  For a property that doesn't exist on the object, the object will delegate the lookup to its prototype.
4.  When calling a function on an object, the 

    ```
    undefined
    ```

     will be bound to that object, even if the function is defined in the object's prototype.
5.  Every prototype is an object, thus this prototype can also have a prototype.

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

The ```
undefined
``` module provides functions to print information on both ```
undefined
```and ```
undefined
``` streams.

```
undefined
``` prints to ```
undefined
``` with the newline at the end. It supports```
undefined
```-like formating (```
undefined
``` string, ```
undefined
``` integer, ```
undefined
``` object, ```
undefined
``` float,```
undefined
``` decimal)

```js 
console.log('You age is %d', 17);
```

Also, ```
undefined
``` output can be formatted using CSS:

```js 
console.log("%cThe text is blue and the background is pink", "color: blue; background-color: pink;")
```

```
undefined
``` is exactly as ```
undefined
```, but it prints to ```
undefined
``` instead of ```
undefined
```.

```
undefined
``` formats its arguments using ```
undefined
``` and prints the result to ```
undefined
```.

```
undefined
``` starts a timer with the ```
undefined
``` as a bookmark, while```
undefined
``` ends a timer started with ```
undefined
```, and it prints the elapsed time to ```
undefined
```

```
undefined
``` prints out a stack trace where it's invoced.

```
undefined
``` prints how many times a log with the ```
undefined
``` has been printed

```
undefined
``` prints only if the condition is **not** satisfied

```js 
console.assert(n % 3 === 0, "n is not divisable by 3")
```

```
undefined
``` prints objects in tabular way using three columns: index, key, value.

```
undefined
``` allows to group other logs with a graphical delimiters.

## Modules

### ECMAScript Modules

The ECMAScript modules standard uses the ```
undefined
``` and ```
undefined
``` keywords.

### CommonJS

The CommonJS standard uses ```
undefined
``` and ```
undefined
``` function.

