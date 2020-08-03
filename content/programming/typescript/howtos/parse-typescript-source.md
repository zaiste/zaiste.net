+++
title = "Parse TypeScript Source"
[taxonomies]
topics = ["TypeScript"]
[extra]
category = "How-To"
+++

```ts
import { fs as promises } from 'fs';
import typescript from 'typescript';

const source = await fs.readFile('/path/to/a-typescript-file.ts', 'utf8'),
const node = typescript.createSourceFile('name.ts', source, typescript.ScriptTarget.Latest);
```

The `createSourceFile` generates an Abstract Syntax Tree (AST) for the given source file.

Each node has the numerical `kind` property, that represents the type of that node.

Let's go over each child and list their type:

```ts
node.forEachChild(child => console.log(typescript.SyntaxKind[child.kind]))
```
```
> ImportDeclaration
> ClassDeclaration
> EndOfFileToken
```

