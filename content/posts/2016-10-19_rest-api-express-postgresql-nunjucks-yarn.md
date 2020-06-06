+++
date = 2016-10-19T00:00:00.000Z
title = "Web App + REST API with Express, PostgreSQL and Nunjucks on Yarn"
image = "web-api-node-express-postgresql-yarn.jpg"
aliases = [
  "web_app_rest_api_with_express_postgresql_and_nunjucks_on_yarn"
]

[taxonomies]
topics = [ "Node.js", "PostgreSQL", "REST", "API" ]

+++

In this article I'll show you how to create a basic web application in Node from
scratch. I'll be using [yarn][1] instead of [npm][9]. I issue HTTP requests
using [httpie][10] instead of [curl][11].

Let's start with an empty directory:

```
cd myapp
$ yarn init
```

Install [express][2]

```
yarn add express
```

Inside `index.js`, add first (root) route which renders a simple text:

```js
const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
```


## Auto-reloading

Install [nodemon][3] to restart the server when there is a change

```
yarn add nodemon --dev
```

`--dev` as Nodemon is used only for development.

You can run it by hand

```
./node_modules/.bin/nodemon server.js
```

or directly with `yarn` (as it detects binaries)

```
yarn run nodemon
```

or you can put it into `package.json` (for later customization)

```
"scripts": {
  "dev": "nodemon index.js"
}
```

and to be run as

```
yarn run dev
```

## HTML view

Create `index.html` in the root of the project:

```
<!DOCTYPE html>
<h1>Hello world from a HTML file</h1>
```

Add `path` dependency at the top of `index.js`:

```js
const path = require('path')
```

Add new route, let’s call it `/html`

```js
app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
```

Open `localhost:3000/html` in your browser to check if it works.

## Request logger

I’ll use [morgan][4] as request logger. Let’s install it

```
yarn add morgan
```

`morgan` is a middleware i.e. a plugin which changes the request or response
object before they get handled by the application itself.

Connect the request logger middleware with the express server

```js
const logger = require('morgan');

app.use(logger('dev’));
```

## Static assets

Let’s specify that `public/` directory should be used to serve static assets
(stylesheets, javascript files, images, etc.). This is an example of a built-in
middleware.

```js
app.use(express.static(__dirname + '/public'));
```

Create the `public/` folder in your project’s root directory

```
mkdir public
```

Add a simple CSS file. Let’s name it `styles.css`

```
body {
  color: red
}
```

Reference the file from your HTML file:

```
<link rel="stylesheet" href="styles.css" media="screen">
```

Open `localhost:3000/html` in your browser to check if it works.

## Form and parsing request body

How to handle form submission in Express ? Let’s start by adding a simple form
to `index.html`.

```
<form action="/calculate" method="POST">
  <input type="text" name="name" placeholder="name">
  <input type="text" name="amount" placeholder="amount">
  <button type="submit">Submit</button>
</form>
```

Let’s add a `POST` route (that matches `action` attribute from the form) to
handle the form submission.

```js
app.post('/calculate', (req, res) => {
  const { name, amount } = req.body || {};
  res.send(`I've got a POST with request body: ${name}, ${amount}`)
})
```

Express doesn’t handle reading data from the request’s body. We have to use
another middleware, called [body-parser][5], to explicitly parse it. Let’s
install the middleware

```
yarn add body-parser
```

and add it to our Express application.

```js
const bodyParser = require('body-parser')
...
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

`urlencoded()` extracts the data submitted via the form (i.e. the content
type is `application/x-www-form-urlencoded`) and adds them as `body` property to
the request object. the same way `json()` extracts the data submitted as JSON
(i.e. the content type is `application/json`) and also adds them to the request
object.

```js
app.post('/calculate', (req, res) => {
  const { name, amount } = req.body || {};

  res.send(`I've got a POST with request body: ${name}, ${amount}`)
})
```

Submit the form again to check if you see its values.

## Templates with Nunjucks

Plain HTML has its limits. Express supports a variety of [template engines][6].
I prefer [Nunjucks][7] as it’s just HTML with additional tags. Let’s install
`nunjucks`:

```
yarn add nunjucks
```

Register it as Express template engine

```js
const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express   : app
});
```

Create `views/` directory and move our `index.html` inside. Adjust `h1` slightly
as shown below:

```
<h1>Hello {{ name }} from a HTML file</h1>
```

Replace the root route with the following:

```js
app.get('/', (req, res) => {
  res.render('index.html', { name: 'Zaiste'} )
})
```

Open `localhost:3000/` in your browser to check if it works.

## PostgreSQL

Let’s start by installing [pg-promise][8]. It is a library which abstracts away
low-level connection management and allows to focus on the business logic.
Additionally, it includes a powerful query formatting engine along with the
support for automated transactions.

```
yarn add pg-promise
```

Create the database

```
createdb widgets
```

Create a SQL script that describes `widgets` table and enters some data into it:

```
DROP DATABASE IF EXISTS widgets;
CREATE DATABASE widgets;

