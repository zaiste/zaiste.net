
+++

+++
# Webpack

Webpack recursively processes module imports in the code to build a dependency graph. Its result is a single bundle file. WebPack figures the order of imports on its own. The code must be written as JavaScript Modules, i.e.  a single JavaScript file that exports pieces of functionality for use in other parts of the application.

Webpack supports two standards for Module configuration: ECMAScript and CommonJS.

## Webpack 4

In Webpack 4 there is no need to define neither the entry point, nor the output file. By default, it goes from `src/index.js` to `dist/main.js`.

```bash
npm i webpack webpack-cli --save-dev
```

```json
"scripts": {
  "build": "webpack"
}
```

Webpack 4 adds `production` and `development` modes.

```json
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```

`production` mode enables various optimizations such as minification, scope hoisting, tree-shaking out of the box.

Webpack doesn’t know how to make the transformation but has loaders: think of them as of transformers. `babel-loader` is the webpack loader for transpiling ES6 and above, down to ES5.

```bash
npm i babel-core babel-loader babel-preset-env --save-dev
```

