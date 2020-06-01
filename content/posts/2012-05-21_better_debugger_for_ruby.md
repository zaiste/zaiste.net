
+++
date = 2012-05-21T00:00:00.000Z


title = "Better debugger for Ruby"
topics = [ "ruby", "debugging" ]

+++

`ruby-debug(19)` is pretty famous as an important, but unmaintained package that tend to cause a lot of problems. There are hundreds of solutions around the web how to handle it. The simplest solution, however, is to use a neat fork of `ruby-debug(19)`, simply called [`debugger`](https://github.com/cldwalker/debugger) which incorporates various fixes and works with Ruby 1.9.2 and 1.9.3.

To start using it, simply put the following line into your Gemfile, instead of `ruby-debug(19)`

```
gem 'debugger`
```

or just require it in your code and then start it

```
require 'debugger'
debugger
```
