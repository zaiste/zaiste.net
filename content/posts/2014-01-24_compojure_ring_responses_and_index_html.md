
+++
date = 2014-01-24T00:00:00.000Z


title = "Compojure, Ring responses and index.html"
topics = [ "clojure", "web" ]

+++

In [Compojure][1], if you want to display a static file from `resource/public`,
you can either redirect to that file or serve it as a resource response using
functions provided by [ring-core][2] library via `ring.util.response`.

Let’s consider the following application:

```
(ns example.core
  (:use ring.util.response)
  (:require [compojure.handler :as handler]
            [compojure.route :as route]
            [compojure.core :refer [GET POST defroutes]]))

(defroutes app-routes
  (GET "/" [] ...)
  (route/resources "/")
  (route/not-found "Page not found"))

(def app
  (handler/api app-routes))
```

In the case of the redirect, you should replace `…` by the following line

```
(redirect “index.html”)
```

With this approach `index.html` will be part of the URL. If you prefer not to
display `index.html` as a part of the URL while serving it to the user, you
should use `resource-response` function i.e.

```
(resource-response "index.html" {:root "public"})
```

This function serves files found on the classpath - it means it will also work
for the uberjar which is not true for `file-resource` function.

It's `public` as opposed to `resources/public`, because resources is one of
the top-level directories included in the uberjar.


[1]: https://github.com/weavejester/compojure
[2]: https://github.com/ring-clojure/ring
