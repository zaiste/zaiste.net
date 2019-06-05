---
created_at: 2018-05-10
kind: article
publish: true
title: "Rails pluck to hash"
tags:
- rails
- ruby
sitemap:
  priority: 0.8
abstract: >
  In Rails, `pluck` is a shortcut to select one or more attributes. It returns an array, but there are different ways to return a hash as well. This article shows those methods.
---

In Rails, `pluck` is a shortcut to select one or more attributes
without loading the corresponding records just to filter out the selected
attributes. It returns an Array of attribute values.

```ruby
Person.pluck(:name)
# SELECT people.name FROM people
# => ["Zosia", "Basia", "Jurek"]
```

This is similar to the following, but `pluck` is much more performant

```ruby
Person.all.map { |p| p.slice(:id, :name) }
```

There is also `select` in ActiveRecord. It modifies the SQL `SELECT` statement
for the query so that only certain fields are retrieved. It doesn't return an
array, but a relation object. Thus, it's usually less performant than `pluck` as
it needs to instatiante those object.

```ruby
Person.select(:id,:name)
```

`.select` adds `id` into the hash even if it is not requested. This method
creates k `Person` objects after the SQL query result and then iterates them to
return the JSON.

`pluck` can be combined with `map` to create a hash between selected fields and
their values:

```ruby
Person.all.pluck(:id, :name).map { |id, name| { id: id, name: name } }
```

This method is more efficient than `select`. `pluck` only returns the selected
columns whereas the other solution returns all columns. Also, it does not
instantiate Person objects nor need to assign attributes to the models.

It is possible to make `pluck+map` method simpler by using spread operator along
with `zip` function

```ruby
attrs = %w(id name)
Person.pluck(*attrs).map { |p| attrs.zip(p).to_h }
```

Alternatively, `as_json` may be used to specify a subset of fields

```ruby
Person.all.as_json(only: [:id, :name])
```

Finally, there is [pluck_to_hash](https://github.com/girishso/pluck_to_hash) which extends ActiveRecord pluck to return array of hashes. It also
supports `Struct` via `pluck_to_struct` method.

```ruby
Post.limit(2).pluck_to_hash(:id, :title)
# => [{:id=>213, :title=>"foo"}, {:id=>214, :title=>"bar"}]
```

It also allows to alias fields

```ruby
User.pluck_to_hash(:id, 'created_at::date as custom_date', 'created_at::time as custom_time')
# => [{:id=>23, :custom_date=>Fri, 11 Jul 2014, :custom_time=>2000-01-01 07:54:36 UTC}]
```

In some contrived examples, `pluck_to_hash` is around `4x` faster than using
ActiveRecord's `select` and arount `8x` faster than `as_json` method. This may
be a good indication of improved performance in real world scenerios.
