---
created_at: 2011-02-11
kind: article
publish: true
title: "Ruby Hash to Object with OpenStruct and JSON"
tags:
- ruby
sitemap:
  priority: 0.6
---

In Ruby you can convert a hash into an object using OpenStruct from the Ruby Standard Library. There is a substantial overhead when creating OpenStruct. While it may seem more convenient, it will decrease your application performance if there are many such objects being created.

```
require 'ostruct'

h = { foo: 1, bar: 2 }
obj = OpenStruct.new(h)

obj.foo   # => 1
```

To convert an OpenStruct object back to a hash use `.marshal_dump` method. Since Ruby 2.0 there's also a `.to_h` method.

```
obj.marshal_dump   # => {:foo=>1, :bar=>2}
```

```
obj.to_h           # => {:foo=>1, :bar=>2}
```

For given hash, OpenStruct constructor only converts its top level keys.

```
require 'ostruct'

h = { foo: { bar: 1 } }
obj = OpenStruct.new(h)
obj.foo       # => { bar: 1}
obj.foo.bar   # => NoMethodError: undefined method `bar' for {:bar=>1}:Hash
```

We can combine OpenStruct with JSON to convert nested keys as well.

```
require 'ostruct'
require 'json'

h = { foo: { bar: 1 } }

obj = JSON.parse(h.to_json, object_class: OpenStruct)
obj.foo       # => #<OpenStruct bar=1>
obj.foo.bar   # => 1
```

You can now monkey-patch `Hash` object as follows:

```
class Hash
  def to_o
    JSON.parse to_json, object_class: OpenStruct
  end
end

h = { foo: { bar: 1 } }
h.to_o.foo.bar   # => 1
```
