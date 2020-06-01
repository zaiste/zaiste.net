
+++
date = 2015-05-02T00:00:00.000Z


title = "Functions in Clojure"
topics = [ "clojure" ]

+++

Clojure is a functional programming language, thus functions are an
important element of the language. Functions can be assigned to locals,
passed between functions or returned from functions.

Functions are invoked by placing its name at the first position of the
list.

```
(str "Foo" "Bar")
```

Alternatively, `apply` can be used, usually necessary when invoking
variadic functions or when the list of a function arguments is passed in
as a collection.

```
(apply str ["asdf" "assdf"])
```

Functions can be anonymous or named. Ananonymous functions are defined
using `fn` special form or using `#` reader macro (use it sparingly).

```
(fn [a b]
  (+ a b))
```

```
#(+ %1 %2)
```

Named functions are defined using `defn` macro.

```
(defn foo [x]
  "Just a function"
  (println x "Boo"))
```

Functions can have multiple arities.

```
(defn foo
  ([a]
    (foo a 100))
  ([a b]
    (+ a b)))
```

Function arguments can be destructured, it can be done through positional
or map destructuring.

```
(defn name
  [[first last]]
  last)

(name ["Joe" "Doe"])
```

```
(defn name
  [{last :last}]
  last)

(name {:first "Joe" :last "Doe"})
```

```
(defn name
  [{:keys [first last]}]
  last)

(name {:first "Joe" :last "Doe"})
```

Functions can be variadic, i.e. they can take varying number of arguments.

```
(str "1" "2" "3" "4")
(str "1" "2" "3")
```

To define a variadic function, prefix optional arguments with `&`.

```
(defn foo
  [a & bs]
  (println "bs:" bs))
```

Functions can have named parameters, it's done through the use of
destructuring a variadic function.

```
(defn contact
  [& {:keys [name phone address] :or {phone "NA" address "NA"}}]
  (if name
    [name phone address]
    (println "No name specified")))

(contact :name "Zaiste" :phone "666-66-66")
```

Without the use of a variadic argument list, you would have to call
the function with a single map argument.

Higher-order functions (HOFs) are functions that take other functions
as arguments.

```
(filter odd? (range 0 20))

(filter #(< % 10) (range 0 20))
```

Keywords, maps and sets can be used as functions. Keywords take a map
and look themselves up in it.

```
(:last {:name "Joe" :last "Doe"})
```

Maps and sets take a key and look up a value for it.

```
({:name "Joe" :last "Doe"} :last)

(#{1 2 3 4} 3)
```
