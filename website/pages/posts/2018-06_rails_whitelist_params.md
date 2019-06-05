---
created_at: 2018-06-02
kind: article
publish: true
title: "Rails: Whitelist params"
tags:
- rails
sitemap:
  priority: 0.8
abstract: >
  Use `allowable` gem to integrate with Rails' ActionController::Parameters
---

There is a gem called [allowable](https://github.com/msimonborg/allowable) which extends `ActionController:Paramters` with additional methods to whitelist or blacklist `params` values.

```ruby
def model_params
  params.require(:model).permit(:status, :other_attribute)
    .allow(status: %w[pending accepted rejected])
end
```

The gem adds four methods to `Hash`: `#allow`, `#allow!`, `#forbid` and `#forbid!`.

```ruby
hash = { one: 'one', two: 'two' }

hash.forbid(one: 'one') # => { two: 'two' }
hash.allow(one: 'two') # => { two: 'two' }
hash.allow(one: ['one', 'two']) # => { one: 'one', two: 'two' }
hash.forbid(one: ['one', 'two']) # => { two: 'two' }
hash.allow!(one: 'two') # => { two: 'two' }
hash.forbid!(two: 'two') # => {}
```

With `String` keys:

```ruby
hash = { 'one' => 'one', 'two' => 'two' }

hash.forbid(one: 'one') # => { "one" => "one", "two" => "two" }
hash.forbid('one' => 'one') # => { "two" => "two" }
```