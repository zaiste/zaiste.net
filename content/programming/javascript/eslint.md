+++
title = "ESLint"
[taxonomies]
topics = [ "JavaScript" ]
+++

```json
{
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "semi": 2
  }
}
```

+ `ecmaVersion` - set to `3`, `5`, `6` (or `2015`), `7` (or `2016`), `8` (or `2017`) to specify the ECMAScript version to use. The default value is `5`.
