+++
title = "Rails Caching"
[taxonomies]
topics = [ "Rails", "Ruby" ]
+++

Enable caching in the `development`

```bash
rails dev:cache
```

## Page Caching

Since Rails 4 Page Caching has been extracted to the `actionpack-page_caching`.

In `config/application.rb`:

```ruby
config.action_controller.page_cache_directory = "#{Rails.root.to_s}/public/deploy"
```

Page caching is enabled per-action by using `caches_page` method.

```ruby
class PagesController < ApplicationController
  caches_page :index
end
```

## Action Caching

## Fragment Caching

## HTTP Caching

