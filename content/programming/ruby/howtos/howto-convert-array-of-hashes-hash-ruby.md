+++
+++

# How To Convert An Array Of Hashes Into A Hash in Ruby

To convert:

```ruby
arr = [{a: 1}, {b: 2}, {c: 3}]
```

into:

```ruby
h = { a: 1, b: 2, c: 3 }
```

## Method 1: Use the `reduce` method

Use the `reduce` method along with the `merge` method:

```ruby
arr = [{a: 1}, {b: 2}, {c: 3}]
arr.reduce({}, :merge)
```

```
| :a=>1 | :b=>2 | :c=>3 |
```

## Method 2: Use the `inject` method

Use the `inject` method along with the `merge` method:

```ruby
arr = [{a: 1}, {b: 2}, {c: 3}]
arr.inject(:merge)
```

```
| :a=>1 | :b=>2 | :c=>3 |
```

`Hash#merge` creates a new hash on each iteration. For bigger arrays, it is more
performant to use `Hash#merge!`/`Hash#update`.
