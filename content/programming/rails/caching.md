
+++

+++
# Rails Caching

Enable caching in the ```
undefined
```

```bash 
rails dev:cache
```

## Page Caching

Since Rails 4 Page Caching has been extracted to the ```
undefined
```.

In ```
undefined
```

```ruby 
config.action_controller.page_cache_directory = "#{Rails.root.to_s}/public/deploy"
```

Page caching is enabled per-action by using ```
undefined
``` method.

```ruby 
class PagesController < ApplicationController
  caches_page :index
end
```

## Action Caching

## Fragment Caching

## HTTP Caching

