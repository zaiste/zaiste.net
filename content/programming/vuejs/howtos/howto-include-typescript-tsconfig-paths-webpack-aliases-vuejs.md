+++
title = "How To Include TypeScript Paths from `tsconfig.json` as Webpack Aliases in Vue.js"
+++


[tsconfig-paths-webpack-plugin](https://github.com/dividab/tsconfig-paths-webpack-plugin) allows Webpack to fetch paths defined in the `tsconfig.json` as aliases. This way the information about paths in the project can be defined in a single place.

Use `vue.config.js` to enable the `tsconfig-paths-webpack-plugin`

```js
module.exports = {
  chainWebpack(config) {
    config.resolve.alias.delete("@")
    config.resolve
      .plugin("tsconfig-paths")
      .use(require("tsconfig-paths-webpack-plugin"))
  },
}
```

