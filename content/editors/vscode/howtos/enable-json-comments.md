+++
title = "Enable JSON with Comments in VS Code"
[taxonomies]
topics = [ "VS Code" ]
+++

Click on the letters JSON at the bottom in the right corner. Type `jsonc` to use the `JSON with Comments` file association.

It's also possible to configure that for all (or specific) JSON files via settings

```js
"files.associations": {
    "<specific file>.json": "jsonc"
}
```

```js
"files.associations": {
    "*.json": "jsonc"
}
```