
+++
date = 2014-04-05T00:00:00.000Z


title = "File uploads in a Clojure web application using Compojure"
topics = [ "clojure", "compojure" ]

+++

If you happen to build a Clojure web application, you will most probably use
[Compojure][1] somewhere along the stack. In this article I will show how easy
it is to implement a file upload endpoint using that library.

Let’s start by generating a basic Compojure application from a template

    lein new compojure fupload

Next, we need to add `POST` route inside `src/fupload/handler.clj`

    (POST "/upload"
       {{{tempfile :tempfile filename :filename} :file} :params :as params}
       (io/copy tempfile (io/file "resources" "public" filename))
       "Success")

A couple of things happen here, first we specify that a file should be passed
using a field named `file`. Once the request is issued, a ring handler
transforms its parameters to the following map:

    {:size 1234,
     :tempfile #<File /var/folders/hq/az8xf5d9zv7g4dvhli9nmr_c1000gn/T/ring-multipart-4366831661746413539.tmp>,
     :content-type application/text,
     :filename project.clj}

In route definition we immediately destruct that map by specifying we are only
interested in fields `tempfile` and `filename`.

Finally, we copy uploaded file to `resources/public` on the server using `clojure.java.io`
and we return “Success”. You have to add the following line in `src/fupload/handler.clj`
under `:require`.

    [clojure.java.io :as io]

Let’s check if it works. We could build a form with `file` field and proper, but
instead, for simplicity, we will simulate a file upload using `curl`
(a file can be referenced with `@` sign). In the following example we will try
to upload `project.clj` from the current directory:

    curl -XPOST -F file=@project.clj localhost:3000/upload
    Success

    head -n 2 resources/public/project.clj
    (defproject fupload "0.1.0-SNAPSHOT"
      :description "FIXME: write description"

[1]: https://github.com/weavejester/compojure
