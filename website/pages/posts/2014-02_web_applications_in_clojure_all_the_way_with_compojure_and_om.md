---
created_at: 2014-02-07
kind: article
publish: true
title: "Web applications in Clojure all the way (with Compojure & Om)"
---

Today we are going to build a web application that primarily uses Clojure programming language. On the backend there will be a simple API written in [Compojure][4] that produces data in JSON format; on the frontend we will use [Om][1]: a ClojureScript interface for [Facebook’s React][2].

You can automatically generate the application from this tutorial using a Leiningen template called [atw-om][5].

**Update 2014-12** Updated dependencies: Om `0.7.3`, React `0.11.1`, Clojure `1.6.0` and Compojure `1.2.2`.

**Update 2015-03** Updated dependencies: Om `0.8.8`, React `0.12.2`, Clojure `1.7.0-alpha5` and Compojure `1.3.2`. Removed deprecated `compojure.handler` namespace in favor of [ring-defaults][6] (sensible Ring middleware defaults). 

## Backend

Let’s start by generating a Compojure application.

```
lein new compojure acme
```

We need to adjust dependencies in `project.clj`.

```
:dependencies [[org.clojure/clojure "1.7.0-alpha5"]
               [compojure "1.3.2"]
               [ring/ring-core "1.3.2"]
               [ring/ring-json "0.3.1”]
               [ring/ring-defaults "0.1.4"]]
```


Next, extend the namespace declaration in `src/acme/handler.clj`.

```
(ns acme.handler
  (:require [compojure.route :as route]
            [compojure.core :refer [GET defroutes]]
            [ring.util.response :refer [resource-response response]]
            [ring.middleware.json :as middleware]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]]))
```

Now, we can define two routes: `/` and `/widgets`.

```
(defroutes app-routes
  (GET  "/" [] (resource-response "index.html" {:root "public"}))
  (GET  "/widgets" [] (response [{:name "Widget 1"} {:name "Widget 2"}]))
  (route/resources "/")
  (route/not-found "Page not found"))
```

The first will serve `index.html` located in `resources/public/`; the second route will produce a list of two widgets and return it in JSON format.

For the JSON serialization to work we have to adjust `app` declaration by wrapping `wrap-json-response` middleware around the route handler.

```
(def app
  (-> app-routes
      (middleware/wrap-json-body)
      (middleware/wrap-json-response)
      (wrap-defaults api-defaults)))
```

`wrap-json-body` is an equivalent of `wrap-json-response` but it’s for requests.. I’m adding it here for convenience. It comes handy once you need to automatically deserialize the incoming data i.e. from `POST` request.

Finally, we need to put `index.html` in `resources/public`.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css" />
  </head>
  <body>
    <div class="row">
      <div class="large-12 columns">
        <h1>Acme Corp.</h1>
        <div id="content"></div>
      </div>
    </div>
  </body>
