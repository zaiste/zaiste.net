+++
date = 2017-04-30T00:00:00.000Z
title = "JavaScript: is it a class or a function?"
aliases = [
  "javascript_is_it_a_class_or_a_function"
]
[taxonomies]
topics = [ "JavaScript" ]
+++

Classes in ES6 are in fact functions: the new `class` syntax introduces class expressions and class declarations, similar to function expressions and function declarations.

Class declaration allows to define a class using the `class` keyword followed by the name of the class i.e.

```js
class Human {
	constructor() {}
}
```

It important to remember that, unlike function declarations, class declarations aren't hoisted, which means a class must be defined prior to using it.

Class expression is less common way to define a class: similar to function expressions, it can be named or unnamed, i.e.

```js
// unnamed
const Human = class {
}

// named
const Human = class Human {
}
```

Functions introduced via `class` syntax must be instantiated with `new` keyword. ES2015 specification says that the string representation of a function in JavaScript must provide the actual syntax of a function declaration, function expression, generator declaration, generator expression, class declaration, class expression, arrow function, method definition or generator method depending upon the actual characteristics of that object

For that reason the simplest way  to check if a function is ES6 class or not is to check the result of applying `.toString()` method on it.

```
function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}
```

```js
class Human {}
isClass(Human) // true

function speak() {}
isClass(speak) // false
```


