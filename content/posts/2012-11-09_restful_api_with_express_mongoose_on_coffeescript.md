
+++
date = 2012-11-09T00:00:00.000Z


title = "RESTful API with Express, Mongoose on CoffeeScript"
topics = [
  "api",
  "nodejs",
  "rest",
  "express",
  "mongoose",
  "coffeescript"
]

+++

In this post I will show you how to build a basic RESTful API using [Express][2], a popular [NodeJS][1] framework. I will use [MongoDB][5] for storage with [Mongoose ODM][3]. The application will be written in [CoffeeScript][8] and it will be compatible with Heroku.

As we are not concerned about the data, our API will allow to access abstract (and mysterious) widgets using four [CRUD][6] operations: create, retrieve, update, delete.

## Before We Start

Make sure you have NodeJS installed and MongoDB installed and running. You can check [one of my previous articles][9] for details about installing and managing different versions of NodeJS in a convenient way. For MongoDB consider [official installation guide][4].

## Minimal Viable Example

Express comes with a script to generate an application scaffold. In this tutorial, however, we will build it from scratch in order to get the whole picture and fully understand what is going on.

We start off by placing two files in a newly created directory:

 * `app.coffee` the core of our application
 * `package.json` which defines application dependencies

```
express  = require 'express'
app = express()

app.configure ->
  app.set "port", process.env.PORT or 4000

app.get '/', (req, res) ->
  res.send 'Hello, Zaiste!'

app.listen app.get('port'), ->
  console.log "Listening on port #{app.get('port')}"
```

```
{
  "name": "widget-factory-api",
  "description": "API for widgets.",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "coffee-script": "latest",
    "express": "3.x"
  }
}
```

Let's run it with `coffee app.coffee` and test if it really works:

```
λ coffee app.coffee &
Listening on port 4000
λ curl localhost:4000
Hello, Zaiste!
```

For convenience we can also use `npm` to launch the server by adding `scripts` section to `package.json`.

```
{
  ...
  "scripts": {
    "start": "coffee -w app.coffee"
  }
}
```

From now on, we can just `npm start` to start the server. Additional `-w` parameter means the application is run in a watch mode, i.e. it is reloaded once the source code changes.

## Persistance Layer

NodeJS provides many ways to integrate with MongoDB, Mongoosejs is one of them. It is an open-source, object data modeling (ODM) library.  It is built on top of [NodeJS Native Drive][10].

The native driver is a more basic, lower level way to integrate with MongoDB while ODM puts in an additional layer of abstraction which helps to « manage » data access.  Some people like such approach praising increased development speed, other complain about unnecessary complexity. As always, the truth is somewhere in the middle, it is difficult to generalise and often it depends.

MongoDB has a flexible schema. It means that inside the same collection we can have documents with different set of fields. Mongoose enforces a fixed structure on these flexible  collections with schema definitions.

Let's add Mongoose to `package.json` followed by `npm install`.

```
{
  ...
  "dependencies": {
    "mongoose": "latest"
  }
}
```

## Object Modeling

We are ready to define a schema for a `Widget`. Each document in a collection is supposed to have four fields: a name, a description, an amount and a creation timestamp.

Let's create a `model` directory along with `widget.coffee` file inside:

```
mongoose = require 'mongoose'

Widget = new mongoose.Schema(
  name: { type: String, trim: true }
  desc: String
  amount: { type: Number, min: 0 }
  created_at: { type: Date, default: Date.now }
)

mongoose.model "Widget", Widget
```

Now, inside our `app.coffee`, we can require Mongoose library, connect to the database and make the schema available.

```
mongoose = require 'mongoose'

app.configure ->
  ...
  app.set 'storage-uri',
    process.env.MONGOHQ_URL or
    process.env.MONGOLAB_URI or
    'mongodb://localhost/widgets'

mongoose.connect app.get('storage-uri'), { db: { safe: true }}, (err) ->
  console.log "Mongoose - connection error: " + err if err?
  console.log "Mongoose - connection OK"

require './model/widget'
```

The application is also prepared to handle MongoDB providers available on Heroku: MongoHQ and MongoLab. By default, MongoDB favours speed over data safety; here, we explicitly override this setting.


## Time to REST

Our API will be RESTful: we operate on a resource called `Widget` using four operations

in order to implement CRUD functionality (create, retrieve, update, delete); we interact with our resource by defining two URLs: `/widgets` and `/widgets/:id` (`:id` denotes a variable part of an URL - a resource unique identifier).

First, we include `bodyParser` middleware that parses request body so the parameters passed in become available as `req.body`.

```
app.configuration ->
  ...
  app.use express.bodyParser()
```

In `app.coffee`, we specify all necessary routes with their respective operations.

```
app.post    '/widgets',     widgets.create
app.get     '/widgets',     widgets.retrieve
app.get     '/widgets/:id', widgets.retrieve
app.put     '/widgets/:id', widgets.update
app.delete  '/widgets/:id', widgets.delete
```

