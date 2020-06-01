
+++

+++
# How To Make an HTTP Request using XMLHttpRequest

```js 
function httpGet(url, responseType="") {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.onload = () => {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    request.onerror = () =>
      reject(new Error(`Error: ${this.statusText}`));

    request.open('GET', url);
    xhr.responseType = responseType;
    request.send();
  });
}

```

