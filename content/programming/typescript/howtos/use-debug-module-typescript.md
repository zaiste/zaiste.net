+++
title = "Use Debug Module in TypeScript"
[taxonomies]
topics = [ "TypeScript" ]
+++

[debug](https://github.com/visionmedia/debug) library exports a function that decorates `console.error` with a custom module name.

Instead of writing:

```js
import debug = require('debug')('custom-module-name');
```

in TypeScript, write:

```ts
import Debug from "debug";
const debug = Debug("custom-module-name");
```