We will put implementations of these operations inside `controller` folder with each resource having one file; in our case it would be `controller/widgets.coffee`.

Let's start with `create` operation triggered by a `POST` request to `/widgets`. Data necessary to create a new resource is supposed to be passed in as request body in JSON format. This way we can simply place it directly as a parameter for Mongoose. Additionally, fields not defined in the schema will be omitted.

```
exports.create = (req, res) ->
  Resource = mongoose.model('Widget')
  fields = req.body

  r = new Resource(fields)
  r.save (err, resource) ->
    res.send(500, { error: err }) if err?
    res.send(resource)
```

`retrieve` operation checks if there is an ID parameter within URL. If that is the case, it tries to retrieve a single resource with that id, otherwise it returns all resources from the collection.

```
exports.retrieve = (req, res) ->
  Resource = mongoose.model('Widget')

  if req.params.id?
    Resource.findById req.params.id, (err, resource) ->
      res.send(500, { error: err }) if err?
      res.send(resource) if resource?
      res.send(404)
  else
    Resource.find {}, (err, coll) ->
      res.send(coll)
```

We `update` our resource with `PUT` request. The resource ID is passed as URL parameter while the request body (in JSON format) carries information about fields and their values that need to be changed.

```
exports.update = (req, res) ->
  Resource = mongoose.model('Widget')
  fields = req.body

  Resource.findByIdAndUpdate req.params.id, { $set: fields }, (err, resource) ->
    res.send(500, { error: err }) if err?
    res.send(resource) if resource?
    res.send(404)
```

Finally, there is a `delete` operation that removes a resource with a given ID, specified as URL parameter.

```
exports.delete = (req, res) ->
  Resource = mongoose.model('Widget')

  Resource.findByIdAndRemove req.params.id, (err, resource) ->
    res.send(500, { error: err }) if err?
    res.send(200) if resource?
    res.send(404)
```

Our implementation has a basic error handling mechanism, plus it returns a 500 response when the requested resource is not found. Still, there is no data validation nor security layer implemented.

## Testing Routes

All pieces in place, we can now test our application. Let's start by creating first widget:

```
λ curl -X POST -H 'Content-Type: application/json' \
    -d '{ "name": " Widget 1 ", "desc": "This is widget 1", "amount": "10" }' \
    localhost:4000/widgets
{
  "__v": 0,
  "name": "Widget 1",
  "desc": "This is widget 1",
  "amount": "10",
  "_id": "50d8d67f228552594b000001",
  "created_at": "2012-11-04T21:26:07.333Z"
}
```

Let's get all widgets, only one or one that doesn't exist:

```
λ curl localhost:4000/widgets
[
  {
    "name": "Widget 1",
    "desc": "This is widget 1",
    "amount": "10",
    "_id": "50d8d67f228552594b000001",
    "__v": 0,
    "created_at": "2012-11-04T21:26:07.333Z"
  }
]

λ curl localhost:4000/widgets/50d8d67f228552594b000001
{
  "name": "Widget 1",
  "desc": "This is widget 1",
  "amount": "10",
  "_id": "50d8d67f228552594b000001",
  "__v": 0,
  "created_at": "2012-11-04T21:26:07.333Z"
}

λ curl localhost:4000/widgets/50d8d67f228552594b000011
Not found
```

A request to update a widget is similar to the one that creates it:

```
λ curl -X PUT -H 'Content-Type: application/json' -d '{ "name": "Widget 999" }' \
    localhost:4000/widgets/50d8d67f228552594b000001
{
  "name": "Widget 999",
  "desc": "This is widget 1",
  "amount": "10",
  "_id": "50d8d67f228552594b000001",
  "__v": 0,
  "created_at": "2012-11-04T21:26:07.333Z"
}
```

Finally, let's delete our widget.

```
λ curl -X DELETE localhost:4000/widgets/50d267b593b4090000000001
OK

λ curl localhost:4000/widgets/50d8d67f228552594b000001
Not found

λ curl localhost:4000/widgets
[]
```

## Summary

We built a basic RESTful API in NodeJS with Express and Mongoose in CoffeeScript. We implemented four CRUD operations for a single resource along with a simple error handling mechanism.

The code of this application is [available on Github][11]. No additional changes are needed to deploy it on Heroku, either using [MongoHQ][12] or [MongoLab][13].

[1]: http://nodejs.org/
[2]: http://expressjs.com/
[3]: http://mongoosejs.com
[4]: http://docs.mongodb.org/manual/installation/
[5]: http://mongodb.org
[6]: http://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[7]: http://en.wikipedia.org/wiki/Representational_state_transfer
[8]: http://coffeescript.org
[9]: http://zaiste.net/2012/08/fast_way_to_install_nodejs_on_linux_and_osx/
[10]: https://github.com/mongodb/node-mongodb-native
[11]: https://github.com/zaiste/__express-mongoose-coffee
[12]: http://mongohq.com
[13]: http://mongolab.com/
