+++
date = 2019-04-01T00:00:00.000Z
title = "Creating Secure REST APIs in Node.js without JWTs"
aliases = [
  "creating-secure-rest-api-nodejs-without-jwt"
]
[taxonomies]
topics = [ "Node.js", "JavaScript", "Security" ]
+++

Before we go on creating an actual RESTful API, let's address the elephant in
the room: **how to make an HTTP endpoint sufficiently secure in Node.js ?**

I say _sufficiently_ because, the topic of security is broad and constantly
evolves. This article is a response to other Node.js articles I've seen that
contain security mistakes. It may not be perfect, either, but is hopefully a
good evolution on the topic.

## No JWT

_Without [JSON Web Token](https://jwt.io/)_ is a tongue-in-cheek statement
which relates to some JWT obsession in Node.js community. JWTs don't bring
anything new to the table compared to regular session IDs.

At the same time, JWTs come with additional complexity. They need to be well
understood to prevent security mistakes, namely [Cross-Site Scripting (XSS)
attacks](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)). It may
be also difficult to invalidate such tokens (a case for stateless JWTs).

 There is a
[bunch](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)
[of](https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens)
[interesting](http://cryto.net/%7Ejoepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/)
articles, [presentations](https://speakerdeck.com/rdegges/jwts-suck) and
[videos](https://www.youtube.com/watch?v=JdGOb7AxUo0), why you do not
need JSON Web Tokens for a typical authentication in your web application. I
highly recommend to read them up.

JWTs are more suited for claim-related situations. A typical usecase would a
cloud storage application or a file hosting service. Users have to authenticate
to browse and manage their files, but when they need to download a particular
file, they get a single-use, short-lived token to access the file from another
(*asset*) server; its role is only to provide files to download.

Also, for client-side websites, whether it is an old-school, server-side
generated HTML or a single page-application (SPA), it is simpler to use HTTP
cookies with properly set flags such as `HttpOnly` and `SameSite`. I will
explore that topic in the context of Vue.js in the upcoming article.

In this article I'm exploring the usage of plain authentication tokens for
securing REST APIs as a simpler alternative to JWTs.

## Another Framework ?! Aaah...

The first step is to create a Node.js server which can receive requests and
generate response. The most popular way of doing it, is to use an HTTP
framework, such as [Express.js](https://expressjs.com/).

In this article, I will try something different. My goal is to make the process
of building a REST API simpler. That is why we will explore (yet) another
framework called [Huncwot](https://huncwot.org/). Yes, I know! I already see the
scowl on your face. Please bear with me for the next few minutes. The reasons
will be evident shortly.

While the general principles of securing endpoints are universal, Huncwot will
allow us to be slightly more efficient by providing some helper functions
out-of-the-box to reduce the boilerplate.

**You shouldn't have any problems to adapt the code that follows to Express.js.**

**Warning:** Please, use Node <= 11 (there is a bug with Node 12 as of
2019-05-04, it should be resolved shortly)

Let's create an empty directory for our RESTful API called
`secure-rest-api-nodejs`.

```bash
mkdir secure-rest-api-nodejs
```

Inside, we put a file called `app.js` which will hold our entire, but still
simple, Node.js application. Additionally, let's create `package.json` by
executing `npm init` right inside that directory.

```bash
cd secure-rest-api-nodejs && touch app.js && npm init
```

Let's add the first dependency:

```bash
npm i huncwot --save
```

## First Route

Our initial Node.js application is very simple. It has only one route, i.e. `/`,
which returns a string of the type `text/plain`.

```js
const Huncwot = require('huncwot');

const app = new Huncwot();

app.get('/', _ => "Hello, Huncwot!");

app.listen(5544);
```

Let's run it to see if works.

```bash
node app.js
```

Now, you can either open `localhost:5544` in your browser, or you can use a
command-line tool such as [Wget](https://www.gnu.org/software/wget/),
[cURL](https://curl.haxx.se/) or [HTTPie](https://httpie.org/). I prefer the CLI
approach and HTTPie is one of my favourite tools. I can trigger a request using
the following command:

```bash
http :5544/
```
```config
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 14
Content-Type: text/plain
Date: Fri, 01 Apr 2019 16:05:37 GMT

Hello, Huncwot
```
It works like a charm!

## JSON Payload

RESTful APIs usually return JSON data. This translates to a response with the
`Contet-Type` of `application/json`. Let's go ahead and fix that, so that our
application returns JSON instead of plain strings. That's a quick fix in
Huncwot. We can use the `json()` helper. It automatically serializes any
JavaScript data structure into a JSON payload and properly sets the
`Content-Type` as `application/json`.

In the following example, we return a simple JavaScript object with the single
`widget` key:

```js {2,6}
const Huncwot = require('huncwot');
const { json } = require('huncwot/response');

const app = new Huncwot();

app.get('/', _ => json({ widget: "This is a widget available to everyone"}));

app.listen(5544);
```

Once you changed the `app.js`, you need to restart the whole application. It
would be nice, if our application restarted automatically, when something
changes within the application directory. Luckly, there is a tool just for that.
It is called [nodemon](https://nodemon.io/).

```bash
npm install nodemon --save-dev
```

The `--save-dev` option marks the dependency as only needed during the
development. From now on, we can substitute `node` with `nodemon` to run the
application. As we installed `nodemon` locally (the command is only available in
the scope of this particular project), we need to use `npx` command (that comes
included with Node.js) to run `nodemon` from the command line:

```
npx nodemon app.js
```

Let's repeat our request to `/` endpoint.

```
http :5544/
```
```config
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 29
Content-Type: application/json
Date: Fri, 01 Apr 2019 16:26:12 GMT

{
  "widget": "This is a widget available to everyone"
}
```

Remember that you can also open `localhost:5544` in your browser for the same
effect.

In order to streamline the development process even further, we can use the
`scripts` section of `package.json` to simplify the command used to start our
application. Let's add the `start` command as seen here:

```json {5}
{
  ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  }
  ...
}
```

With that change in place, you can now use `npm` to start the application.

```bash
npm start
```
```
[nodemon] 1.18.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node app.js`
```

At this point, you may be curious about the structure of routes in Huncwot and
what this weird `_` (underscore) sign means. In Huncwot, you can define routes
similar to Express or any other framework. You start by selecting one of the
following functions: `get`, `post`, `patch`, `put` and `delete`. Each function
refers to the corresponding [HTTP request
method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).

Also, each of them takes two arguments. The first one is **the path** for this
route. The second one is the function, which is responsible for handling any
request mathing this particular path. By convention, this function is usually
called **a handler** as it handles requests to produce responses.

A combination of a path and corresponding handler is a route.

This is, where things start to become different in Huncwot. Contrary to
Express.js (and similar frameworks), **a handler** in Huncwot is a one argument
function. This argument is the incoming **request**.

In Express, and the majority of other Node.js frameworks, handlers take two
arguments. The first one is the request and the second one is the response. In
Huncwot, the response is simply everything that is being returned by the
handler. This way, it may be slightly more natural to think about the process of
handling requests and generating responses.

In Huncwot, handlers are functions, which take requests as their input and
produce responses as their output.

![fn input output](/images/fn-input-output.png)

The previous route could be rewritten in the following way:

```js {6-8}
const Huncwot = require('huncwot');
const { json } = require('huncwot/response');

const app = new Huncwot();

app.get('/', request => {
  return json({ widget: "This is a widget available to everyone"})
});

app.listen(5544);
```

Since we don't need the incoming request data yet, the variable is not used.
There is a practice to name unused function parameters as underscore (a practice
especially common in the programming laguages from the [ML
family](https://en.wikipedia.org/wiki/ML_(programming_language))).

You can also configure your linter to skip those variables altogether, so this
doesn't generate any errors if these variables are not used. Here is an example
of a rule that achieves this effect in ESLint.

```json
"rules": {
  "no-unused-vars": [2, {"args": "all", "argsIgnorePattern": "^_"}]
}
```

On top of that, Huncwot serializes the incoming request data automatically:
either headers, query parameters, the dynamic routes or the request body. All
that must be explicitly configured in Express or similar solutions, which is
probably tiny, but still an addititional burden.

Headers are available under `request`'s `headers` variable while the last three
are combined in the `params` field of the `request` argument. In case you don't
need any other data from the incoming request, you can use [ES6 destructuring
assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
to access any part of data directly. Here is an example to showcase that approach:


```js
app.get('/name/:name', ({ params }) => `Hello, your name is ${params.name}`);
```

And then you can trigger the following request:

```bash
http :5544/name/Zaiste
```
```config
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 26
Content-Type: text/plain
Date: Fri, 05 Apr 2019 17:03:50 GMT

Hello, your name is Zaiste
```

This feature will come in handy later on, when we will be using the authentication
token being passed via HTTP headers.

## PostgreSQL for Persistance

In order to manage access to resources by making particular routes only
available to logged in users, we need first to create entities that represent
these users. We also need to store them in a database.

There are many options when it comes to databases. In this tutorial we will
stick with a traditional (some may say _boring_), but solid solution for
persistence, which is a relational data base. We will use
[PostgreSQL](https://www.postgresql.org/) as our
[RDBMS](https://en.wikipedia.org/wiki/Relational_database_management_system).

Also, we won't be using any [object relation
mapping](https://en.wikipedia.org/wiki/Object-relational_mapping) techniques.
Knowing [SQL is one the most valuable
skills](http://www.craigkerstiens.com/2019/02/12/sql-most-valuable-skill/). Once
you get a grip on it, it is not that complicated. When your application reaches
a certain size, queries will become more streightforward to construct than
fighting the constraines imposed by a particular ORM solution. Besides, it is not
uncommon that ORM generated queries are significantly slower. In other words,
using SQL is more flexible, efficient and simpler long-term, but not necessarily
easier straightaway.

## Table for Users... Person ?!

As `user` name is used by PostgreSQL for internal purposes. We will create a
table called `person` to store the users of our application. I usually use [the
schema feature of
PostgreSQL](https://www.postgresql.org/docs/current/ddl-schemas.html) to be able
to use the `user` keyword. This also provides some additional benefits. I won't
be discussing this technique here for simplicity sake.

Notice, that I use **singular form** for the noun describing our entity. In some
circles, this approach may be contested, but it is relatively [common among
database engineers](https://stackoverflow.com/a/5841297). It simplifies your
mental model in this context. You don't need to switch between forms or to be
bothered by exceptions for certain words, e.g. _leaf_ -> _leaves_, _hero_ ->
_heroes_, _man_ -> _men_, etc

If you find it unusual, attach the word _container_ to the name of any database
relation e.g. _person container_, _widget container_. This mental trick may help
you emphasis the role of a table as a container, or set, for things of a
particular type.

Our `person` table will be short

```sql
create table person (
  id serial primary key,
  name text,
  email text,
  password text
);
```

Let's place that `CREATE TABLE` query in the `db.sql` file within our project
directory.

Start your PostgreSQL instance. There are many ways of doing it. Use the method
available on your system, or refer to [the PostgreSQL
documentation](https://www.postgresql.org/docs/current/tutorial-start.html) to
learn how to do it.

Create the database for our application called `secure_rest_api_nodejs`.

```bash
createdb secure_rest_api_nodejs
```

Notice that I'm using `_` (underscore) and not `-` (hyphen/dash), which is an
important distinction in PostgreSQL.

Finally, let's create the `person` table within the `secure_rest_api_nodejs`
database by using `psql`

```bash
psql secure_rest_api_nodejs < db.sql
```

In most scenerios creating tables or changing the database schema should be
performed via [database
migrations](https://en.wikipedia.org/wiki/Schema_migration). Huncwot supports
that too, but I'm intentionally skipping that part for simplicity reasons.

## Register Route

At this point we haven't done anything related to securing our routes. Let's
change that by introducing the `/register` route for creating (or registering)
new users. Contrary to previous routes, this will be a route that responds only
to `POST` requests as we will be sending user data to the server within the
request body.

Our Node.js API will require three pieces of data to register a user: a `name`,
an `email` and a `password`.

```js {7-17}
const Huncwot = require('huncwot');
const { json } = require('huncwot/response');

const app = new Huncwot();

app.get('/', _ => json({ widget: "This is a widget available to everyone"}));
app.post('/register', ({ params }) => {
  const { name, email, password } = params;

  let person = {
    name,
    email
    password,
  };

  return json(person);
})

app.listen(5544);
```

Notice, that I use object destructuring for the input parameter in the handler
of the `/register` route as I'm only interested in `request`'s `params`. Instead
of writing `request => { ... }` I can just say `({ params }) => { ... }`.

Then, using the same approch, I can extract only the request params that I'm
interested in. In this case the three we defined initially. I assign it to
`person` object and then I return that as JSON back as HTTP response. This last
part is temporary for testing purposes.

Let's send some data via `POST` request to our newly create `/register` route.

```
http :5544/register name=Zaiste password=krzychujacielubie email=zaiste@example.com
```
```config
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 113
Content-Type: application/json
Date: Fri, 01 Apr 2019 18:25:46 GMT

{
  "email": "zaiste@example.com",
  "name": "Zaiste",
  "password": "krzychujacielubie"
}
```

When using HTTPie I don't need to specify that this request should be sent as
`POST`. By providing a list of key value parameters I implicitly indicate the
need for a `POST` request.

This is slightly different than in similar tools such as cURL or Wget. In that
case, you would need to specify the HTTP request method as `POST` explicitly.
Probably, you would also need to set the request headers as JSON. If you don't
know how to do it, either consult the documentation for your tool of choice, or
check my [Introduction to cURL](https://zaiste.net/introduction_to_curl/);
otherwise use HTTPie.

If you get back the data you sent in, as in the example above, it means the
route works as expected. We can now finally implement the proper user
registration. In order to do that, we will use Node.js
[bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) library to hash our
passwords before storing them in the database. In short, a
[hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) is a function
that can easily transform data in our direction, but it is extremely difficult
to transform that data back to its initial form. By storing hashed password in
the database, we provide an additional layer of security. In an unlikely event
of data breach, it is almost impossible to find passwords based on their hashes.

There are [some Node.js
articles](https://www.toptal.com/nodejs/secure-rest-api-in-nodejs) out there
that suggest using `createHmac` from Node.js
[crypto](https://nodejs.org/api/crypto.html) library for hashing passwords.
**You shouldn't do that.** [bcrypt
function](https://en.wikipedia.org/wiki/Bcrypt) is specifically designed for
hashing passwords. It provides the `hash` function that is **intentionally
slow** (the concept of iterations) and **salted**: a salt is a different concept
that a **secret** used for HMAC hashes.

```js {3,5,10,15}
const Huncwot = require('huncwot');
const { json } = require('huncwot/response');
const bcrypt = require('bcrypt');

const hash = bcrypt.hash;

app.get('/', _ => json({ widget: "This is a widget available to everyone"}));
app.post('/register', async ({ params }) => {
  const { name, email, password } = params;
  const hashedPassword = await hash(password, 12);

  let person = {
    name,
    email,
    password: hashedPassword
  };

  return json({ hashedPassword });
});
```

We start by aliasing `bcrypt.hash` to `hash` for convenience. Then, we hash the
received password using 12 rounds (which equals to 2^12 processing iterations).
`bcrypt.hash` provides a Promise-based API js. Thus, we can use `async/await`
syntax for additional clarity here. Finally, we return that hashed password as
the response - something we do **only** for testing purposes.

## No ORM, SQL-based Database API

In addition to the features mentioned previously, Huncwot provides a
convenient API for the database access. It is thanks to a library called
[Sqorn](https://sqorn.org/) that can build SQL queries out of JavaScript data
structures. It is similar to [Knex](https://knexjs.org/), but 10x faster and
roughly 200x faster than [Squel](https://hiddentao.com/squel/).

Here is an example of a Sqorn query:

```
sq.return({ authorId: 'a.id', name: 'a.last_name' })
  .distinct
  .from({ b: 'book' })
  .leftJoin({ a: 'author' }).on`b.author_id = a.id`
  .where({ title: 'Oathbringer',  genre: 'fantasy' })
  .query
```

Huncwot provides this API via the `huncwot/db` module. Let's use it to
store registered users along with their hashed passwords.

```js {3,19-23}
const Huncwot = require('huncwot');
const { json } = require('huncwot/response');
const db = require('huncwot/db');
const bcrypt = require('bcrypt');

const hash = bcrypt.hash;

app.get('/', _ => json({ widget: "This is a widget available to everyone"}));
app.post('/register', async ({ params }) => {
  const { name, email, password } = params;
  const hashedPassword = await hash(password, 10);

  let person = {
    name,
    email,
    password: hashedPassword
  };

  const [{ id: person_id }] = await db
    .from('person')
    .insert(person)
    .return('id');


  return json({ person_id });
});
```

`db` helper allows to execute a SQL `INSERT` query with a properly arranged
JavaScript object as its input. In our case, the input is the `person` object
containing only the fields that match the columns in the `person` table.

This may be subjective, but it is not that far in terms of convenience when
comparing with what ORMs usually provide is similar situations.

The only missing part is the database configuration. By default, the `db` helper
looks for a configuration file within `config/` (relative to the project). Let's
add the following config as `default.yml`:

```yaml
db:
  database: secure_rest_api_nodejs
  username: zaiste
```

Attention, the `username` will be different for you.

Let's test it again:

```bash
http :5544/register name=Zaiste password=krzychujacielubie email=zaiste@example.com
```
```config
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 48
Content-Type: application/json
Date: Fri, 01 Apr 2019 19:19:32 GMT

{
  "person_id": 1,
}
```

You should get back the database ID from the `person` table. Let's connect to
our database to verify it:

```bash
psql secure_rest_api_nodejs
```
```
Null display is "¤".
Line style is unicode.
Border style is 1.
Expanded display is used automatically.
psql (11.2)
Type "help" for help.
[local] zaiste@secure_rest_api_nodejs = #
```

And then, let's execute a `SELECT` query on the `person` table.

```bash
[local] zaiste@secure_rest_api_nodejs = # select * from person;
```
```

 id │  name  │      email             │                           password
────┼────────┼────────────────────────┼──────────────────────────────────────────────────────────────
  1 │ Zaiste │ zaiste@example.com     │ $2b$10$S/I1LIQlb2AaBOr56U1Y5.ClhRXSMHEs728pk3PJvurosG9EvHGj6
(1 row)
```

It looks like everything works as expected. Users are being created in the `person`
table in response to `POST` requests. The password is stored in the database in
the hashed form.

## Authentication Token

The user registration is almost finished. We only miss the authentication token
generation. This token will be exchanged between the client and the server as a
way to manage the user session. In other words, any request containing this
token will be treated as coming from a particular user. Based on that we will be
able to grant access to certain endpoints or even distinguish between logged-in
users using roles.

Authentication tokens should be at least 128 bits long and they should be
generated from a [cryptographically secure pseduo-random number
generator](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator)
(CPRNG).

In Node.js, we can use the `randomBytes` method from the `crypto` module. This
method doesn't have a Promise-based API, so let's wrap it into a promise so to
use it with the `async/await` syntax.

```js
const fromBase64 = base64 =>
  base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const token = await new Promise((resolve, reject) => {
  crypto.randomBytes(16, (error, data) => {
    error ? reject(error) : resolve(fromBase64(data.toString('base64')));
  });
});
```

Additionally, we [need to transform the
result](https://tools.ietf.org/html/rfc4648#section-5) from Base64 to Base64URL
as there are certain characters which cannot be used in HTTP headers.

The token will be returned to the user, but we need to also store it in our
database. Similar to passwords, it is a good idea to additionally hash it. This
doesn't have to be a special hasing function as with the `bcrypt` library that
is meant only for passwords. We can use any hash function that quickly generates
the result.

```js
const hashedToken = crypto
  .createHash('sha256')
  .update(token)
  .digest('base64');
```

We can now store the hashed token in the database connected with the
corresponding user. We need to create an additional table called `session` for
that.

```sql
create table session (
  id serial primary key,
  token text,
  person_id integer references person(id),
  created_at timestamptz default now()
);
```

This table uses a foreign key to reference the corresponding row in the `person`
table. This way you won't be able to insert a session for a user that doens't
exist yet. `created_at` will be used for invalidating sessions. This field
doesn't have to be specified when inserting data: it will always default to
the current timestamp.

Finally, this is the `/register` route in its full gloary:

```js {5-6,26-30,32-35,37,39}
const Huncwot = require('huncwot');
const { json, created } = require('huncwot/response');
const db = require('huncwot/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { fromBase64 } = require('base64url');

const hash = bcrypt.hash;

app.get('/', _ => json({ widget: "This is a widget available to everyone"}));
app.post('/register', async ({ params }) => {
  const { name, email, password } = params;
  const hashedPassword = await hash(password, 10);

  let person = {
    name,
    email,
    password: hashedPassword
  };

  const [{ id: person_id }] = await db
    .from('person')
    .insert(person)
    .return('id');

  const token = await new Promise((resolve, reject) => {
    crypto.randomBytes(16, (error, data) => {
      error ? reject(error) : resolve(fromBase64(data.toString('base64')));
    });
  });

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('base64');

  await db`session`.insert({ token: hashedToken, person_id });

  return json({ token, person_id });
});
```

We return the token after the registration process so that users can use the API
right away. This is similar to automatically logging users in, once they finished with
the registration.

Since we perform two writing operations on the database, it is a good idea to
use transactions here. I'm skipping it intentionally for clarity sake.

## Log In Route

Now, we need the `/login` route for a compelete authentication process. This
route will allow users to generate a new authentication token without the need
of registering. This will be similar to `/register`, but instead of creating a
new user, we will try to find an existing user based on the incoming request
data.

In this example, we require users to provide their `email` and `password` to log
in.

```js
const compare = bcrypt.compare;

app.post('/login', async ({ params }) => {
  const { email, password } = params;

  const [person] = await db.from('person')
    .where({ email });

  if (!person) return unauthorized();

  const match = await compare(password, person.password);

  if (!match) return unauthorized();

  const person_id = person.id;

  const token = await new Promise((resolve, reject) => {
    crypto.randomBytes(16, (error, data) => {
      error ? reject(error) : resolve(fromBase64(data.toString('base64')));
    });
  });

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('base64');

  await db`session`.insert({ token: hashedToken, person_id });

  delete person.password;

  return json({ token, ...person }, { Authorization: token });
});

```

We start by aliasing `bcrypt.compare` to `compare`. This function checks if the
hash generated from the value provided via `password` field matches the hash
stored in the database for given user.

We identify the user via the `email` field. It is a SQL `WHERE` query that
searches for users having this particular email. We only take the first result.
In order to further constrain this case, we could mark the `email` column as
`unique` in our database. There should be only one person with given email
address.

If a person with given email is not found, we return a `401 Unauthorized`
response by using `unauthorized()` helper from `huncwot/responses` module. The
same response is returned if the password doesn't match the one stored in the
database. Otherwise, we generate the authentication token, we quickly hash it
for storage and return that token to the user. This time we return in the
response body AND in headers as `Authorization`.

In practice, the `Authorization` token is slightly different than a key/value
pairs. The W3C introduced a type differentiatior to its value i.e.

```
Authorization: <type> <credentials>
```

Many servers support multiple methods of authorization. In those cases sending
just the token isn't enough. There is a need to priovde the `type` field
explicitly. In our case this is `Bearer`. There are other methods of HTTP
authentication such as `Basic` or `Digest`. This logic is also automatically
handled by Huncwot.

## Securing Endpoints

We can finally secure some routes. A secure route will require a valid
authentication token passed in the request to be accessed. Otherwise, we will
return `401 Unauthorized` response. In other words, a valid authentication token
will make the handler finish without returning the `401` HTTP error.

Let's call our first secure route `/secret`:

```js
app.get('/secret', async ({ headers, params }) => {
  const { authorization: token } = headers;

  if (!token) return unauthorized();

  const hash = crypto
    .createHash('sha256')
    .update(token)
    .digest('base64');

  const [found] = await db`session`({ token: hash });

  if (!found) return unauthorized();

  // from now on, we are properly authenticated

  return json({ secret: 'This message is only for admins!' });
});
```

This time, in addition to `params`, we also extract the `headers` from the
incoming request as we intent to find the authentication token there as well.
Then, we hash its value using the same function, we used before. This way we
will be able to compare it with what is stored in the database. If the provided
token matches the one stored in the database, we know that we can carry on and
this is a properly authenticated request.

Additionally, once we found a valid session, we can also reference that
particular user to check any other criteria, such roles, etc. I leave that part
as an execrise for the reader.

## Higher-Order Function Can?

You probably noticed that every secured route would need to perform the same
steps at the beginning before doing the actual work. There is some repetition
here that could be refactored. Luckly, Huncwot provides a helper just for that.
It's called `can()` and it's a [higher-order
function](https://en.wikipedia.org/wiki/Higher-order_function) (HOF). `can`
takes a handler as its input and it returns a handler as its output. This way we
can reduce previous authentication boilerplate code for each route that needs to
be secured.

Let's simplify the previous snippet:

```js
const { can } = require('huncwot/auth');

const secret = _ =>
  json({ secret: 'This message is only for admins!' });

app.get('/secret, can(secret));
```

Let's test if it all works together. First, register a new user.

```bash
http :5544/register name=Hanka email=hanka@agrobots.com password=tomliand1
```
```config
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 48
Content-Type: application/json
Date: Sat, 01 Apr 2019 17:30:08 GMT

{
  "person_id": 2,
  "token": "c33qPZLwgb74V-ysAVu5Eg"
}
```

My authentication token is `c33qPZLwgb74V-ysAVu5Eg` - this value will be
differnt for you.

Let see if I can access the `/secret` route without providing the token.

```bash
http :5544/secret
```
```config
HTTP/1.1 401 Unauthorized
Connection: keep-alive
Content-Length: 0
Content-Type: text/plain
Date: Sat, 06 Apr 2019 17:30:40 GMT
```

I cannot access this route. Let's try doing the same request, but this time we
will send our authentication token along with the request as an HTTP header.

```bash
http :5544/secure Authorization:c33qPZLwgb74V-ysAVu5Eg
```
```config
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 45
Content-Type: application/json
Date: Sat, 01 Apr 2019 17:34:50 GMT

{
  "secret": "This message is only for admins!"
}
```

It works! We can successfully access the secured and secret route using the
authentication token. This concludes the authentication process. We can now
finish off by creating our RESTful API.


## RESTful API at last

If you managed to reach this point, congratulations. It's been a long, but
important introduction. We have now a pretty good base for securing routes at
will in any Node.js application. Let's finish this article off by creating a
simple Widget API.

There will be five CRUD routes:
+ a route for listing all widgets
+ a route for getting a particular widget by ID
+ a route for creating new widget
+ a route for updating an existing widget
+ finally, a route for deleting a widget

The routes that modify the data (which is creating, updating or deleting) will
require an authentication token (they will be only available to registered users).

All widgets will be stored in the memory for simplicity reasons. It means that
once the application is restarted, all the changes will be lost. I leave the
implementation of persistance layer as the exercise for the reader.

```js
const { json, created, ok, notFound } = require('huncwot/response');

const widgets = [
  {
    id: 1,
    name: "Widget 1"
  }
]

let _id = 1;  // counter: current id to assign to a new widget

const browse = _ => json(widgets);

const read = ({ params: { id } }) => {
  const widget = widgets.find(_ => _.id === +id)

  if (!widget) return notFound();

  return json(widget);
}

const add = ({ params: { name } }) => {
  const id = ++_id;

  widgets.push({ id, name, })
  return created({ id, name })
}

const edit = ({ params: { id, name }}) => {
  const widget = widgets.find(_ => _.id === +id);

  widget.name = name;

  return ok();
}


app.get('/widgets', browse)
app.get('/widgets/:id', read)
app.post('/widgets', can(add))
app.patch('/widgets', can(edit))
app.delete('/widgets', can(destroy))
```

## Bonus

I have been mentioning in this article, that there are many interesting features
in Huncowt. So, what is there more?

In the context of authentication, the both routes we created at the beginning,
i.e. `/register` & `/login` come built-in with Huncwot. This way you don't need to
implement it each time for new applications.

Here is the final snippet for our secure Node.js RESTful API.

```js
const Huncwot = require('huncwot');
const {
  ok,
  json,
  notFound,
  created,
  unauthorized
} = require('huncwot/response');
const { login, register, can } = require('huncwot/auth');
const db = require('huncwot/db');

// In-Memory State

const widgets = [
  {
    id: 1,
    name: 'Widget 1'
  }
];

let _id = 1;

const app = new Huncwot();

// Handlers
const secret = _ =>
  json({ secret: 'This message is only for admins!' });

const browse = _ =>
  json(widgets);

const read = ({ params: { id } }) =>
  json(widgets.find(_ => _.id === +id));

const add = ({ params: { name } }) => {
  const id = ++_id;

  widgets.push({ id, name });

  return created({ id, name });
};

const edit = ({ params: { id, name } }) => {
  const widget = widgets.find(_ => _.id === +id);

  if (!widget) return notFound();

  widget.name = name;
  return json({ id, name });
};

const destroy = ({ params: { id } }) => {
  const widgetIndex = widgets.findIndex(_ => _.id === +id);

  if (widgetIndex < 0) return notFound();

  widgets.splice(widgetIndex, 1);

  return ok();
};

// Finder

const finder = async ({ email }) => {
  const result = await db.from('person').where({ email });
  return result;
};

// Routes

app.get('/', _ => 'Hello, Huncwot');
app.get('/name/:name', ({ params }) => `Hello, your name is ${params.name}`);
app.get('/json', _ => json({ widget: 'This is widget 1' }));

app.post('/register', register({ fields: ['name', 'email'] }));
app.post('/login', login({ finder }));

app.get('/secret', can(secret));
app.get('/widgets', browse);
app.get('/widgets/:id', read);
app.post('/widgets', can(add));
app.patch('/widgets/:id', can(edit));
app.delete('/widgets/:id', destroy);

app.listen(5544);
```

This code is also available [on GitHub](https://github.com/zaiste/secure-rest-api-nodejs).

[Huncwot](https://huncwot.org/) provides many things out of the box, think
**Express.js with batteries included**. If you want an integrated solution for
building web applications that optimizes for programmers productivity by
reducing choices and incorporating community conventions, look no further -
Huncwot has your back. Be aware, though, the project is still in early stages.


*Thanks to Peter Cooper & Piotr Kowalski for reviewing drafts of this article.*
