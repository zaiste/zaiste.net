
+++

+++
# How To Use Clojure.Spec for Functions

```clojure 
(defn int-to-digits
  [number]
  (str number))
```

Function specifications (or specs) are defined with ```
undefined
```.

```clojure 
(s/fdef int-to-digits
  :args (s/cat :number int?))
```

The function’s argument names and the keywords in the ```
undefined
``` spec don’t have to match, it’s position based.

The ```
undefined
``` function can be now used to assert the ```
undefined
``` spec:

```clojure 
(stest/instrument `int-to-digits)
```

The ```
undefined
``` spec can be used to provide a specification for the return value:

```clojure 
(s/fdef number-to-digits
  :args (s/cat :number int?)
  :ret (s/coll-of char? :kind set? :min-count 1))
```

The ```
undefined
``` spec can be checked with the ```
undefined
``` function.

```clojure 
(stest/check `number-to-digits)
```

