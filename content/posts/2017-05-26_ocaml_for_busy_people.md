
+++
date = 2017-05-26T00:00:00.000Z


title = "OCaml for busy people"
topics = [ "ocaml", "ml", "programming", "101" ]

+++

[OCaml](ocaml.org) is an industrial strength, general purpose programming language with an emphasis on expressiveness and safety. It is a multi-paradigm language which unifies functional, imperative and object-oriented programming under an ML-like type system. OCaml was created 20 years ago at INIRIA. Check [What is OCaml at ocaml.org](https://ocaml.org/learn/description.html).

OCaml syntax is said to be pragmatic, but often critisized as not being visually appealing enough with people pointing to Haskell or Standard ML as better alternatives in that regard. For many it feels like someone invented certain syntax constructs along the way as they were needed and without a cohesive plan.

OCaml does not support parallelism via multi-threading, i.e. there is no support for multi-core. For the concurrent, IO-bound code you can use various concurrency approaches such as coroutines, green threads or callbacks. In such case, multiple threads are not efficient in the relation to memory. Multiple threads are viable for CPU-bound and/or long-running code. OCaml (similar to Python) has a global interpreter lock, so multiprocessing is the only available solution.

For ad-hoc polymorphism, OCaml provides overloading, type classes and modular implicits. Overloading is usually not supposed to be used (OCaml have a polymorphic comparison operators).

Some basic types such as int16, float32, unicode are missing.

There is no JIT compiler in OCaml. Instead, it provides incompatible compilers that either batch compile to native code or interpret bytecode.

OCaml allows to write web applications.

There are two OCaml to JavaScript compilers: [js_of_ocaml]( https://github.com/ocsigen/js_of_ocaml) and [bucklescript](http://bucklescript.github.io/bucklescript/).

There is no IDE for OCaml, getting autocompletion to work may be tricky and there's no integrated documentation.

For more check [OCaml for Web Programming](https://github.com/dannywillems/ocaml-for-web-programming) and [Awesome OCaml](https://github.com/rizo/awesome-ocaml#web-development).


