
+++
date = 2012-09-03T00:00:00.000Z


title = "Creating XML with Clojure"
topics = [ "clojure", "xml", "lisp" ]

+++

In this post I show how to easily create a XML file in [Clojure][1]. We will use [`clojure.data.xml`][2] library. It can transform XML documents directly into and from Clojure data structures. The library is *lazy* which in practice means that it can operate on large XML documents, i.e. files that don't fit into memory.

## Setup

Let's start by generating a new project with `lein`

```
lein new app clj-xml
```

`clojure.data.xml` replaces `clojure.contrib.lazy-xml` which is now deprecated.  If you are using Java 1.5, you will need to put `StAX`  inside `project.clj` as a dependency.

```
:dependencies [...
               [stax "1.2.0"]]
```

For Java 1.6 and higher no such change is needed.

## Building XML

Open `core.clj` and require `data.xml` as `xml`.

```
(ns clj-xml.core
  (:require [clojure.data.xml :as xml]))
```

For the purpose of this article, we will build an XML representing a list of books. XML nodes are  created using `element` function and then emitted on display as a string with `emit-str` function.

```
(def bookshelf
  (xml/element :books {}
               (xml/element :book {:author "Stuart Halloway"}
                            "Programming Clojure")
               (xml/element :book {:author "Christian Queinnec"}
                            "Lisp in Small Pieces")
               (xml/element :book {:author "Harold Abelson, Gerald Jay Sussman"}
                            "Structure and Interpretation of Computer Programs")))

(defn -main []
  (println (xml/emit-str bookshelf))
```

Once we run it, we should get

```
λ lein run
Compiling clj-xml.core
<?xml version="1.0" encoding="UTF-8"?><books><book author="Stuart Halloway">Programming
Clojure</book><book author="Christian Queinnec">Lisp in Small Pieces</book><book
author="Harold Abelson, Gerald Jay Sussman">Structure and Interpretation of Computer
Programs</book></books>
```

Let's now check if it's possible to transform emitted string back to previous Clojure representation.

```
(= bookshelf
  (let [input-xml (java.io.StringReader. (xml/emit-str bookshelf))]
    (xml/parse input-xml)))
```

It is also possible to represent XML elements with vectors (similar to Hiccup-like expressions).

```
(def bookshelf-as-sexp
  (xml/sexp-as-element
    [:books
     [:book {:author "Stuart Halloway"} "Programming Clojure"]
     [:book {:author "Christian Queinnec"} "Lisp in Small Pieces"]
     [:book {:author "Harold Abelson, Gerald Jay Sussman"}
       "Structure and Interpretation of Computer Programs"]]))
```

```
=> (= bookshelf bookshelf-as-sexp)
true
```

## Writing to File

XML representations can be also directly written to a file as string using `emit` function.

```
(with-open [out-file (java.io.OutputStreamWriter.
                        (java.io.FileOutputStream. "/tmp/output.xml") "UTF-8")]
  (xml/emit bookshelf out-file))
```

I'm not using `FileWriter` here as it doesn't allow to specify file encoding. `OutputStreamWriter`/`FileOutputSteram` provide more general and flexible solution.

## XML from Data Structures

Existing data structures can be easily transformed into corresponding `data.xml` representations. For example, let's say we have a following set of `private-books`:

```
(def private-books #{
  {:author "Stuart Halloway", :title "Programming Clojure"}
  {:author "Christian Queinnec", :title "Lisp in Small Pieces"}
  {:author "Harold Abelson, Gerald Jay Sussman",
   :title "Structure and Interpretation of Computer Programs"}})

```

We can easily create another bookshelf from it.

```
(defn bookshelf-from [data]
  (xml/element :books {}
               (reduce
                 (fn [books b]
                   (conj books (xml/element :book {:author (:author b)} (:title b))))
                 () data)))
```

## Summary

Creating XML documents with Clojure is both easy and convenient. This article shows basics  to get you started with XML in Clojure. Those two languages, however, are much more « related » that it may seem on the surface. If you are interested in that underlaying relation, be sure to check [Nature of Lisp][3].


[1]: http://clojure.org
[2]: https://github.com/clojure/data.xml
[3]: http://www.defmacro.org/ramblings/lisp.html





