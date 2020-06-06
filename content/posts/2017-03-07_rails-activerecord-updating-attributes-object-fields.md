+++
date = 2017-03-07T00:00:00.000Z
title = "Rails ActiveRecord: Updating attributes (object fields)"
aliases = [
  "rails_activerecord_updating_attributes_object_fields"
]

[taxonomies]
topics = [ "Rails", "Ruby" ]
+++

Ruby provides write accessors to change attributes (another name for fields) of an object. Those accessors may be redefined.

```ruby
user.name = "Zaiste"
```

`name` will be marked as `dirty` and the change will not be persisted in the database. You can undo the change using `reload!` or persist the change in the database by calling `user.save`.

```ruby
user.write_attribute(:name, "Zaiste")
```

`write_attribute` is called by the attribute accessor i.e. `name=` from previous example. The change will not be persisted the database. This method can be to bypass this accessor when you need a special behaviour at the time of setting given attribute.

```ruby
def name=(new_name)
  write_attribute(:name, new_name.downcase)
end
```

You can change few attributes at once using `attributes` accessor or `assign_attributes` method.

```ruby
user.attributes = { name: "Zaiste", age: 21 }
user.assign_attributes { name: "Zaiste", age: 21 }
```

This won't persist changes in the database. Unspecified attributes won’t be changed.

Use `update_attribute` to change an attribute and persist it without running validations.

```ruby
user.update_attribute(:name, "Zaiste")
```

Use `update` to change an attribute, check the validations and persist the change if validations pass.

```ruby
user.update(name: "Zaiste")
```

You can find an object and update it with a one command using `update` as class method.

```ruby
User.update(111, name: "Zaiste")
```

The validations will be checked.

You can find and update several objects at once using `update` class method.

```ruby
User.update(
  [123,234,345],
  [
    { name: "Zaiste" },
    { name: "Józio", age: 7 },
    { name: "Francois", age: 18, city: "Paris"},
  ]
)
```

You can also update all objects at once using `update_all` class method.

```ruby
User.update_all(name: "Zaiste")
```

This method won’t check the validations.
