+++
title = "Get a Random Model Record with ActiveRecord in Rails"
[taxonomies]
topics = [ "Rails", "Ruby" ]
+++

In Rails 4+ with either Postgresql or SQLite by using `RANDOM()`:

```rb
Model.order('RANDOM()').first
```

with MySQL:

```rb
Model.order('RAND()').first
```

