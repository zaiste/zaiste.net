
+++

+++
# TypeScript as Bundler instead of Webpack or Browserify

TypeScript supports bundling for AMD and System.js module formats.

In order to create a bundle you need to specify the ```
undefined
``` compiler option:

```json 
{
  "compilerOptions": {
    "module": "system",
    "outFile": "dist/bundle.js"
  },
  "include": [
    "src/**/*"
  ]
}
```

or the ```
undefined
``` command-line parameter:

```js 
tsc --outfile ./dist/bundle.js --module system ./src/index.ts
```

## Using System.js

System.js provides a minimal (1.5kb) loader for loading modules. The```
undefined
``` call to load the entry point; by default this corresponds to the file names.

```html 
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Typescript as Bundler with System.js</title>
</head>
<body>
  <script src="https://unpkg.com/systemjs@6.1.4/dist/s.min.js"></script>
  <script src="https://unpkg.com/systemjs@6.1.4/dist/extras/named-register.min.js"></script>
  <script src="bundle.js"></script>
  <script>
    System.import('index');
  </script>
</body>
</html>
```

## Using AMD

In order to generate an AMD module in TypeScript, simply set the ```
undefined
```compiler option to ```
undefined
```

```json 

```

or, use the ```
undefined
``` command-line parameter:

```bash 
tsc --outfile ./dist/bundle.js --module amd ./src/index.ts
```

```html 
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Typescript as Bundler with AMD</title>
</head>
<body>
  <script src="https://requirejs.org/docs/release/2.3.6/minified/require.js"></script>
  <script src="bundle.js"></script>
  <script>
    require('index');
  </script>
</body>

```