</html>
```

Try to run the application.

```
lein ring server-headless
```

Then open `localhost:3000` in your browser and check if both `/` and `/widgets` work.

## Frontend

We want to have Clojure backend and frontend live side-by-side in one project. For that we need to slightly adjust the directory structure. Inside `src/`, create two directories `clj/` (for backend code) and `cljs/` (for frontend code), then move `src/acme` to `src/clj` so it’s under `src/clj/acme`. Under `cljs/` create an empty directory `acme/` and put there an empty `core.cljs` file.

In `project.clj` add `:source-paths`.

```
(defproject acme "0.1.0-SNAPSHOT”
  ...
  :source-paths ["src/clj”])
```

Now we need to update `project.clj` with things related to the frontend development. Let’s start with dependencies.

```
:dependencies [[org.clojure/clojure "1.6.0"]
               [org.clojure/tools.reader "0.8.4"]
               [ring/ring-core "1.3.2"]
               [ring/ring-json "0.3.1"]
               [compojure "1.2.2"]
               [org.clojure/clojurescript "0.0-2371"]
               [org.clojure/core.async "0.1.346.0-17112a-alpha"]
               [cljs-http "0.1.21"]
               [om "0.7.3"]]
```

Then, `:plugins`

```
:plugins [[lein-cljsbuild "1.0.3"]
          [lein-ring "0.8.13"]
          [lein-pdo "0.1.1"]]
```

`lein-cljsbuild` for on-the-fly ClojureScript compilation and `lein-pdo` to simplify the process of running the app by combining frontend files compilation with the backend server launch. This is defined using `:alias`.

```
:aliases {"up" ["pdo" "cljsbuild" "auto" "dev," "ring" "server-headless"]}
```

Lastly, we have to specify ClojureScript compilation parameters using `:cljsbuild`.

```
:cljsbuild {:builds [{:id "dev"
                      :source-paths ["src/cljs"]
                      :compiler {:output-to "resources/public/js/app.js"
                                 :output-dir "resources/public/js/out"
                                 :optimizations :none
                                 :source-map true}}]}
```

Now, we are ready to build the frontend logic that displays the list of widgets. From now on, all modifications concern `src/cljs/core.cljs`.

Let’s start with namespace declaration.

```
(ns acme.core
  (:require-macros [cljs.core.async.macros :refer [go alt!]])
  (:require [goog.events :as events]
            [cljs.core.async :refer [put! <! >! chan timeout]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs-http.client :as http]))
```

Then, we enable printing on the console with:

```
(enable-console-print!)
```

Let’s try to communicate with the API by fetching available widgets from `/widgets`. The code uses `core.async` to asynchronously fetch data from a given URL and then, when available, it puts it it into a channel.

```
(defn fetch-widgets
  [url]
  (let [c (chan)]
    (go (let [{widgets :body} (<! (http/get url))]
          (>! c (vec widgets))))
    c))
```

Now we are ready to start with Om. Let’s define the root of the application (attached to `#content`).

```
(om/root app-state om-app (.getElementById js/document "content"))
```

We define Om application (`om-app`) as a component that wraps a widget box inside a `div`. This should be declared before `(om/root ...)`.

```
(defn om-app [app owner]
  (om/component
   (dom/div nil
            (om/build widget-box app
                      {:opts {:url "/widgets"
                              :poll-interval 2000}}))))
```

`widget-box` is a more complicated component. It has a state created by consuming `/widgets` route on the backend. It renders a title and then a list of available widgets. This should be declared before `(defn om-app …)`.

```
(defn widget-box [app owner opts]
  (reify
    om/IWillMount
    (will-mount [_]
                (om/transact! app [:widgets] (fn [] []))
                (go (while true
                      (let [widgets (<! (fetch-widgets (:url opts)))]
                        (.log js/console (pr-str widgets))
                        (om/update! app #(assoc % :widgets widgets)))
                      (<! (timeout (:poll-interval opts))))))
    om/IRender
    (render [_]
            (dom/h1 nil "Widgets")
            (om/build widget-list app))))
```

`widget-list` is again a simple component that defines a list using `ul` tag and then asks `widget` component to display a name for each of them from the list using `li` tag. Those two components must be declared before `(defn widget-box …)`.

```
(defn widget [{:keys [name]} owner opts]
  (om/component
   (dom/li nil name)))


(defn widget-list [{:keys [widgets]}]
  (om/component
   (apply dom/ul nil
          (om/build-all widget widgets))))
```

Finally, we initialize `app-state` as an atom with an empty map; put it before `(om/root …)` declaration.

```
(def app-state
  (atom {}))
```

The very last thing is to specify in `index.html` our script `app.js` (compiled to JavaScript) along with necessary dependencies.

```
<script src="http://fb.me/react-0.11.1.js"></script>
<script src="js/out/goog/base.js" type="text/javascript"></script>
<script src="js/app.js" type="text/javascript"></script>
<script type="text/javascript">goog.require("acme.core");</script>
```

Those `<script>` declarations should be put just before closing `</body>`.

Run `lein up`, wait till ClojureScript is successfully compiled and open `localhost:3000` in your browser. You should see a list of available widgets from Acme Corp.

## Summary

We have just built a very simple web application entirely in Clojure. Our backend uses [Compojure][4], which makes it small and easy to understand. The frontend consumes `/widgets` in JSON format. [core.async][3] simplifies the communication, it’s either available data or timeout after 2000 milliseconds. Finally, [Om][1] helps us to build user interfaces in flexible way and using functional approach

[1]: https://github.com/swannodette/om
[2]: http://facebook.github.io/react/
[3]: https://github.com/clojure/core.async
[4]: https://github.com/weavejester/compojure
[5]: https://github.com/zaiste/atw-om
[6]: https://github.com/ring-clojure/ring-defaults


