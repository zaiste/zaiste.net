+++
title = "Ruby"
[extra]
howtos = true
+++

# Ruby

## Oneliners

```bash
ruby -ne 'print if /^[RS]/' file.txt
```

## Create a Gem

```bash
bundle gem mygem

├── Gemfile
├── LICENSE.txt
├── README.md
├── Rakefile
├── mygem.gemspec
└── lib
    ├── mygem
    │   └── version.rb
    └── mygem.rb
```

```rb
spec.add_dependency "http"
```

```bash
gem build mygem.gemspec
```

https&#x3A;//techandfi.com/how-to-create-a-ruby-gem/ https&#x3A;//quickleft.com/blog/wrapping-your-api-in-a-custom-ruby-gem/ https&#x3A;//bundler.io/v1.13/guides/creating_gem

## Howtos

-   [How to Convert an Array of Hashes into a Hash](@/programming/ruby/howtos/howto-convert-array-of-hashes-hash-ruby.md)
-   [How to Upgrade Rubygems](@/programming/ruby/howtos/howto-upgrade-rubygems.md)

### How To Chain Method Invocation

```rb
user.profile.settings.newsletter

# vs

['profile', 'settings', 'newsletter'].inject(user, :try)
```

