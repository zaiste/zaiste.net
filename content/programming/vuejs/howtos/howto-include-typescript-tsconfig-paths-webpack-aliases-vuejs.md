
+++

+++
# How To Include TypeScript Paths from ```
undefined
``` as Webpack Aliases in Vue.js

[tsconfig-paths-webpack-plugin ](<https://github.com/dividab/tsconfig-paths-webpack-plugin >)allows Webpack to fetch paths defined in the```
undefined
```  as aliases. This way the information about paths in the project can be defined in a single place.

Use ```
undefined
``` to enable the ```
undefined
```

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

