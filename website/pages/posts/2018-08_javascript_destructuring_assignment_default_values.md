---
created_at: 2018-08-03
kind: article
publish: true
title: "JavaScript · Destructuring Assignment with Default Values"
tags:
- javascript
- es6
sitemap:
  priority: 0.8
abstract: > 
  The destructuring assignment is a new syntax to get a part of an array or of 
  an object and assign it to a variable in a more convenient way. It is also 
  possible to set default values when using destructuring assignment.
---

The destructuring assignment is a new syntax to get a part of an array or of an
object and assign it to a variable in a more convenient way. It is also possible
to set default values when using destructuring assignment. 

```js
const user = {
  name: 'Zaiste',
}
const { name, age } = user;

console.log(age);
```
```
undefined
```

`const` *creates* variables, so in the previous example `age` is `undefined`.

```js
const user = {
  name: 'Zaiste',
}
const { name = 'Basia', age = 21 } = user;

console.log(name);
console.log(age);
```
```
Zaiste
21
```

Default values in destructuring assignement only work if the variables either
don't exist or their value is set to `undefined`. Any other value, including
`null`, `false` and `0`, bypasses the default values in the destructuring
statement.

```js
const dummy = {
  name: undefined
}

const { name = 'Basia' } = dummy;
console.log(name)
```
```
Basia
```

while for `null`:

```js
const dummy = {
  name: null
}

const { name = 'Basia' } = dummy;
console.log(name)
```
```
null
```

You can combine default values with renaming in the destructuring assignment.

```js
const user = {
  name: 'Zaiste',
}
const { name: author = 'Basia', age = 21 } = user;

console.log(author);
```
```
Zaiste
```

This creates `author` variable, while `name` is just a label to specify the
field to destruct against - it doesn't exist as a separate variable.


