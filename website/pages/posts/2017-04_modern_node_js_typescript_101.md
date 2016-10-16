---
created_at: 2017-04-13
kind: article
publish: true
title: "Modern Node.js TypeScript 101"
tags:
- Node.js
- JavaScript
- TypeScript
---

[TypeScript](https://www.typescriptlang.org) is a typed superset of JavaScript that compiles to idiomatic JavaScript. Let's break this definition down. «  superset » means it adds a few features on top of JavaScript while staying aligned with ECMAScript; « typed » means it provides strong typing in the form of optional static types and compile-time checks; finally, it compiles to plain, readable JavaScript. These features allow to enforce contracts during the development phase and help find more bugs before runtime phase. The project was initiated by Microsoft and is under Apache 2 license.

Why TypeScript? JavaScript is one of the most prominent programming languages today with large community actively working both on improving the language and its ecosystem. There are, however,  still many flaws in the language design, in the end JavaScript has been developed in only 10 days. JavaScript is a dynamic programming language which allows to do things like extending objects and definitions at runtime and changing types at will. This flexibility is also a source of errors, so potentially avoidable bugs often slip into production to appear only at runtime. TypeScript was created to help resolve some of those problems.

TypeScript supports the same types as in JavaScript with an additional enumaration type.

```
let isDone: boolean = false;
let age: number = 16;
let name: string = 'Zaiste';
let intro: string = `My name is ${name} and I'm ${age} years old`;
```

Arrays can be declared as the type followed by `[]` or using generics.

```
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

Enum is used to give more friendly names to sets of numeric values.

```
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
```

`any` describes the type of variables with unknown content e.g. dynamic data coming from users or 3rd party library. It is very convenient to use `any` to gradually introduce type-checking.

```
let inputField: any = 7;
```

`void` denotes the absence of any type, it is usually used as the return type of functions that do not return a value. It doesn't make sense to use it for declaring variables.

```
function print(message): void {
  console.log("--", message);
}
```

Finally, `never` represents the type of values that never occur, e.g. a function that always throws an exception can use `never` to describe its return type.

```
function error(message: string): never {
  throw new Error(message);
}
```

There are also `null` and `undefined` types that are subtypes of all other types and usually aren't useful on their own. With the `--strictNullChecks` compiler flag enabled, `null` and `undefined` can only be assigned to `void` and their respective types. TypeScript authors encourage to have this flag enabled by default to avoid many common errors.

Type assertations are used to make variable's type more specific that its current type. It's like a type cast, but without the compiler checking it.

```
let title: any = "this is a string";
let titleCharartersCount: number = (title as string).length;
```

TypeScript is much more than such simple types. Check [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) for a comprehensive introduction to the language.

Let's now setup a simple Node.js project within an empty `modern-nodejs-typescript` directory using TypeScript.

```
yarn init -y
```

Let's install TypeScript compiler

```
npm install typescript -g
```

For convenience, TypeScript provides types adnotations to regular JavaScript packages so their types are available in TypeScript projects. They are installed with `npm`  and usually have the same name as the package itself, but prefixed with `@types/`, e.g. here's how to install type declarations for Node

```
yarn add @types/node --dev
```

Let's generate `tsconfig.json`, a TypeScript configuration file which is used to manage your project’s options. Here you can check [all the TypeScript configuration options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

```
tsc --init
```

Here's an example of `tsconfig.json`. It specifies `es2017` as the target, it uses `commonjs` syntax for importing modules and it outputs plain JavaScript files to `build` directory.

```
{
  "compilerOptions": {
    "outDir": "build",
    "module": "commonjs",
    "target": "es2017",
    "noImplicitAny": false,
    "sourceMap": false
  }
}
```

Let's create a simple TypeScript application that consists of `app.ts`  & `lib/index.ts`. Here's `app.ts`

```
import add from './lib';

async function main() {
  const result = await add(7, 9);
  console.log(result);
}

main();
```

And here's `lib/index.ts`

```
async function add(a:number, b:number) {
  return Promise.resolve(a + b);
}

export default add;
```

TypeScript workflow involves transpilation, which means that TypeScript files must be translated into JavaScript (`build` phase) before being able to run it. To simplify the process let's define helpers commands in `scripts` section of `package.json`

```
"scripts": {
  "build": "tsc -p ."
}
```

You can also run TypeScript code directly without having to compile it with `ts-node`, a TypeScript execution environment and REPL for Node.js.

```
npm install ts-node -g
```

```
ts-node app.ts
```

PM2, one of the most popular Node.js process managers, can run TypeScript directly.

```
pm2 install typescript
pm2 run index.ts
```

