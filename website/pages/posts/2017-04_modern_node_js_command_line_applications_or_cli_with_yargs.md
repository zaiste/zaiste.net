---
created_at: 2017-04-01
kind: article
publish: true
title: "Modern Node.js: Command Line Applications (or CLI) with yargs"
tags:
- javascript
- nodejs
- cli
---

In this article I'll be showing how to rapidly create command line applications (also known as CLI) in Node.js using [yargs][1] package.

Let's start by creating a Node.js project.

```
mkdir nodejs-cli-app
cd nodejs-cli-app
yarn init -y
```

This will create the following `package.json`.

```
{
  "name": "nodejs-cli-app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

Let's adjust it slighlty so the application could be easily used in CLI mode.

```
{
  "name": "nodejs-cli-app",
  "version": "1.0.0",
  "license": "MIT",
  "preferGlobal": true,
  "bin": {
    "nodejs-cli-app": "cli.js"
  }
}
```

We will probably not need `main` entry as it's only used with the module system.`preferGlobal` indicates (to `npm` or `yarn`) that the module is designed to be installed globally, otherwise there will be a warning. Finally, `bin` entry adds a mapping between the command used in terminal and the actual JavaScript file that will be run each time this command is invoked. In our case, this will be a file called `cli.js`.

Before we create `cli.js`, let's install [yargs][1] which is one of the most convenient libraries in the Node.js ecosystem to parse command line arguments.

```
yarn add yargs
```

By default, command line arguments are stored in `process.argv` variable as an array with `node` at position `0` followed by the name of the executed file at position `1` and the rest of arguments as the remaining elements - no external library is needed to handle those arguments.

```
const args = process.argv;
console.log(args);
```

```
$ node cli.js a bb=11 ccc
['node', '/home/zaiste/nodejs-cli-app/cli.js', 'a', 'bb=11', 'ccc']
```

yargs not only allows to parse command line arguments, but also it simplifies the creation of more sophisticated CLI applications that, for example, allow sub-commands, similar to how `git` is used.

Here's a minimal, but comprehensive example of using [yargs](a) to build a dummy CLI application which provides a single sub-command, called `init`, with its own options.

```
#!/usr/bin/env node

const open = require('open');

const argv = require('yargs')
  .version()
  .usage('Usage: nodejs-cli-app <command> [options]')
  .command(['init [dir]', 'initialize', 'i'], 'Initialize the directory', require('./lib/init'))
  .example('nodejs-cli-app init my-project', 'Initialize `my-project` directory with `default` engine')
  .example('nodejs-cli-app init my-project --engine turbo', 'Initialize `my-project` directory with `turbo` engine')
  .command(['docs'], 'Go to the documentation at https://zaiste.net', {}, _ => open('https://zaiste.net'))
  .demandCommand(1, 'You need at least one command before moving on')
  .help('h')
  .alias('h', 'help')
  .epilogue('for more information, find the documentation at https://zaiste.net')
  .argv;
```

Let's go over some of `yargs` configuration methods:
* `.version()` extracts the current version directly from `package.json`
* `.usage()` is a top level description how to start using this CLI application
* `.command()` defines `init` sub-command (with `initialize` and `i`  as aliases)  that accepts an optional `dir` argument; for convenience and readability, both arguments and options for this sub-command are defined in a separate module under `./lib/init`
* `.example()` shows possible usage cases
* `.demandCommand()` indicates that at least one command must be specified to use this command line applications
* `.help()` generates the help message based on information from all other `yargs` options
* `.epilogue()` simply appends an additional line to the help message

Let's have a look at the `./lib/init.js`

```
function init({ dir, engine }) {
  console.log('Dir:', dir);
  console.log('Engine:', engine);
}

module.exports = {
  handler: init,
  builder: _ => _
    .default('dir', '.')
    .option('engine', { alias: 'x', default: 'regular' })
};
```

The module defines a single function, named after the sub-command i.e. `init`, to handle its command line invocation (specified using `handler` option). The `builder` option allows to define default values along with additional options; here we add `--engine` option (aliased as `-x`) with `regular` as its default  value.  All those options are passed as parameter to the handler function. Using ES6 object destructuring, we can directly specify them in the function definition.

Up till now, we could run the application by explicitly prefixing the file with `node`, i.e. `node cli.js init foo`. If we tried to run the command directly by typing its name i.e. `nodejs-cli-app`, we would get a `command not found` error.

```
$ nodejs-cli-app
zsh: command not found: nodejs-cli-app
```

We can easily register the binary (defined as `bin` option in `package.json`) globally using `npm link` command which must be run from within the application directory.

```
cd nodejs-cli-app
npm link
```

From now on we can run `nodejs-cli-app` anywhere in our system.

```
nodejs-cli-app
```

with the following output

```
Usage: nodejs-cli-app <command> [options]

Commands:
  init [dir]  Initialize the directory                  [aliases: initialize, i]
  docs        Go to the documentation at https://zaiste.net

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]

Examples:
  nodejs-cli-app init my-project            Create a dummy `my-project`
                                            directory
  nodejs-cli-app init my-project --engine   Create a dummy `my-project`
  turbo                                     directory with `turbo` engine

for more information, find the documentation at https://zaiste.net

You need at least one command before moving on
```

[1]: http://yargs.js.org/

