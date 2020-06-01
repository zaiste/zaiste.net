
+++
date = 2015-06-04T00:00:00.000Z


title = "Rendering an ERB template with bindings from a hash"
topics = [ "ruby" ]

+++

Let's define an erb template

```
my_template = <<-EOF
My name is: <%= name %>
My interests are:
<% interests.each do |el| %>
- <%= el %>
<% end %>
EOF
```

Our goal is to render that templated from the following hash

```
my_hash = {
  name: "John",
  intersts: ["programming", "computers", "logic"]
}
```

We're going to use OpenStruct to create a proper binding and pass it to ERB instance.

```
require 'erb'
require 'ostruct'

def erb(template, vars)
  ERB.new(template).result(OpenStruct.new(vars).instance_eval { binding })
end

erb(my_template, my_hash)
```

Another approach is to inherit from OpenStruct and use its binding directly.

```
class ERBWithBinding < OpenStruct
  def self.render_from_hash(t, h)
    ERBWithBinding.new(h).render(t)
  end

  def render(template)
    ERB.new(template).result(binding)
  end
end

ERBWithBinding::render_from_hash(my_template, my_hash)
```
