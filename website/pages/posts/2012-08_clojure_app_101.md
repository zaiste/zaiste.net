---
created_at: 2012-08-18
kind: article
publish: true
title: "Clojure App 101"
tags:
- clojure
- 101
---

If you are new to [Clojure][1], this post will quickly get you started.  You will create a
basic Clojure application and learn how to use [Leiningen][2], a tool which helps
to manage various tasks for Clojure projects, like creating them, managing
dependencies or executing the code.

[Installing Leiningen][3] is pretty straighforward. You have to download [this script][4]
(be sure to get the 2.x version) and make it accessible in your `$PATH`. Upon
the first run Leiningen bootstraps itself using that script.

Let's start with a most basic way of creating a Clojure project with Leiningen

```
λ lein new baaz
Generating a project called baaz based on the 'default' template.
To see other templates (app, lein plugin, etc), try `lein help new`.
```

This is our project file structure:

```
.
├── README.md
├── doc
│   └── intro.md
├── project.clj
├── src
│   └── baaz
│       └── core.clj
└── test
    └── baaz
        └── core_test.clj
```


Let's take a look at `src/baaz/core.clj`.

```
(ns baaz.core)

(defn foo
  "I don't do a whole lot."
  [x]
  (println x "Hello, World!"))
```

There is only one function defined. You can launch an interactive Clojure shell
(called REPL) using `lein repl` command. Notice that an attempt to call that
function will result in an error: *Unable to resolve symbol: foo in this context*.
The reason for that is `foo` being defined in a different namespace than the one being
loaded when REPL starts.

In order to make this project run on the command line through
Leiningen you must add to that file a special `-main` function.

```
(defn -main []
  (foo "Zaiste"))
```

Once added, you can run it as:

```
λ lein run -m baaz.core
Zaiste Hello, World!
```

If you don't want to include `-m` parameter for each run, you can
specify it inside `project.clj` using a `:main` parameter as shown below:

```
(defproject baaz "0.1.0"
  :main baaz.core
  :dependencies [[org.clojure/clojure "1.4.0"]])
```

Launching REPL with `:main` parameter defined will automatically switch to
`baaz.core` namespace, othwerwise default `user` namespace will be used.

Now, you know what happens while creating a barebone application with Leiningen.
You can speed up this process using one of predefined application templates
(you can also create your own template).

For example, there is a template called `app` which includes a `-main` definition
along with the necessary declaration inside `project.clj`. You can run this this
template as:

```
λ lein new app baaz
```

You have the basics now. Next step would be to read [more about Leiningen][5]
and its features.

[1]: http://clojure.org
[2]: http://github.com/technomancy/leiningen
[3]: https://github.com/technomancy/leiningen#installation
[4]: https://raw.github.com/technomancy/leiningen/preview/bin/lein
[5]: http://github.com/technomancy/leiningen/blob/master/doc/TUTORIAL.md
