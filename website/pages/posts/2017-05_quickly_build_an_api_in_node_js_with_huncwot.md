---
created_at: 2017-05-15 
kind: article
publish: true
title: "Quickly build an API in Node.js using async/await & PostgreSQL"
image: "nodejs-rest-api-huncwot.jpg"
tags:
- nodejs
- api
- rest 
- huncwot
---

The JavaScript ecosystem is vast and rich. There is a lot of possibilities to explore and a lot of choices to make. NPM itself has now more than 500,000 packages available which makes it the largest package repository in the world. All that may overwhelm and distract us from the task at hand, and as a result hinder our productivity. If you are tired of making various modules compatible one with another, but rather looking for guidance and/or conventions while building modern web application in JavaScript, let me introduce to you Huncwot.

[Huncwot](https://github.com/zaiste/huncwot) is an opinionated [Node.js](https://nodejs.org/en/) web framework built for ESNext era providing a coherent solution to build modern, full-stack JavaScript web applications. It is being built with battery included approach in mind, i.e. it comes with a (eventually large) library of useful modules which are developed in a coherent way. This stands in direct opposition to Express or Koa approach. Huncwot tries to formalize conventions and eliminate valueless choices by providing solid defaults for building web applications that increase the programmers productivity.

Huncwot exclusively supports Node 7.6+ to avoid a transpilation pipeline of any kind (there are, however, plans to support TypeScript by default). It is an integrated solution that optimizes for programmers productivity by reducing choices and incorporating community conventions. The framework encourages the use of `async/await` syntax which makes the code easier to test, debug, read and reason about. 

In this article of the series, we are going start with the backend side by building a simple RESTful API for a (yet another) « To Do » application to demonstrate what Huncwot brings to the table. In the follow-up article, we will complement that application with a UI layer being built using a (modern) component-based approach. 

## Getting started

Let's start by installing the framework

```
npm install -g huncwot
```

Next, we need to generate a new Huncwot application  by running `huncwot new` command. Huncwot uses `yarn` to install its dependencies, so be sure to have it installed as well.

```
huncwot new todoapp
cd todoapp
```

You can immediately run that application by using `huncwot server` (or `huncwot s` for short)  command

```
huncwot server
```

## Routes & corresponding handlers

Huncwot enforces some conventions that aim to increase your productivity. One of those conventions is related to building RESTFul APIs: each file inside `controllers/` directory is considered to be a REST route for a specific resource and it is supposed to define five functions to operate on it i.e. `Browse`, `Read`, `Edit`, `Add`, `Delete` in short [BREAD](http://paul-m-jones.com/archives/291), which is a kind of (tastier) extension of [CRUD approach](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Each of those functions is triggered by a corresponding HTTP method i.e. `Browse` and `Read` by `GET`, `Edit` by `PUT`, `Add` by `POST` and finally `Delete` by `DELETE`.

In contrast to Express or Koa, Huncwot handlers only **take an HTTP request** as input and always **return an HTTP response** - this approach is inspired by [Clojure's ring](https://github.com/ring-clojure/ring) web library. `ok` & `created` are convenience wrappers around HTTP statuses i.e. `ok` corresponds to `200 OK` while `created` to `201 Created`.

```js
const { ok, created } = require('huncwot/response');
const db = require('huncwot/db');

async function browse(request) {
  const results = await db('tasks');
  return ok(results);
}

async function read(request) {
  const { id } = request.params;
  const result = await db('tasks').where({ id });
  return ok(result);
}

async function edit(request) {
  const { id, name } = request.params;
  await db('tasks').where({ id }).update({ name });
  return ok({ status: `success: ${id} changed to ${name}` });
}

async function add(request) {
  const { name } = request.params;
  await db('tasks').insert({ name });
  return created({ status: `success: ${name} created` });
}

async function destroy(request) {
  const { id } = request.params;
  await db('tasks').where({ id }).del();
  return ok({ status: `success: ${id} destroyed` });
}

module.exports = { browse, read, edit, add, destroy }
```

## Persistence layer

This automatically generated controller looks great, but how Huncwot will know which database to use? The only missing part is to set up our database using `huncwot db setup`. By default, Huncwot generates a configuration for SQLite RDMS:

```json
{
  "client": "sqlite3",
  "development": {
    "filename": "./db/development.sqlite3"
  },
  "test": {
    "filename": "./db/test.sqlite3"
  },
  "production": {
    "filename": "./db/production.sqlite3"
  }
}
```

## PostgreSQL integration

If you fancy SQLite, you just need to setup the database (skip below). For the purpouse of this article we've decided, however, to integrate with PostgreSQL RDMS. Adapting the configuration is relatively straigtforward. I'm connecting here to a database called `todo_dev` accessible by a username (PostgreSQL role) `zaiste` with no password associated:

```json
{
  "client": "postgresql",
  "development": {
    "database": "todo_dev",
    "username": "zaiste",
    "password": ""
  }
  ...
}
``` 

You can check if the credentials properly work with PostgreSQL server using PostgreSQL's `psql [database [username]]` CLI utility tool. In my case it would be:

```
psql todo_dev zaiste
```

Let's finish it up with setting up our database. Huncowt automatically generates a basic example of a database schema, it creates an example table and populates it with some dummy data using a regular SQL script available at `db/tasks.sql`

```sql
DROP DATABASE IF EXISTS todo_dev;
CREATE DATABASE todo_dev;

\c todo_dev;

CREATE TABLE tasks (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  done BOOLEAN
);

INSERT INTO tasks (name, done)
VALUES
    ('Share the love about Huncwot', false),
    ('Build a fantastic web application', false),
    ('Give back to the community', false);
```

All this is meant as a starting point and to show you how all the pieces are combined together; eventually all those files are supposed to be replaced. 

## Testing routes

Once you start the application using `huncwot s`, you can start playing with that resource at `/tasks`. I will be using [httpie](https://httpie.org) instead of [curl](https://curl.haxx.se) to issue HTTP requests in the examples below (be sure to have it installed before following along).

Let's start by retrieving all tasks 

```
http :5544/tasks
```

Next, let's retrieve a single task by `id`

```
http :5544/tasks/2
```

Adding a new task is as simple as

```
http POST :5544/tasks name="Task X"
```

You can verify if the task has been added to the list by getting all of them

```
http :5544/tasks
```

Editing a task in our example is almost identical to adding a new task

```
http PUT :5544/tasks/2 name="Task 22"
```

Finally, let's delete a task

```
http DELETE :5544/tasks/2
```

We have now a fully working RESTful API integrated with PostgreSQL RDMS. Huncwot tries to keep new abstractions to minimum e.g. you interact with the database using plain, old SQL queries.

Stay tuned for the next article which will present how to build a componend-based UI on top of this RESTful API using [Marko](http://markojs.com/) as UI library and [MobX](https://mobx.js.org/) for unified approach to state management. 


