+++
title = "Reduce over Objects"
[taxonomies]
topics = [ "JavaScript" ]
+++


For the following data set, calculate the `score` average only for `available` widgets.

```js
const widgets = [
  {
    score: 123,
    available: false,
    name: 'Widget 1'
  },
  {
    score: 331,
    available: true,
    name: 'Widget 2'
  },
  ...
]
```

## Reduce with an object as accumulator

```js
const calculate = ({ total, length }, score) => ({ total += score, length += 1 })
const init = { total: 0, length: 0 }


const { total, length } = widgets.filter(({ available }) => available)
                                 .map(({ score }) => score)
                                 .reduce(calculate, init)

const average = total / length;
```

## Point-free Function Composition

```js
const filter = predicate => arr => arr.filter(predicate);
const map = fn => arr => arr.map(fn);
const cursor = path => obj => obj[path];
const reduce = acc => init => arr => arr.reduce(acc, init);
const compose = (...fns) => arg => fns.reduceRight((arg, fn) => fn(arg), arg);
const combinator = f => g => h => arg => f(g(arg))(h(arg));

const sum = reduce((arr, elem) => arr + elem)(0);
const length = arr => arr.length;
const divide = x => y => x / y;

const calculate = compose(
  combinator(divide)(sum)(length),
  map(cursor('score')),
  filter(cursor('available'))
);

const average = calculate(widgets);
```

## Using Reducers

```js
const reducers = {
  filter: predicate => (acc, elem) => predicate(item) ? acc.concat([elem]) : acc,
  map: fn => (acc, elem) => acc.concat([fn(elem)]),
}

const availableReducer = reducers.filter(({ available }) => available);
const scoreReducer => reducers.map(({ score }) => score);

const { total, length } = widgets.reduce(availableReducer, [])
                                 .reduce(scoreReducer, [])
                                 .reduce(calculate, init);
```

## Using home-grown Transducers

```js
const transducers = {
  filter: predicate => step => (acc, elem) => predicate(item) ? step(acc, item) : acc,
  map: fn => step => (acc, elem) => step(acc, fn(elem))
}

const availableTransducer = transducers.filter(({ available }) => available);
const scoreTransducer => transducers.map(({ score }) => score);

const reducer = availableTransducer(scoreTransducer(calculate));

const { total, length } = widgets.reduce(reducer, init);

```

## Using Ramda Transducers

```js
import { compose, filter, map, transduce } from 'ramda';

const prepare = compose(filter(({ available }) => available), map(({ score }) => score));

const { total, length } = transduce(
  prepare,
  calculate,
  init,
  widgets
)

```

