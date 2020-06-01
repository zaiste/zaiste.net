
+++

+++
# How To Specify A Custom TypeScript ```
undefined
``` in Vue.js

Use the ```
undefined
``` option from the ```
undefined
``` configuration file to adjust the config for ```
undefined
``` and ```
undefined
``` accordingly.

```js 
module.exports = {
  chainWebpack: config => {
    config
      .plugin('fork-ts-checker')
      .tap(args => {
        args[0].tsconfig = './client/tsconfig.json';
        return args;
      });
  }
};
```

