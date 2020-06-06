+++
+++

# JavaScript Snippets

## Array

### Push

Using `apply` or `call`, the context parameter must be, obviously, the object in question.

```js
let a = [1];
a.push.apply(a, [2,3]); // more hacky => [1, 2, 3]

Array.prototype.push.apply(a, [4,5]); // more explicit => [1, 2, 3, 4, 5]
```

Or, just use the spread operator if possible:

```js
let a = [1];
a.push(...[2,3]);

// => [1, 2, 3]
```

### Flatten Array

```js
const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);
```

### Flatten Array (Deep)

```js
const flattenDeep = arr => Array.isArray(arr)
      ? arr.reduce((a, b) => [...flattenDeep(a), ...flattenDeep(b)] , [])
      : [arr]
```

### Sort Object Array By Date

Turn strings into dates if necessary.

Subtract dates to get a value that is either negative, positive, or zero.

```js
const array = [
  {id: 1, date: Mar 22 2012 11:00:00 AM},
  {id: 2, date: Mar 4 2012 08:00:00 AM}
];

array.sort((a,b) => (new Date(b.date) - new Date(a.date)));
```

### Fill

```js
const array = Array(5).fill('');
```

### Remove Duplicates

```js
Array.from(new Set(widgets));

// or


[...new Set(widgets)];
```

### Map with `.from`

```js
const names = Array.from(widgets, ({ name }) => name);
```

## Objects

### Conditional Spread

```js
const fetchUser = (isPrivateData) => {
  return {
    name: 'User',
    age: 18,
    ...isPrivateData && { email : 'user@user.com' }
  }
}
```

### Rest

```js
let user = {}, userDetails = {};
({ name: user.name, age: user.age, ...userDetails } = rawUser);
```

### Merge Objects

```js
const merge = (target, source) => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
  }

  Object.assign(target || {}, source)
  return target
}
```

## Date

### How to output an ISO 8601 formatted string in JavaScript?

```js
const date = new Date();
date.toISOString();      // "2010-11-13T13:31:23.493Z"
```

## Error

### Custom Error

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'CustomError';
  }
}
```

## Debugging

```js
let log = 'cache:set';
let colors = [];

const hash = data => {
  let hash = 0;

  for (let index = 0; index < data.length; index++) {
    hash = ((hash << 5) + hash + data.charCodeAt(index)) & 0xffffffff;
  }

  return hash;
};

let namespace = log.substring(0, log.indexOf(':'));
let color = colors[Math.abs(hash(namespace)) % colors.length];
```

## Promise

### From Callback to Promise

```js
const fetchUser = callback => {
  return dbUsers()
    .then(user => callback(null, user))
    .catch(error => callback(error))
}
```

```js
const fetchUser = async callback => {
  try {
    const user = await dbUsers();
    callback(null, user);
  } catch (error) {
    callback(error);
  }
}
```

```js
const callback2Promise = (callback, ...args) => {
  return new Promise((resolve, reject) => {
    return method(...args, (error, result) => {
      return err ? reject(error) : resolve(result);
    });
  });
}
```

### Delay: Promise-based Alternative to `setTimeout`

```js
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
```

## Lookup

Lookup Table

```js
const howIsBoo = state => {
  if (state === ‘HUNGRY’) return ‘WANTS FOOD’;
  if (state === ‘SAD’) return ‘CRYING’;
  if (state === ‘HAPPY’) return ‘LAUGHING’
  return ‘SLEEPING’
}
```

```js
const booFeelsTable = {
  ‘HUNGRY’: ‘WANTS FOOD’,
  ‘SAD’: ‘CRYING’,
  ‘HAPPY’: ‘LAUGHING’
}

const howIsBoo = state => booFeelsTable[state] || ‘SLEEPING’;
```

