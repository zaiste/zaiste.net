+++
+++

# How To Modify Options to the `ts-loader` Loader in Vue.js CLI

```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => {
        Object.assign(options || {}, { configFile: 'path/to/custom/tsconfig.json' })
        return options
      })
  }
}
```

