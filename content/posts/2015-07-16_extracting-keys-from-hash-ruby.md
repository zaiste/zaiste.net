+++
date = 2015-07-16T00:00:00.000Z
title = "Extracting specific keys from a hash in Ruby"
aliases = [
  "extracting_keys_from_hash_in_ruby"
]
[taxonomies]
topics = [ "Ruby" ]
+++

Let's take the following widget:

    widget = {
      id: 1,
      name: "Widget 1",
      description: "This is widget 1",
      created_at: "1992-10-01 12:21"
    }

In order to create a hash with a subset of keys from `widget` you can use select
method which comes from `Enumerable` mixin included (among others) in `Array`
and `Hash`.

```
keys_to_extract = [:id, :name]
widget.select { |key,_| keys_to_extract.include? key }
```

```
{
  id: 1,
  name: "Widget 1"
}
```

You can combine this with `map` to iterate over an array of hashes.

```
widgets = [
  {
    id: 1,
    name: "Widget 1",
    description: "This is widget 1",
    created_at: "1992-10-01 12:21"
  },
  {
    id: 2,
    name: "Widget 2",
    description: "This is widget 2",
    created_at: "1993-10-01 12:21"
  }
]
```

```
keys_to_extract = [:id, :name]
widgets.map do |w|
  w.select { |k,_| keys_to_extract.include? k }
end
```

```
[
  {
    id: 1,
    name: "Widget 1"
  },
  {
    id: 2,
    name: "Widget 2"
  }
]
```

This method can be also directly attached to any `Hash` instance using the
following snippet.

```
class Hash
  def select_keys(*args)
    select {|k,_| args.include? k }
  end
end
```
