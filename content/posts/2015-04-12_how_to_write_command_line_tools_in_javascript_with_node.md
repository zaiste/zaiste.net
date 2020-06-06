+++
date = 2015-04-12T00:00:00.000Z
title = "How to write command line tools in JavaScript with Node.js"
[taxonomies]
topics = [ "Node.js", "CLI", "JavaScript" ]
+++

Let's start by creating a project using `npm`

    mkdir zaiste-cli
    cd zaiste-cli
    npm init

It will initialize a project directory with a `package.json` file.
This file is used by `npm` to determine project dependencies and other
configuration.

```
{
  "name": "zaiste-cli",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Let's adjust it by

* removing the `main` entry as it's only used with the module system
* adding `preferGlobal` set to `true`, `npm` will warn that the module
is designed to be installed globally.
* adding the `bin` entry which maps commands to files

```
{
  "name": "zaiste-cli",
  "version": "0.0.1",
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "preferGlobal": true,
  "bin": {
    "zaiste-cli": "index.js"
  }
}
```

Now, let's create `index.js`. For the vanila JavaScript we define a shebang with
`node`, for ES2015 we use `babel-node`.

```
#! /usr/bin/env babel-node

console.log('Hello ES2015');
console.log(process.argv);

var args = process.argv.slice(2);
console.log(args);
```

Finally let's run `npm link` to install the script on our system and execute it

```
zaiste-cli hello world
```

Once the script is done, you can publish it using `npm publish` so people could install
it with `npm install -g zaiste-cli`.