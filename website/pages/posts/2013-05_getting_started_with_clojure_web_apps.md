---
created_at: 2013-05-15
kind: article
publish: true
title: "Getting started: Clojure Web App with Compojure and Envlive"
tags:
- clojure
- web
- tutorial
- howto
---

In this article I will show you how to create a basic Clojure web application
built with [Compojure][1] and [Enlive][2]. Our HTML templates will be [Pure][3].

You can find the code for this tutorial [at Github][4].

## Create a project

Generate a new Compojure project using Leiningen. For more details about
Leiningen, check an older [Clojure App 101][5] article.

```
λ lein new compojure clojure-web-101
λ tree
.
├── README.md
├── project.clj
├── resources
├── src
│   └── clojure_web_101
│       └── handler.clj
└── test
    └── clojure_web_101
        └── test
            └── handler.clj
```

`project.clj` is a Leiningen configuration. It stores project metadata: its
dependencies, description, version et al.

```
(defproject clojure-web-101 "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [compojure "1.1.5"]]
  :plugins [[lein-ring "0.8.5"]]
  :ring {:handler clojure-web-101.handler/app}
  :profiles
  {:dev {:dependencies [[ring-mock "0.1.5"]]}})
```

In `resources` directory we put assets such as images, JavaScript and
CSS files along with HTML templates. `src` and `test` usually have similar
structure, the first directory stores the actual application code while the
second one the tests that goes with it.

Run the application

```
λ cd clojure-web-101
λ lein ring server-headless                                                    ⏎
2013-05-12 14:35:42.176:INFO:oejs.Server:jetty-7.6.1.v20120215
2013-05-12 14:35:42.228:INFO:oejs.AbstractConnector:Started
SelectChannelConnector@0.0.0.0:3000
Started server on port 3000
```

Check if it works

```
λ curl localhost:3000
Hello World
λ curl localhost:3000/dummy
Not Found
```

## Routes with Compojure

Compojure is a routing library built on top of Ring. Routes are defined in
`handler.clj` using `defroutes` macro. This macro creates a Ring handler for
routes defined inside it. Each route consists of a method name (`GET`, `POST`,
...), a path, a list of arguments (which may be empty) and a response.

```
(defroutes app-routes
  (GET "/" [] "Hello World")
  (route/resources "/")
  (route/not-found "Not Found"))
```

In our example we have 3 routes. `route/resources` and `route/not-found`
are special routes, the 1st serves resources from the classpath and the 2nd
returns 404 for undefined route paths.


## Templates with Enlive

In the presentation layer we will use pure HTML files - no cutom templating
language, not even single 'staches. Data will be put into that
HTML using transformations defined with Enlive. This way the design will be kept
separated from the code that implements the behaviour for the display.

Add `enlive` as a project dependency in `project.clj`.

```
:dependencies [[org.clojure/clojure "1.5.1"]
               [compojure "1.1.5"]
               [enlive "1.1.1"]]
```

Create a template function inside `src/clojure_web_101/templates.clj`

```
(ns clojure-web-101.templates
  (:require [net.cgrand.enlive-html :refer [deftemplate content]]))

(deftemplate tpl-helloworld "public/helloworld.html"
  [value]
  [:#message] (content value))
```

Enlive provides a `deftemplate` macro which allows to specify a list of
elements along with their transformations for a given HTML file. In our example
we set the content of a tag with `message` identifier to a value passed to
the template definition as a parameter.

Last piece of the puzzle is the actual HTML file. Create it under
`resources/public` as `helloworld.html`.

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Clojure Web 101</title>
  </head>
  <body>
    <h1 id="message">Title goes here</h1>
  </body>
</html>
```

Finally, run it as follows

```
lein ring server-headless
2013-05-12 22:36:52.275:INFO:oejs.Server:jetty-7.6.1.v20120215
2013-05-12 22:36:52.364:INFO:oejs.AbstractConnector:Started
SelectChannelConnector@0.0.0.0:3000
Started server on port 3000
```

Go to `localhost:3000` to see the application in action.

## Summary

We just created a simple and flexible Clojure web application, built with
Compojure (routing) and Enlive (templating). It is highly performant out of the
box. We also nicely separated the presentation layer from the display logic. Our
view templates are pure HTML files without custom tags or decorated by
directives.


[1]: https://github.com/weavejester/compojure
[2]: https://github.com/cgrand/enlive
[3]: http://beebole.com/pure/
[4]: https://github.com/zaiste/clojure-web-101
[5]: http://zaiste.net/2012/08/clojure_app_101/
