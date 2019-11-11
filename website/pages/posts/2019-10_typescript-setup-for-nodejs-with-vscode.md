---
created_at: 2019-10-04
title: TypeScript Setup for Node.js with VS Code
publish: true
tags:
- nodejs
- javascript
- security
---

[TypeScript](https://www.typescriptlang.org/) is a superset of JavaScript that provides optional static typing
along with type inference. It also supports modern JavaScript features, which
makes it similar to the [Babel](https://babeljs.io/) project.

<div class="notice warning">
There is a complementary, walk-through <a href='https://www.youtube.com/watch?v=BLoFPda7fmI'>video on YouTube</a> for this article where I
show this TypeScript setup.
</div>

TypeScript makes working with JavaScript more enjoyable. One of the biggest
advantages of using TypeScript is **[the IntelliSense feature](https://code.visualstudio.com/docs/editor/intellisense)**, which provides a
rich development environment with contextual code completions, hover info and
method signature information.

![TypeScript for VS Code IntelliSense feature](/images/typescript-vscode-intellisense.png)

At the same time **TypeScript is not necessary to write great software**. Most of
the articles about TypeScript picture the language as the necessity. This is not true.
In software, most problems come from errors in specifications and architectural
mistakes.

Types improve the coding experience on the lower level and at the micro scale.
They greatly help with writing particular lines of code by providing a stricter,
thus slightly safer coding environment.

It is difficult to estimate the actual benefits, but adopting TypeScript is not
something that will change your software practice in dramatic ways. There are
even prominent voices saying you shouldn't use types at all. 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I think this is exactly
backwards, types often cripple larger codebases. <a
href="https://twitter.com/hashtag/Clojure?src=hash&amp;ref_src=twsrc%5Etfw">#Clojure</a>
<a href="https://t.co/2eJIQsmRrR">https://t.co/2eJIQsmRrR</a></p>&mdash;
stuarthalloway (@stuarthalloway) <a
href="https://twitter.com/stuarthalloway/status/1177559672561307649?ref_src=twsrc%5Etfw">September
27, 2019</a></blockquote> 

Personally I find great pleasure in using TypeScript, to the extend of not
willing to write regular JavaScript anymore.

## Simplest TypeScript Snippet

Let's start with the simplest TypeScript code snippet, which is also not
idiomatic. In other words, it's a syntaxtically correct piece of code which
doesn't follow the common coding practice.

```js
let message: string = "Hello World"
```

TypeScript allows us to specify the type for the `message` variable as `string`.
**This type annotation describes a range of values that a particular variable (or
constant) can take, or a particular function can return**. With TypeScript we can
now explicitly specify the value constrains in our code. It leads to a stricter
control, which is a good thing.

Types, however, reduce the code flexibility. That's one of the
reasons why there is no consensus in the debate of static versus dynamic
typing. At the end of the day, it boils down to the personal preference and
experience.

## Type Inference

So what's wrong with this short snippet? The piece of TypeScript is not
idiomatic, because TypeScript not only allows us to specify type, but is also
smart enough to guess the types based on how particular variable or function is
used in the code - this feature is known as **[type inference](https://en.wikipedia.org/wiki/Type_inference)**.

The TypeScript compiler looks at our code and infers the ranges of values for
our variables, constans or functions. Type inference is something you should use
as much as possible. Usually, the compiler knows better than you what types to
use. Therefore, in idiomatic TypeScript, the code from above should be written
as follows:

```js
let message = "Hello World"
```

Funny enough, it looks like a regular JavaScript. As a general rule you should
not specify types in the assignments as those can be easily inferred by the
TypeScript compiler; on the other hand, you should explicitly provide types for
the function parameters.

## An HTTP Server in TypeScript

Let's now write a simple HTTP server in Node.js using TypeScript to see how VS
Code supports TypeScript out of the box. You may know that VS Code is actually
written in TypeScript, but the editor also provides a feature called the
Automatic Types Aquisition.

With the Automatic Types Aquisition VS Code automatically downloads the type
definitions for the packages you use in your code. This makes using TypeScript
even more convenient and straighforward.

Let's initialize a TypeScript project:

```bash
mkdir typescript-with-zaiste
cd typescript-with-zaiste
npm init --yes
npm install -D typescript
tsc init
```

and let's consider the following snippet stored in the ~app.ts~ file:

```js
import http, { IncomingMessage, ServerResponse } from 'http';

const handler = (request: IncomingMessage, response: ServerResponse) => {
  response.end('Hello, World');
}

http
  .createServer(handler)
  .listen(8080, () => console.log('started'));
```

The Automatic Types Acquisition being enabled by default in VS Code, I can simply
type the `.` (the dot) after the `response` variable to see all possible fields and
methods of that object along with their documentation.

This is possible thanks to those type definitions. I don't need to switch back
and forward between the documentation of the `http` module. Everything is in one
place which streamlines the coding.

## Types in Plain JavaScript 

The `http` is a core module from Node.js and Node.js is not written in
TypeScript. Thus, there is no information about types in it. Plenty of popular
NPM packages are still written using JavaScript as well.

In order to provide type information in those cases, there is a special project
called [DefinitelyTyped](https://definitelytyped.org/). The Automatic Type
Aquisition feature in VS Code aquires the type information from that project. In
our example, we relied on the ~@types/node~ to have this information for the
`http` module from Node.js.

It is a good practice to include those types definitions explicitly in your
project using the `devDependencies` of the `package.json`. Those using editors
other than VS Code will be able then to benefit form the type definitions as
well.

```bash
npm install -D @types/node
```

A TypeScript project must be first compiled (or transpiled) into JavaScript
before we can run with Node.js. This transpilation process is done using the
~tsc~ command line tool that comes with the ~typescript~ package.

```bash
npm install -D typescript
```

In order to have a more streamlined process we can instruct the TypeScript
compiler to constantly watch our files using the `--watch` option and
automatically recompile once there are changes within them.

## TypeScript with VS Code 

VS Code recognizes TypeScript projects by the presence of the `tsconfig.json`
and conveniently provides the appropriate build tasks. The compilation can be
trigger directly using the Command Palette and seamlessly run using the UI of
the editor - there is no need to switch between the terminal and the editor
anymore.

We can also specify the default build task in VS Code to further simplify the
whole process and have it conveniently under the build command via the editor
wide key binding.

This setup works for well for regular, command-line applications which we run to
do a specific tasks. Once it's done, they finish. In Node.js, however, we also
build web servers - long running processes that accept requests and return
responses. This slightly troubles the setup of a TypeScript application. We not
only need to transpile our code from TypeScript to JavaScript, but we also need
to reload our Node.js server instance once this compilation is done and for each
such change in our files.

There are many solutions for this problem. We could use `nodemon` to restart both
TypeScript compilation and the server once there are changes in our files - this
is not optimal though, especially for bigger projects. We could also use a tool
called `ts-node-dev~ which is slightly smarter and shares the TypeScript
compilation between restarts. There is, however, a better solution.

## PM2 for Restarts in Development

The JavaScript ecosystem is insanely rich to the point to be easily
overwhelming. I prefer to keep the dependencies to minimum and to reuse what is
already there. For that reason we will use the
[pm2](https://pm2.keymetrics.io/docs/usage/pm2-development/) tool, which is the
Node.js standard for running Node.js processes in production. This tool also
provides a development mode as the `pm2-dev` command. Let's use it instead of
adding another dependency.

```json
"scripts": {
  "dev": "pm2-dev app.js"
}
```

Let's run the `dev` script directly using the tasks feature in VS Code in
addition to the already running TypeScript compiler process via `tsc --watch`.
From now on any change in the `app.ts` will be automatically recompiled by
TypeScript and then quickly reloaded by the `pm2` tool.

<div class="split">
⋯ 
</div>

TypeScript makes writing JavaScript more enjoyable. It reduces the probability
of making typos while the type system constrains the area for mistakes.

We also simplified and sped up the development process by eliminating the need
to switch between the editor and the terminal - everything is now in one place,
directly accessible from VS Code. 

That's a perfect TypeScript setup for Node.js with VS Code, indeed!
