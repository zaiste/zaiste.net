
+++
date = 2012-04-22T00:00:00.000Z


title = "Nifty enums for Rails apps"
topics = [ "rails" ]

[extra]
priority = 0.8

+++

Yesterday, when wondering about the best representation for enum, I came along a nifty gem called [symbolize](https://github.com/nofxx/symbolize). The gem introduces an easy way to use symbols for values of an attribute. It provides a dedicated method (`symbolize`) that allows to return a symbol as a value of an attribute that method is used for.

It can be done like so

<script src="https://gist.github.com/2462755.js?file=symbolize_gem.rb"></script>

Two options I found pretty cool are `scope` and `methods`.

Option `scope` (class)
----------------------

ActiveRecord flavour

    FooBar.great # => FooBar.all(conditions: { quux: :great })


Mongoid flavour

    FooBar.great # => FooBar.where({ quux: :great })


Scopes can be also chained.

    FooBar.great.cdr


Option `methods` (object)
-------------------------

It add fancy boolean methods to objects with enum.

    @foobar.great?

-

    @foobar.car?

So, wanna have cool enum inside your Rails app ? Check it on [GitHub](https://github.com/nofxx/symbolize).
