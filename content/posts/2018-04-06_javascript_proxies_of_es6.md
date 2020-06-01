
+++
date = 2018-04-06T00:00:00.000Z


title = "JavaScript Proxies of ES6"
topics = [ "javascript", "es6" ]

[extra]
priority = 0.8

+++

[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), a new feature of ES6, allows to intercept operations performed on objects. It’s located between the object and its caller, mediating the exchange of values. It allows to write generic wrappers around objects.

*target* is an object for which the proxy will be created.

*trap* is an operation to intercept. It is defined as a function in an object called *handler*.  The names of the traps are predefined, e.g. `get` trap intercepts accessing a property of an object, `set` trap intercepts setting a value on a property of an object and `deleteProperty` trap intercepts deleting an property of on object. Here’s a list of [available traps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Handlers are regular objects.

```js
const handler = {
  get(target, property, receiver) {
    console.log(`get on property: ${property}`);
    return target[property];
  }
};
```

`get` trap receives three parameters: `target`, `property`, `receiver`. `target` is the destination object, `property` is the name of the property being accessed, `receiver` is either the proxy or an object that inherits from the proxy.

`Proxy` constructor allows to combine the handler with an object.

```js
const myProxy = new Proxy(destinationObject, handler);
```

Proxy allows to check the object for a property key, and if it does not exist, it can send its own response too.

Here’s an example how to handle non-existent properties.

```js
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      return target[property];
    }
    return 'Property not found';
  }
};
```

Operations  for which there are no traps defined, are passed directly to that object.

Finally, here’s a function that registers a trigger function for on object on each operation for that object.

```js
const registerTrigger = (destinationObject, trigger) => {
  const handler = {
    get(target, property, receiver) {
      trigger();
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value) {
      trigger();
      return Reflect.set(target, property, value);
    },
    deleteProperty(target, property) {
      trigger();
      return Reflect.deleteProperty(target, property);
    }
  };

  return new Proxy(destinationObject, handler);
};
```
