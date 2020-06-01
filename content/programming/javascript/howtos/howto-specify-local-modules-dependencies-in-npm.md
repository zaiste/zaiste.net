
+++

+++
# How To Specify Local Modules As Dependencies in NPM

Use the ```
undefined
``` in ```
undefined
``` directive to specify a local module as a dependency:

```json 
{
  "name": "mypackage",
  "dependencies": {
    "mylib": "file:../path/to/mylib"
  }
}
```

You can also use:

```bash 
npm i --save ../path/to/mylib
```

