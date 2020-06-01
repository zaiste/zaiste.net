+++
date = 2017-11-23T00:00:00.000Z


title = "Rails Built-in Configuration Mechanism"
topics = [ "rails", "configuration", "yaml" ]

+++

Rails 4.2+ has a built-in method to manage configuration as YAML files. There is no need for additional dependencies.

Create a YAML file into `config/` directory, e.g.: `config/redis.yml`.

```
production:
  host: 7.7.7.7
  port: 6789
development:
  host: localhost
  port: 1111
```

in `config/application.rb`:

```
# config/application.rb
module MyApp
  class Application < Rails::Application
    config.redis = config_for(:redis)
  end
end
```

`Rails.configuration.redis['port']` will be equal `6789` when `RAILS_ENV` is set to `production` and `1111` when `RAILS_ENV` is set to `development`. You can also define a `default` environement.

Optionally, you can assign `Rails.configuration` to `Settings` global variable for convenience (less characters).
