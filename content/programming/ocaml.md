
+++

+++
# OCaml

Ocaml 4.08 adds [binding operators](http://jobjo.github.io/2019/04/24/ocaml-has-some-new-shiny-syntax.html) which make functors applicatives, and monads more convenient to use. Those operators are similar to Haskell do-notation.

Ocaml 4.08 adds the `Fun`, `Option` and `Result` to the standard library.

## HTTP

-   [h2](https://github.com/anmonteiro/ocaml-h2) is an implementation of the HTTP/2 specification entirely in OCaml. It is based on the concepts in http/af, and therefore uses the Angstrom and Faraday libraries to implement the parsing and serialization layers of the HTTP/2 standard. It also preserves the same API as http/af wherever possible.
-   [http/af](https://github.com/inhabitedtype/httpaf) is a high-performance, memory-efficient, and scalable web server for OCaml. It implements the HTTP 1.1 specification with respect to parsing, serialization, and connection pipelining as a state machine that is agnostic to the underlying IO mechanism, and is therefore portable across many platform. It uses the Angstrom and Faraday libraries to implement the parsing and serialization layers of the HTTP standard, hence the name.

## Concurrency

-   [Lwt](https://ocsigen.org/lwt/4.1.0/manual/manual)
-   [Async](https://opensource.janestreet.com/async/)

## Editors

[Merlin](https://github.com/ocaml/merlin.git) provides autocompletion, jump to definition, type lookup and more. It also has support for Language Server Protocol.

