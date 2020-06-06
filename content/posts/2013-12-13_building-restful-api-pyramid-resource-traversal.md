
+++
date = 2013-11-13T00:00:00.000Z
title = "Building a RESTful API with Pyramid - Resource and Traversal"
aliases = [
    "building_a_restful_api_with_pyramid_resource_and_traversal"
]
[taxonomies]
topics = [ "Python", "REST", "API" ]
+++

In [the previous post][3] we built a basic Pyramid application: a foundation for a RESTful API. For simplicity, I left out many details. Today, we will transform that application into something more close a real API. At the end of this article, we will have developed Pyramid API that handles single resource persisted with MongoDB database and managed by Pyramid’s traversal routing mechanism.

## Views

Let’s start with the view layer. A RESTful API should provide up to four operations to interact with each resource: Create, Retrieve, Update and Delete (CRUD).  According to REST guidelines, URLs identify resources while HTTP verbs are used to specify actions on these resources. As a result we end up with unified and consisted naming approach.

A RESTful API needs to provide only two URLs per resource: one for a collection and one for a specific resource. Collections will be referred by plural names while resources by identifiers (`ObjectId` in case of MongoDB).

```
/cities          # HTTP verbs allowed: GET, POST
/cities/:id      # HTTP verbs allowed: GET, PUT, DELETE
```

Operations `update`, `retrieve` (single result) and `delete` are bound to a single resource i.e. City (specified as `context`).

```
@view_config(request_method=‘PATCH', context=City, renderer='json')
def update_city(context, request):
    r = context.update(request.json_body, True)

    return Response(
        status='202 Accepted',
        content_type='application/json; charset=UTF-8')


@view_config(request_method='GET', context=City, renderer='json')
def get_city(context, request):
    r = context.retrieve()

    if r is None:
        raise HTTPNotFound()
    else:
        return r


@view_config(request_method=‘DELETE', context=City, renderer='json')
def delete_city(context, request):
    context.delete()

    return Response(
        status='202 Accepted',
        content_type='application/json; charset=UTF-8’)
```

For operations `create` and `retrieve` (listing) we define `context` as a resource collection, i.e. `Cities`.

```
@view_config(request_method=‘PUT', context=Cities, renderer='json')
def create_city(context, request):
    r = context.create(request.json_body)

    return Response(
        status='201 Created',
        content_type='application/json; charset=UTF-8')


@view_config(request_method='GET', context=Cities, renderer='json')
def list_cities(context, request):
    return context.retrieve()
```

Error handling is still very basic. Pyramid allows us to redefine most common errors in the view with a custom handler. We will use that feature to redefine `notfound` handler so it returns data in JSON format.

```
@notfound_view_config()
def notfound(request):
    return Response(
        body=json.dumps({'message': 'Custom `Not Found` message'}),
        status='404 Not Found’,
        content_type='application/json’)
```

Finally, we can optionally add a view for the root of our API; it will be called `home`.

```
@view_config(renderer='json', context=Root)
def home(context, request):
    return {'info': 'City API’}
```

## Persistance Layer

We will be using [PyMongo][1] to talk to our database; it’s a lightweight Python driver supported by 10gen. You can install it into current virtual environment using `pip`.

```
pip install pymongo
```

We need to also add `pymongo` to the list of `requires` inside `setup.py`.

```
requires = [
    …
    pymongo
]
```

Within `development.ini`, under `[app:main]`, we specify our database connection string.

```
mongo_uri = mongodb://127.0.0.1:27017/cityz
```

Now, we are ready to write the code that connects to the database. It will be stored in `db.py`.

```
def includeme(config):
    settings = config.registry.settings

    # Store DB connection in registry
    db_url = urlparse(settings['mongo_uri'])
    conn = pymongo.Connection(host=db_url.hostname, port=db_url.port)
    settings['db_conn'] = conn

    # Make DB connection accessible as a request property
    def _get_db(request):
        settings = request.registry.settings
        db = settings['db_conn'][db_url.path[1:]]
        if db_url.username and db_url.password:
            db.authenticate(db_url.username, db_url.password)
        return db

    config.set_request_property(_get_db, 'db', reify=True)
```

This code parses the configuration file and adds MongoDB connection as a request property. Lastly, we include that file in `__init__.py` using `config.include(‘.db’)`.

## Traversal

The second major change will be transforming our routing mechanism: traditional URL dispatch approach will be replaced by [traversal][2], Pyramid’s unique feature.

In a nutshell, the idea behind traversal is to build a tree structure out of possible paths which the application can respond to; e.g. `/country/us/cities/sf`, `/country/france/cities/paris`, `/country/france/cities/nancy` form a tree with three nodes. When a request reaches the application, its path is  being compared with each branch from that tree (in other words, the tree is being _traversed_ to find a matching branch). If a branch matches the requested path, the associated logic is applied.

Such approach goes well with document-oriented approach of MongoDB database; it allows to map application’s routes hierarchy directly into a hierarchy of the underlaying data store. For the previous example, `/country` segment can be mapped to `countries` collection in a MongoDB database while `/city` segment could be associated with embedded `cities` collection. Obviously, this only makes sense if it’s the natural way to present the data, i.e. a city cannot belong to the same country at the same time.

