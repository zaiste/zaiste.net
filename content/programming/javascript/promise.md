
+++

+++
# JavaScript Promise

## Promise.all

The result of the following code is an array of promises. The work performed by each function inside the `map` may not be finished once the `map` itself finishes. The `await` only pauses its surrounding function.

```js
const download = async (urlList) =>
  urlList.map(async (url) => {
    const content = await doHTTPRequest(url);
    return content;
  });
```

`Promise.all` converts an array of promises to a promise, which will be fullfiled once all promises in its array are fullfiled.

```js
const download = async (urlList) => {
  const promises = urlList.map(async (url) => {
    const content = await doHTTPRequest(url);
    return content;
  });

  return await Promise.all(promises);
}
```

The callback defined for `map` can be simplified

```js
const download = async (urlList) => {
  const promises = urlList.map((url) => doHTTPRequest(url));
  return await Promise.all(promises);
}
```

Also, there is no need to unwrap the `Promise.all` so that it's then wrap again into a promise by the `return` of this `async` function.

```js
const download = (urlList) => {
  const promises = urlList.map((url) => doHTTPRequest(url));
  return Promise.all(promises);
}
```

In `forEach`, its callbacks are resolved asynchronously, which means that they may not be finished when the `forEach` finishes:

```js
const someFunction = async (urls) {
  urls.forEach(async url => {
    const content = await httpGet(url);
    console.log(content);
  });
  // ^ Those callbacks may not be finshed
  // once this lien if reached
}
```

This can be resolved with the `for...of` loop.

```js
const someFunction = async (urls) {
  for (const url of urls) {
    const content = await httpGet(url);
    console.log(content);
  }
  // Once this line is reached all iterations are finished
}
```

In this case, iterations are ordered sequentially i.e. the previous must finish so that the next can start. If there is a need to trigger them concurrently, `Promise.all` can be used:

```js
const someFunction = async (urls) {
  await Promise.all(urls.map(
    async url => {
      const content = await httpGet(url);
      console.log(content);
    }));
}
```

