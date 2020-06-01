
+++

+++
# How To Specify A ```
undefined
``` Location for ```
undefined
```

```
undefined
``` is an (optional) config file, automatically loaded by```
undefined
``` if present in the project root (next to package.json)

Use the ```
undefined
``` environment variable to specify the**absolute** path to the ```
undefined
``` (relative paths may not work).

```json 
{
  "scripts": {
    "build": "VUE_CLI_SERVICE_CONFIG_PATH=$PWD/config/vue.config.js vue-cli-service build"
  }
}
```

