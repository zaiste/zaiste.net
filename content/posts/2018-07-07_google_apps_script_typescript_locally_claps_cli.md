
+++
date = 2018-07-07T00:00:00.000Z


title = "Apps Script with TypeScript & claps CLI to develop locally"
topics = [ "rails" ]
abstract = ""

[extra]
priority = 0.8

+++

[claps](https://github.com/google/clasp) allows to manage App Script projets in a local environment. You can create and publish add-ons for products like Google Sheets, Google Docs et al. using the command line.

clasp automatically converts flat file structure available on script.google.com into regular folders.

```bash
sudo npm i -g grpc @google/clasp --unsafe-perm
```

Before using any other command you must first log in using `claps login`. It will then store the credentials in `.clasprc.json` file.

`clasp clone` accepts either a script ID or its URL.

`clasp push` pushes all local files to `script.google.com` and it overwrites the previous versions. Optionally, there is a `--watch` parameter that watches for changes and pushes every few seconds.

`clasp` can be also used to enable or disable specific Google APIs with `apis` subcommand

```
clasp apis enable drive
```

There is [a neat tutorial by Google](https://codelabs.developers.google.com/codelabs/clasp/#0) for `claps`.

VSCode can autocomplete `appsscript.json` and `.clasp.json` if you specify the following JSON schemas in **User Settings**.

```json
"json.schemas": [
  {
    "fileMatch": [
      "appsscript.json"
    ],
    "url": "http://json.schemastore.org/appsscript"
  },
  {
    "fileMatch": [
      ".clasp.json"
    ],
    "url": "http://json.schemastore.org/clasp"
  }
]
```


TypeScript is can be compiled to Apps Script with `claps`. It currently supports TypeScript 2.9.2. `claps` allows both new and existing Apps Script projects to use TypeScript.

Apps Script's runtime is different than Node/browser, e.g. there is no `window` object, `export` and `require` cannot be used the same way as in Node.

In project's folder, install TypeScript definitions for Apps Script

```
npm i -S @types/google-apps-script
```

In order to block the usage of non Apps Script features, create a file called `jsconfig.json`

```json
{
  "compilerOptions": {
    "noLib": true
  }
}
```

You can now start writing TypeScript for Apps Script project by either creating `.ts` files or by changing the extension from `.js` to `.ts` for existing ones. As you push to the Apps Script server using `claps push`, clasp transpiles ES6+ into ES3 using [ts2gas](https://github.com/grant/ts2gas).
