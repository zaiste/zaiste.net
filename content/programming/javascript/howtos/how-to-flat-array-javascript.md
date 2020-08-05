+++
title = "Flatten an Array in JavaScript"
[taxonomies]
topics = [ "Node.js", "JavaScript" ]
+++

```js
const array = [1, [2, [3, [4, 5, 6]]]]

array.flat()  // == array.flat(1)
// [1, 2, [3, [4, 5, 6]]]

array.flat(Infinity)
// [1, 2, 3, 4, 5, 6]
```

`Array.prototype.flatMap` combines `flat` and `map`

```js
const duplicate = x => [x, x];

[2, 3, 4].map(duplicate);
// [[2, 2], [3, 3], [4, 4]]

[2, 3, 4].map(duplicate).flat();

// or

[2, 3, 4].flatMap(duplicate)

```