When using traversal, we don't need the code that dispatches requests (let’s remove that from `__init__.py`). The dispatch process is being handled by Pyramid’s resource layer - each Pyramid’s resource represent a node in a virtual tree that maps to the structure of a route.

Let’s start with the resource abstraction that is built around `dict`. It knows what is its parent and how to bind another resource node to it via `add_child` method.

```
class Resource(dict):

    def __init__(self, ref, parent):
        self.__name__ = ref
        self.__parent__ = parent

    def __repr__(self):
        # use standard object representation (not dict's)
        return object.__repr__(self)

    def add_child(self, ref, klass):
        resource = klass(ref=ref, parent=self)
        self[ref] = resource
```

In the next step, we are going to focus on a persistence abstraction and separate MongoDB collection from MongoDB document representation. A collection should only know how to fetch its all elements (its `retrieve` method) and how to add a new element to that collection (its `create` method).

```
class MongoCollection(Resource):

    @property
    def collection(self):
        root = find_root(self)
        request = root.request
        return request.db[self.collection_name]

    def retrieve(self):
      return [elem for elem in self.collection.find()]

    def create(self, document):
        object_id = self.collection.insert(document)
        return self.resource_name(ref=str(object_id), parent=self)
```

A single document abstraction operates on « itself » and should be able (1) to return an element for a particular identifier, (2) to update an element with a particular identifier or (3) to delete an element with a particular identifier; this identifier is stored inside `ref` for a given resource.

```
class MongoDocument(Resource):

    def __init__(self, ref, parent):
        Resource.__init__(self, ref, parent)

        self.collection = parent.collection
        self.spec = {'_id': ObjectId(ref)}


    def retrieve(self):
        return self.collection.find_one(self.spec)

    def update(self, data, patch=False):
        if patch:
            data = {'$set': data}

        self.collection.update(self.spec, data)

    def delete(self):
        self.collection.remove(self.spec)
```

`update` method is able to different between a partial update (when `patch` is `True`) and full update (a resource is fully replaced).

With those persistence abstraction, we can now construct resources that will correspond to our City resource, i.e. its collection (named `Cities`) and its single document (named `City`).

```
class City(MongoDocument):

    def __init__(self, ref, parent):
        MongoDocument.__init__(self, ref, parent)


class Cities(MongoCollection):

     collection_name = 'cities'
     resource_name = City

     def __getitem__(self, ref):
          return City(ref, self)
```

`Cities` collection delegates the task to `City` document when an identifier is provided.

Now, we are ready to assemble it all together using `Root` resource.

```
class Root(Resource):

    def __init__(self, request):
        Resource.__init__(self, ref='', parent=None)

        self.request = request
        self.add_child('cities', Cities)
```

## Test it

With everything put in place, we are ready to run our application and see how it behaves. First, let’s create several cities

```
curl -XPOST -d ‘{ “name”: “Poznan”, “population”: “550,742" }' localhost:6543/cities
curl -XPOST -d ‘{ “name”: “Paris”, “population”: “2,234,105" }' localhost:6543/cities
curl -XPOST -d ‘{ “name”: “San Francisco”, “population”: “825,865" }' localhost:6543/cities
```

Let’s verify if were persisted and are available from the API.

```
curl localhost:6543/cities
[{"_id": {"$oid": "5292826fa0022dde6b80ebf0"}, "name": "Paris", "population": "2,234,105"}, {"_id": {"$oid": "52928283a0022dde6b80ebf1"}, "name": "San Francisco", "population": "825,865"}, {"_id": {"$oid": "5292abce643a0851b949db22"}, "name": "Poznan", "population": "550,742"}]%
```

There is a small mistake in the name of Poznań city. The last letter is a special character. Let’s amend it by updating that particular city.

```
curl -XPUT -d '{"name": "Poznań"}' localhost:6543/cities/5292abce643a0851b949db22
```

Let’s see if that changed has been taken into account by retrieving that particular city.

```
curl localhost:6543/cities/5292abce643a0851b949db22
{"_id": {"$oid": "5292abce643a0851b949db22"}, "name": "Pozna\u0144", "population": "550,742"}%
```

Lastly, we should be able to remove any city.

```
curl -XDELETE localhost:6543/cities/5292826fa0022dde6b80ebf0
curl localhost:6543/cities
[{"_id": {"$oid": "52928283a0022dde6b80ebf1"}, "name": "San Francisco", "population": "825,865"}, {"_id": {"$oid": "5292abce643a0851b949db22"}, "name": "Poznan", "population": "550,742"}]%
```

## Summary

Our application looks now much more like a real RESTful API. We have implemented all CRUD operations backed with a MongoDB database. We have also switched the routing mechanism into traversal. The application, however, is not very generic: there are many code repetitions, error handling is rudimentary and we haven’t written a single test. In the next article, I will show you how to solve these problems.

The code of this tutorial is available on [Github][4] under `persist-part2` tag.


[1]: http://api.mongodb.org/python/current/
[2]: https://pyramid.readthedocs.org/en/latest/narr/traversal.html
[3]: /2013/05/building_a_restful_api_with_pyramid_setup/
[4]: https://github.com/zaiste/cityz
