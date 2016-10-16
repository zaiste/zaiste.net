---
created_at: 2017-06-05 
kind: article
publish: false 
title: "Clojure Advantage"
tags:
- clojure
---

Clojure is a modern Lisp dialect running on the JVM. It has excellent support for functional, data-oriented programming with efficient immutable data structures at its core. 

ClojureScript achieves the same high performance as Clojure by relying on modern JavaScript engines coupled with the Google Closure library.

ClojureScript comes with efficient implementations of persistent immutable data structures (maps, vectors and lists) already integrated in the language. Immutable means that those data structures cannot be mutated and each change is represented as an entire copy of it. It's counterintuitive, but thanks to the structural sharing this approach is very efficient.

Clojure evolves relatively slowly and every new feature is added after a lot of careful design. Unlike most mainstream languages many important features of Clojure are developed as libraries, eg. core.async, core.typed, core.logic,
etc.

Functional programming encourages writing pure functions that are free of side-effects and always return the same value for a fixed set of explicit inputs. Pure functions are modular by definition, making them easier to reason about, test, and compose into more complex functions.

---

Fast iteration means building modular, simple and readable code with as few defects as possible.    

, which we find to be an incredibly powerful language for real-world software engineering.

* Java interoperability, portability, fast garbage collection
* dynamic, compact code with late binding
* macros
* multimethods
* functions written to sequence abstraction instead of to specific data structures
* Everything is immutable by default and mutability has several well chosen standard patterns to modify state in a safe way in an multithreaded environment
* Tail recursion is made explicit. Till there is proper support for tail recursion on the JVM this is probably the best compromise
* The clojure.spec library provides a degree of type-safety for nested data structures. 
* Clojure uses "protocols", which are a kind of interfaces, and encourages thinking in terms of protocols rather than in terms of classes with inheritance hierarchies
* a functional language with persistent data structures. Persistent data structures are effectively immutable, which makes them very attractive in a multi-threaded context
