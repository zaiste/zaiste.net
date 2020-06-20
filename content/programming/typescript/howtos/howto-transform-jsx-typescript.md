+++
title = "How To Transform JSX using TypeScript"
[taxonomies]
topics = [ "TypeScript" ]
+++

TypeScript can transform JSX templates. You need use the `.tsx` extension and set the `--jsx` flag to `React`.

```bash
tsc --jsx React ./src/App.tsx
```

For a library like Preact or Mithril you need to addtionally use the `--jsxFactory` command-line parameter:

```bash
tsc --jsx React --jsxFactory h ./src/App.tsx
```

