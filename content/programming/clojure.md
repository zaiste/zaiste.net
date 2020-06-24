
+++

+++
# Clojure

Clojure is a functional programming language for the Java Virtual Machine.

Clojure is entirely oriented around manipulating maps and lists.

Clojure has consistent standard library.

Most sequences and functions are lazy by default.

Clojure is not statically typed, but it has Spec.

Idiomatic Clojure is slow compared to SBCL-compiled Common Lisp.

## Threading Macro

This

```clj
(->> task
     :state
     (map :status)
     (every? #(= % "yes")))
```

is more readable than this:

```clj
(every? #(= % "yes") (map :status (:state task)))
```

## Data Structures

Clojure's immutable data structures (lists, vectors, maps and sets) are not copy on write. They're based on red-black trees: when you mutate the value, a new one is created that shares everything but the mutated part with the original.

## Identities

Identities change their (associated) values using transactions. There is no partial updates. In STM, this is done via swaps. Once a new value is constructed (e.g. adding a key-value pair to a hash), there is a transaction that only changes (atomically) the reference to that new value.

