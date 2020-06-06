
+++

+++
# How To Get A Random Model Record with ActiveRecord in Rails

In Rails 4+ with either Postgresql or SQLite by using `RANDOM()`:

```ruby
Model.order('RANDOM()').first
```

with MySQL:

```ruby
Model.order('RAND()').first
```

