+++
date = 2019-12-28T00:00:00.000Z
title = "Building A REST API in Node.js with TypeScript (part 1 of 4)"
aliases = [
  "building-rest-api-nodejs-typescript-1"
]
[taxonomies]
topics = [ "Node.js", "TypeScript", "JavaScript", "REST" ]
+++

Let's build a simple a REST API in Node.js using [TypeScript](https://www.typescriptlang.org/). This series will be split into **four parts** as there is a lot to discuss. It is also aimed for absolute beginners or people just starting with programming. At the same time I will be mentioning few some advanced topics so that even if you know how to build a REST API, you will hopefully still gain something from reading this tutorial.

<div class="notice warning">
If you prefer to watch me coding this application instead of reading the article, check <a href="https://www.youtube.com/watch?v=AqanhZQJfrw">this video</a>. Also, if you liked it, consider subscribing to <a href="https://www.youtube.com/zaiste">my YouTube channel</a> for more.
</div>

In this series I will be using [Huncwot](https://github.com/huncwotjs/huncwot), which is a tool to quickly build web applications. It is an integrated solution that covers both frontend, backend and everything in between.

Let's start by installing [Huncwot](https://github.com/huncwotjs/huncwot). It's better to do it globally.

```shell
npm install -g huncwot
```

## A bit of theory

Before we jump into the code, let's start with some theory. This won't be a comprehensive introduction. My goal is to explain a few concepts, and then show you some practical examples. I believe this is the best way to quickly gain proper intuition on the subject.

### APIs

API stands for Application Program Interface. The important bit here is the word /interface/. An interface is this point where we meet to interact with something. For example the screen of our phone is an interface, a user interface (or UI) to be exact. This interface allows us to interact with the device. By touching, pressing and swapping the screen we instruct the phone to do some actions. Those gestures are the middle ground: for humans it would be easier just to think about the action to do, for phones it would be easier to receive the instructions directly as a chain of 0s and 1s; instead we have a compromise, a point in between how to humans can interact with phones - the interface.

### Web APIs

There are many types of APIs. In this tutorial we will be discussing a Web API, which are places on the web where we go to interact with something by getting or sending data to it. In other words, a Web API is an interface exposed through an endpoint (an URL) which allows us to interact with some system by exchanging messages. Those messages are requests we send in and responses that we receive. A Web API is a message system, which conceptually is somehow close to object-oriented programming.

### URLs

Requests instruct Web APIs do something for us. In order to send it we need an address: a URL. URLs have several parts. There is protocol: for Web APIs it's `http(s)`. There is a domain which designates a place on the web where this Web API lives. Finally there is a path, which is a location within that domain that describes a specific subset of information.

### Resources

Let's imagine we want to build a Web API for technical events so that we could ask for the upcoming events in our area, or the best tech conferences which happened in the past. We start by creating necessary abstractions for all entities within that contexts. Those abstractions are called resources. We could start with an `Event` resource where each one would have a `name` field and a `date` field. Later on we could imagine adding other resources such as `Attendee`, `Organizer`, `Speaker` and more.

We can now expose each resource as the path in the URL of our Web API, e.g. the `/event` path for the `Event` resource, the `/speaker` path for the `Speaker` resources and so on. Once the resource is exposed, we can start interacting with it by sending requests and receiving responses. We may, for example, fetch the current state of a particular resource, filter a resource based on a specific criteria, or update a resource because you found a typo in its name.

### Headers

When sending requests and receiving responses to our Web API we may need to parametrize how this API behaves. This is unrelated to the specific context of that API, whether we are building an API for technical events, to manage a bookstore or to schedule appointments. For example, we may want to change the response format. We communicate that to the API via headers.

### Handlers

Each path is associated with a function, which describes what should happen once this path visited or this resource requested. We call those functions **handlers**. A handler receives a request as input and produces a response as output.

### Routes

A Web API is a mapping between paths (that may describe resources) and handlers. A particular pair of a path and its handler is called **route**. This is a data-driven approach for defining routes. We use a simple data structure already available in most programming languages, a map to represent the relation between exposed paths and functions being triggered once that path is visited.

## Practical Example

Let's finally jump to the code and let's create our project: `techevents`.

```shell
huncwot new techevents
```

Let's open the project in VS Code. We are only interested in the `config/server/routes.ts` file.

```typescript
import { Routes } from 'huncwot';
import { OK } from 'huncwot/response';

const routes: Routes = {
  GET: {
    // implicit `return` with a `text/plain` response
    '/hello': _ => 'Hello Huncwot',

    // explicit `return` with a 200 response of `application/json` type
    '/json': _ => {
      return OK({ a: 1, b: 2 });
    },

    // set your own headers
    '/headers': _ => {
      return { body: 'Hello B', statusCode: 201, headers: { 'Authorization': 'PASS' } };
    }
  },
  POST: {
    // request body is parsed in `params` by default
    '/bim': request => {
      return `Hello POST! ${request.params.name}`;
    }
  }
};

export default routes;
```

Huncwot generated for us a basic structure for routes. Let's start the server to test it out:

```
huncwot server
```

This command will start the server on the port `:5544`. We can now send some requests to see how it works. I'll use HTTPie to send requests directly from the command line, but you may also use something like the [Postman API Client](https://www.typescriptlang.org/).

Let's send a request to the `/hello` path:

```
http :5544/hello
```
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 13
Content-Type: text/plain
Date: Sun, 29 Dec 2019 16:56:23 GMT

Hello Huncwot
```

Since the server is running on the `localhost` I can skip that part and only specify the port along with the path.

```
http :5544/json
```
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 13
Content-Type: application/json
Date: Sun, 29 Dec 2019 16:56:44 GMT

{
    "a": 1,
    "b": 2
}
```

Huncwot is able to automatically transform a JavaScript object into JSON. Additionally, you may use the response helpers such as `OK` to specify an HTTP status code of your choice.

```
http :5544/headers
```
```{2}
HTTP/1.1 201 Created
Authorization: PASS
Connection: keep-alive
Content-Length: 7
Content-Type: text/plain
Date: Sun, 29 Dec 2019 16:57:11 GMT

Hello B
```

Since responses in Huncwot are just objects, you can add the `headers` field to the response object with headers of your choice. In this case, the `Authorization` header with the value `PASS`.

In Huncwot, the changes to your routes are automatically reload. There is no need to restart the server nor to install something like `nodemon`. It works out of the box. You don't have to worry about this.

The `config/server/routes.ts` is a simple JavaScript hash map (or an object to be exact). We can use the `Routes` type from Huncwot to further constrain that fact. Each handler receives a request as input (which has the `Request` type) and returns a response (which has the `Response` type).

We have now a good understanding of a few concepts related to Web APIs. We built a foundation for a future REST API. We are not yet there as few important elements are still missing. I will cover that in the upcoming articles.



