---
created_at: 2018-03-14
kind: article
publish: true
title: "Rails: Pass Parameters to ActiveModel Serializer"
tags:
- rails
- ruby
sitemap:
  priority: 0.8
abstract: >
  Use `@instance_options` to get parameters passed to ActiveModel serializers.
---

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