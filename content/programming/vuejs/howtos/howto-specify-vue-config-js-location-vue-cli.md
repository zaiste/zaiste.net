+++
+++

# How To Specify A `vue.config.js` Location for `vue-cli`

`vue.config.js` is an (optional) config file, automatically loaded by `@vue/cli-service` if present in the project root (next to package.json)

Use the `VUE_CLI_SERVICE_CONFIG_PATH` environment variable to specify the **absolute** path to the `vue.config.js` (relative paths may not work).

```json
{
  "scripts": {
    "build": "VUE_CLI_SERVICE_CONFIG_PATH=$PWD/config/vue.config.js vue-cli-service build"
  }
}
```

