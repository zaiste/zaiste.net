
+++

+++
# Lisp

Scheme and Clojure are Lisp-1 which means that both variables and functions names are in the same namespace.

Common Lisp is Lisp-2 which means that functions and variables have different namespaces.

Lisp has lexical scoping and dynamic scoping.

## Binding

A binding made by `let` lasts until the end of the `let` form.

```lisp
(let ((a 1))
  (let ((a 2))
    (let ((a 3))
      (print a)) ;; 3
    (print a))   ;; 2
  (print a))     ;; 1
```

Function calls create bindings for their formal arguments when they are called:

```lisp
(defun foo (a)
  (let ((a 2)) (print a))  ;; 2
  (print a))               ;; 1
(foo 1)
```

A binding made by a function call lasts until the call returns.

A `let` expression can be seen as syntactic sugar for the lambda form:

```lisp
(let ((a 1)
      (b 3))
  (+ a b))
```

is equivalent to

```lisp
((lambda (a b) (+ a b)) 1 3)
```

```lisp
(let ((to_add 4))
  ((lambda (arg) (+ to_add arg)) 5))
```

: 9

