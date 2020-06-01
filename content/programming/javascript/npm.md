
+++

+++
# NPM

## Set Default Config

```bash 
npm config set init.author.name <name>
npm config set init.author.email <email>
```

## Open Package Home Website

```bash 
npm home <package>
```

## Go to package code repository

```bash 
npm repo <package>
```

## Go to package documentation

```bash 
npm docs <package>
```

## List global packages

List the packages its dependency tree

```bash 
npm list --global
```

List only top level packages

```bash 
npm list -g --depth=0
```

## List outdated packages

```bash 
npm outdated -d
```

## Clean the cache

```
undefined
``` keeps a copy of all installed packages. Next time the same package is to be installed, \`npm\` takes it from the cache and not over the network. All packages are cached in the \`$HOME/.npm\` directory.

```bash 
npm cache clean
```

## Generate package.json with defaults

A package.json file will be created and the name of your directory will be used for the name property.

```bash 
npm init --yes
```

## Create a link to local package

Create a symlink in the global folder for that package

```bash 
npm link
```

You will see that references either via ```
undefined
``` or ~npm outdated -g~.

## Install local package from directory

```bash 
npm install path/to/package
```

This will create:

```json 
"dependencies": {
  ...
  "myproject": "file:../myproject/"
}
```

## Update packages in \`package.json\`

```bash 
npm i -g npm-check-updates
npm-check-updates -u
npm install
```

## Freeze versions for all dependencies

```bash 
npm shrinkwrap
```

This generates a lockfile that specifies the exact version and URL from which to download every single dependency.

\`shrinkwrap\` has some serious issues. npm builds dependency tree in a non-deterministic manner. The tree structure can differ from one machine to another based on the order that the packages are downloaded. This leads to problematic side effects.

Issues may arise when two or more dependencies specified in package.json share a common package ,  especially if their versions are different.

npm-shrinkwrap.json is unreadable and can change in strange ways. If you were to shrinkwrap, delete the file, then shrinkwrap again, the two generated files might be completely different. Upgrading a single dependency might lead to additions, deletions, and the moving of dependencies around in the file that makes it difficult to track changes.

Yarn generates yarn.lock (an equivalent to npm-shrinkwrap.json) Yarn uses this lockfile to generate deterministic builds : they will be the same from machine to machine . Yarn also automatically resolves duplicate dependencies and generates a flat dependency tree.

## Show NPM config

```bash 
$ npm config list
; cli configs
metrics-registry = "https://registry.npmjs.org/"
user-agent = "npm/4.4.4 node/v7.8.0 darwin x64"

; userconfig /Users/zaiste/.npmrc
init.author.name = "Zaiste"
init.version = "0.0.1"
progress = true

; builtin config undefined
prefix = "/usr/local"

; node bin location = /usr/local/Cellar/node/7.8.0/bin/node
; "npm config ls -l" to show all defaults.
```

```bash 
npm config get prefix
/usr/local
```

```bash 
cd && mkdir .node_modules_global
npm config set prefix=$HOME/.node_modules_global
```

This also creates a .npmrc file in home directory.

```bash 
$ npm config get prefix
/home/zaiste/.node_modules_global
$ cat .npmrc
prefix=/home/zaiste/.node_modules_global
```

```bash 
$ npm install npm --global
```

Finally, add .node_modules_global/bin to the $PATH

```bash 
$ which npm
/home/zaiste/.node_modules_global/bin/npm
```

