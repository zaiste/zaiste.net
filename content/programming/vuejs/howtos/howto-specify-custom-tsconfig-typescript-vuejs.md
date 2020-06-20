+++
title = "How To Specify A Custom TypeScript `tsconfig.json` in Vue.js"
[taxonomies]
topics = [ "Vue.js", "JavaScript" ]
+++


Use the `chainWebpack` option from the `vue.config.js` configuration file to adjust the config for `ts-loader` and `fork-ts-checker-plugin` accordingly.

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

