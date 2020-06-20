+++
title = "Module Systems in JavaScript"
[taxonomies]
topics = [ "JavaScript" ]
+++


Module Systems provide a way to manage dependencies in JavaScript.

In vanilla client-side JavaScript development, dependencies are implicit: they need to be defined _manually_, sometimes they need to be also defined in certain order.

Node.js Modules is an extension to CommonJS Modules (1.1).

Asynchronous Module Definition (AMD) is the most popular for client-side code.

Universal Module Definition (UMD) is a set of boilerplate recipes that attempt to bridge the differences between AMD and Node.js.

## The Revealing Module Pattern

```js
var simpleModule = (function () {
    var privateVariable = "A";

    function privateFunction() {
        console.log("Name:" + privateVariable);
    }

    return {
        letter: publicVariable,
        printName: privateFunction
    };
})();

simpleModule.printName();
```

## CommonJS

CommonJS is a specification project to help in the development of server-side JavaScript applications. One aspect of CommonJS project are modules.

Node.js developers originally intended to follow the CommonJS specification but later decided against it.

CommonJS provides two keywords to interact with the module system: `require` & `exports`.

`require` is a function that imports a module by id (in Node.js, it's the name of the module from the `node_modules` directory).

`exports` is an object that exports its fields as public elements.

A difference between Node.js and CommonJS: the `module.exports` object, which has a special meaning in Node.js, while `exports` is just a variable that gets bound by default to `module.exports`. In CommonJS, there is no `module.exports` object.

CommonJS modules are synchronous: they are loaded at the moment and in the order they are required inside a source file.

## Asynchronous Module Definition

AMD was created in response to the shortcomings of CommonJS, namely the support for asynchronous module loading.

In AMD, you call the `define` function with a dependency array and a factory function. This way you define the module value (the `return` statement):

```js
define(['dep1', 'dep2'], function (dep1, dep2) {
    return function () {

    };
});


```

Another way of using AMD:

```js
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');

    return function () {};
});
```

Asynchronous loading is made possible by using JavaScript's traditional closure idiom: a function is called when the requested modules are finished loading. Module definitions and importing a module is carried by the same function: when a module is defined its dependencies are made explicit. An AMD loader can therefore have a complete picture of the dependency graph for a given project at runtime. Libraries that do not depend on each other for loading can thus be loaded at the same time. This is particularly important for browsers, where startup times are essential to a good user experience.

## ECMAScript Modules

ECMA team behind the standardization of JavaScript decided to tackle the issue of modules.

It supports both synchronous and asynchronous modes of operation.

The static nature of the import and export directive allows static analyzers to build a full tree of dependencies without running code.

ES2015 does not support dynamic loading of modules.

ES2015 only specifies the syntax for static module loaders.

