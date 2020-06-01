
+++

+++
# How To Transform JSX using TypeScript

TypeScript can transform JSX templates. You need use the ```
undefined
``` extension and set the ```
undefined
``` flag to ```
undefined
```.

```bash 
tsc --jsx React ./src/App.tsx
```

For a library like Preact or Mithril you need to addtionally use the```
undefined
``` command-line parameter:

```bash 
tsc --jsx React --jsxFactory h ./src/App.tsx
```