\c widgets;

CREATE TABLE widgets (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  amount INTEGER
);

INSERT INTO widgets (name, amount)
  VALUES ('Widget 1', 33), ('Widget 2', 55), ('Widget 3', 88);
```

Run the script:

```
$ psql -f widgets.sql
```

Add CRUD routes

```js
const widgets = require('./queries/widgets');
...
app.post('/api/widgets', widgets.create)
app.get('/api/widgets', widgets.retrieve)
app.get('/api/widgets/:id', widgets.retrieve)
app.put('/api/widgets/:id', widgets.update)
app.delete('/api/widgets/:id', widgets.remove);
```

Create `queries` folder in the root of your project with `widgets.js` inside:

```
mkdir queries
touch queries/widgets.js
```

Let’s start with the code that retrieves all widgets from the database. `any()`
indicates we expect any number of results; it returns a promise:

```js
db.any('select * from widgets')
  .then((results) => {
    res.status(200)
      .json({
        status: 'success',
        results: results,
        message: 'All widgets retrieved'
      })
  })
  .catch((err) => next(err));
```

It’s very similar to retrieve a single widget

```js
db.one('select * from widgets where id = $1', widgetId)
  .then((results) => {
    res.status(200)
      .json({
        status: 'success',
        results: results,
        message: `Retrieved single widget with ID = ${widgetId}`
      });
  })
  .catch((err) => next(err));
```

Let’s combine that into a `retrieve()` function:

```js
function retrieve(req, res, next) {
  if (req.params.id) {
    db.one(...)
  } else {
    db.any(...)
  }
}
```

*Create* function uses `.none()` with some additional pre-processing:

```js
function create(req, res, next) {
  const amount = parseInt(req.body.amount);
  const name = req.body.name;

  db.none('insert into widgets(name, amount)' +
          'values(${name}, ${amount})', { name, amount })
    .then(() => {
      res.status(201)
        .json({
          status: 'success',
          message: 'Widget successfully created'
        });
    })
    .catch((err) => next(err));
}
```

For `update()` function you must always specify all parameters. It is `PUT` in
HTTP parlance.

```js
function update(req, res, next) {
  const { name, amount } = req.body;

  db.none('update widgets set name=$1, amount=$2 where id=$3',
    [name, parseInt(amount), parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Widget successfully updated'
        });
    })
    .catch((err) => next(err));}
```

Finally, `remove()` function:

```js
function remove(req, res, next) {
  const widgetId = parseInt(req.params.id);

  db.result('delete from widgets where id = $1', widgetId)
    .then((results) => {
      res.status(200)
        .json({
          status: 'success',
          message: `Widget with ID = ${widgetId} successfully deleted.`
        });
    })
    .catch((err) => next(err));
}
```

Put all those functions inside `queries/widgets.js`. At the top of the file add
the following:

```js
const pg = require('pg-promise')()
const db = pg('postgres://localhost:5432/widgets')

module.exports = { create, retrieve, update, remove }
```

Let’s test it. First retrieve all elements

```
http :3000/api/widgets
```

Retrieve a single widget

```
http :3000/api/widgets/3
```

Create a new widget

```
http :3000/api/widgets name="Widget 4" amount=234 --form
```

We're parsing request's body using `urlencoded` format, that's why I used
`--form` flag. Usually we use JSON to communicate with an API. Simply add
`bodyParser.json()` to indicate that request's body is in JSON format.

Update an widget (all fields must be specified)

```
http PUT :3000/api/widgets/4 name="Widget 4" amount=999 --form
```

Finally, delete a widget

```
http DELETE :3000/api/widgets/4
```

---

These are just basic elements for building a web application which provides a
*REST-like* API to interact with *widgets*. You can now install [Express
Generator][12] to automatically recreate most of it, but with a better understanding
of the underlaying principles.


[1]: https://yarnpkg.com/
[2]: https://expressjs.com/
[3]: https://github.com/remy/nodemon
[4]: https://github.com/expressjs/morgan
[5]: https://github.com/expressjs/body-parser
[6]: https://en.wikipedia.org/wiki/Template_engine
[7]: https://mozilla.github.io/nunjucks/
[8]: https://github.com/vitaly-t/pg-promise
[9]: https://www.npmjs.com/
[10]: https://httpie.org/
[11]: https://curl.haxx.se/
[12]: https://expressjs.com/en/starter/generator.html

