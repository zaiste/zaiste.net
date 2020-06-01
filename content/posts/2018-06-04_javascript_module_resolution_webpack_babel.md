
+++
date = 2018-06-04T00:00:00.000Z


title = "JavaScript: Module Resolution with Webpack & Babel"
topics = [ "javascript", "webpack", "babel" ]
description = """
Use Webpack's resolve.alias or Babel's Module Resolver plugin to simplify imports in your JavaScript code.
"""

[extra]
priority = 0.8

+++

You can simplify the following code:

```js
import MyComponent from '../../../components/MyComponent';
```

into this:

```js
import MyComponent from 'components/MyComponent';
```

This way components can be found no matter where they are in the file hierarchy. This article will show two solutions: one using Webpack and another one using Babel.

## Using Webpack

Inside `webpack.config.js` add the following `alias` definition under `resolve`.

```js
resolve: {
  alias: {
    components: path.resolve('./your/path/to/components'),
  },
}
```

## Using Babel

Use [`babel-plugin-module-resolver`](https://github.com/tleunen/babel-plugin-module-resolver):

```
npm install --save-dev babel-plugin-module-resolver
```

Declare your paths under `root` inside `.babelrc`:

```json
{
  "plugins": [
    ["module-resolver", {
      "root": ["./src/**", "./src/your/components/**"]
    }]
  ]
}
```

You can also define an alias for some paths, which will be used as a prefix, e.g.

```json
{
  "plugins": [
    ["module-resolver", {
      "root": ["./src/**", "./src/your/components/**"]
      "alias": {
        "@test": "./test",
      }
    }]
  ]
}
```

Now you can references everything from `./test` directory by prefixing it name with `@test`:

```js
import MyTest from '@test/path/to/MyTest';
```


