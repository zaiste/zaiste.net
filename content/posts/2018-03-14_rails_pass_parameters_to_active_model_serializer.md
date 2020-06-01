
+++
date = 2018-03-14T00:00:00.000Z


title = "Rails: Pass Parameters to ActiveModel Serializer"
topics = [ "rails", "ruby" ]
description = """
Use `@instance_options` to get parameters passed to ActiveModel serializers.
"""

[extra]
priority = 0.8

+++

In `ActiveModel::Serializer` version `0.10+`, use `@instance_options` to read the parameters passed to a Active Model serializer.

Pass the parameter from an action in a controller:

```ruby
class SomeController < ApplicationController
  def action
    render json: @model, your_option_name: value
  end
end
```

Access the parameter's value inside the corresponding `ActiveModel` serializer:

```ruby
class ModelSerializer < ActiveModel::Serializer
  def some_method
    puts @instance_options[:your_option_name]
  end
end
```