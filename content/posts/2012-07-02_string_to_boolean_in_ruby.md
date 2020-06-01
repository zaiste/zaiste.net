
+++
date = 2012-07-02T00:00:00.000Z


title = "String to Boolean in Ruby"
topics = [ "ruby", "trick" ]

+++

When parsing data you may end up with string representations of various
data types. For example, Boolean value might be represented as `"true"`,
`"t"`, `"yes"`, `"y"` or `"1"`.

In order to resolve that problem with Ruby I chosed to do a quick hack. The following
code adds new behaviour to `String` class. Such approach is called
[Monkey Patching](http://en.wikipedia.org/wiki/Monkey_patch). It should be used
with caution as it can result in hard to track down errors.

```ruby
class String
  def to_bool
    return true if self =~ (/^(true|t|yes|y|1)$/i)
    return false if self.empty? || self =~ (/^(false|f|no|n|0)$/i)

    raise ArgumentError.new "invalid value: #{self}"
  end
end
```

To make it work with Rails you should add this snippet as a initializer inside
`config` / `initializers` directory.
