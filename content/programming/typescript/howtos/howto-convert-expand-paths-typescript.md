+++
title = "How To Convert / Expand Paths in TypeScript"
+++

The `baseUrl` compiler option in TypeScript allows you to define import paths relative to the path defined using that option:

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  }
}
```

TypeScript doesn't convert those paths to the actual file paths on the filesystem as /Module names are considered resource identifiers and are not changed by the compiler/.

Use [ts-transformer-imports](https://github.com/grrowl/ts-transformer-imports), a TypeScript transformer which enables compilation of absolute imports (using baseUrl or paths) so they can be required as modules from Javascript or TypeScript, without additional configuration or path mapping.

