---
created_at: 2012-12-02
kind: article
publish: true
title: "Merging maps in Clojure"
tags:
- clojure 
---

There are several ways to merge maps in Clojure. 

```
(merge {:a 1} {:b 2})

{:a 1, :b 2}
```

```
(into {} '({:a 1} {:b 2}))

{:a 1, :b 2}
```

```
(reduce conj '({:a 1} {:b 2}))

{:a 1, :b 2}
```

`into` is more efficient than `reduce` because it uses transient collections.

```
(apply merge '({:a 1} {:b 2}))

{:a 1, :b 2}
```

If there is a key that is in multiple maps, then the value from the last map will end up in the combined map. 

```
(into {} '({:a 1} {:b 2} {:b 3}))

{:a 1, :b 3} 
```

`merge-with` allows to specify how to combine values for the same keys using a custom function. Here, we are using `+` function to simply sum up values for the same key.

```
(merge-with + {:a 1} {:b 2} {:b 3})

{:b 5, :a 1}
```

You can use `union` from `clojure.set` to merge sets of elements as shown below.

```
(use 'clojure.set)
(merge-with union
            {:a #{1 2 3}, :b #{4 5 6}}
            {:a #{2 3 11 22}, :c #{1 2 3}})

{:a #{1 22 3 2 11}, :b #{4 6 5}, :c #{1 3 2}}
```