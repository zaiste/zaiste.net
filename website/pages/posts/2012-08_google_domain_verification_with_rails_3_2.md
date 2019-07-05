---
created_at: 2012-08-10
kind: article
publish: true
title: "Google Domain Verification with Rails 3.2"
tags:
- rails
- trick
---

Google offers domain verification by using a static HTML file with a special code
that
should be placed in the site’s root directory. While working with Rails you can
simply put this file inside `/public` directory and the framework won't be
checking controller actions. If a file exists at `#{Rails.root}/public/baz/bar.html`,
you can navigate to
`yourdomain.com/baz/bar.html` and the file will be rendered.

If you would like to use a URL that doesn't match a given file path, you have to
add a new route to `config/routes.rb`

```
# Routing /foo to display /public/baz/bar.html
match '/foo', to: redirect('/baz/bar.html')
```

From now accessing `yourdomain.com/foo/` will also render the same file.

If you find Google file uploading tedious, there is a simpler way: we can write a
route that maps required URL with a inline a Rack application.

```
match '/googleb74edef4a46cf19d.html',
  to: proc { |env| [200, {}, ["google-site-verification: googleb74edef4a46cf19d.html"]] }
```

You can also parametrize this code by adding a config entry inside `config/applicaiton.rb`
with a generated identifier.

```ruby config/application.rb
module MyApp
  class Application < Rails::Application
    config.google_verification = "googleb74edef4a46cf19d"
  end
end
```

```
match "/#{Rails.application.config.google_verification}.html",
  to: proc { |env| [200, {},
    ["google-site-verification:
    #{Rails.application.config.google_verification}.html"]] }¬
```

Let's test it:

```
rails c
Loading development environment (Rails 3.2.8)
irb(main):001:0> app.get '/googleb74edef4a46cf19d.html'
=> 200
irb(main):002:0> app.response.body
=> "google-site-verification: googleb74edef4a46cf19d.html"
```

It works like a charm.
