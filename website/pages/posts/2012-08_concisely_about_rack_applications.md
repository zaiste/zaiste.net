---
created_at: 2012-08-23
kind: article
publish: true
title: "Concisely about Rack applications"
tags:
- ruby
- rack
---

[Rack][1] is a modular server interface for Ruby web applications. It unifies the API for web servers, web frameworks and middlewares. This post is a concise introduction to building basic Rack applications along with some useful tricks.

## Simplest Rack Application

Let's start with a simplest possible Rack application.

```
run lambda {|env| [200, {'Content-Type'  => 'text/plain'}, ["Hello, Zaiste!"]]}
```

We define here [a lambda expression][8] that returns three elements: a [numeric status][6], headers as a hash and (optional) body (as string for Ruby 1.8 and as array for Ruby 1.9). A [Rack application can be defined][2] as an object which responds to `#call` method. This method takes one argument `env` and it returns three mentioned elements. As `lambdas` also respond to `#call` method, the code above represents a Rack application and it will run without any issue.

## Running Rack Apps

We can run a Rack application using `rackup` command along with a special configuration file. By default `rackup` looks for a configuration file named `config.ru`, if you prefer to use a different name, you have to specify it as `rackup` command invocation parameter.

Let's run our application:

```
λ rackup &
>> Thin web server (v1.5.0 codename Knife)
>> Maximum connections set to 1024
>> Listening on 0.0.0.0:9292, CTRL+C to stop

λ curl http://localhost:9292
127.0.0.1 - - [01/Jan/1979 19:10:44] "GET / HTTP/1.1" 200 - 0.0008
Hello, Zaiste!
```

## Rack Apps as Ruby Objects

We can also write a Rack app using plain Ruby objects.

```
class RackApp
  def self.call(env)
    [200, {"Content-Type" => "text/plain"}, ["Hello, Zaiste!"]]
  end
end
```

Let's save this code as `lib/rack_app.rb` and put the following content into `config.ru`:

```
require 'rack_app'
run RackApp
```

To run it, we must add `-Ilib` parameter to `rackup` command.

```
λ rackup -Ilib &
```

Alternatively, we can run a Rack application just with `ruby` command, using either `Rack::Server` or `Rack::Handler`. Simply put one of following lines at the end of `rack_app.rb` file

```
Rack::Server.start app: RackApp
```

```
Rack::Handler::Thin.run RackApp
```

and run it as

```
λ ruby ./lib/rack_app.rb
>> Thin web server (v1.5.0 codename Knife)
>> Maximum connections set to 1024
>> Listening on 0.0.0.0:9292, CTRL+C to stop
```

## Handling Requests

Information carried by requests, come to Rack application through `env` parameter of `#call` method. [This gist][3] shows the structure and possible content of this parameter.

For example, if we want to submit some information through URL (so-called GET data: the part of URL after `?` sign), it will be stored in `env['QUERY_STRING']`.

```
curl http://localhost:9292/?foo=bar&baaz=none
```

```
{… "QUERY_STRING"=>"foo=bar&baaz=none", … }
```

Another example, an information from `REQUEST_PATH` could be used to implement a routing mechanism, i.e. triggering a specific action based on the local path of the requested resource from the request line.

## Abstracting Requests and Responses

So far we've seen how to handle request parameters by hand and build responses from scratch. [`Rack::Request`][4] and [`Rack::Response`][5] provide convenient abstractions around these two concepts. The former class helps to handle incoming information, wrapping `env` hash and the latter makes it easier to generate response triplets.

Let's wrap a `env` parameter with `Rack::Request`:

```
req = Rack::Request.new env
req.params # the union of GET and POST data
req.params['foo'] # specific user-data
req.post?   # a POST request ?
req.xhr?   # an AJAX request ?
req.params['baaz'] =  'something'
```

It is important to note that modifying `Rack::Request` instance also modifies underlying `env` hash.

Creating a response is similar, we can easily set headers, cookies or define a response status.

```
resp = Rack::Response.new
resp.write 'Hello, Zaiste!'
resp['X-Custom-Header'] = 'foo'
resp.set_cookie 'foo', 'bar'
resp.status = 200
resp.finish
```

Let's put it all together as a whole Rack application

```
class FancyRackApp
  def self.call(env)
    req = Rack::Request.new(env)
    case req.path
    when "/"
      Rack::Response.new("Hello, Zaiste!")
    when /^\/name\/(.*)/
      Rack::Response.new("Hello, #{$1}!")
    else
      Rack::Response.new("Not found", 404)
    end
  end
end
```

And below results:

```
λ curl http://localhost:9292/
127.0.0.1 - - [01/Jan/1979 19:10:44] "GET / HTTP/1.1" 200 - 0.0008
Hello, Zaiste!
```

```
λ curl http://localhost:9292/name/John
127.0.0.1 - - [01/Jan/1979 19:10:44] "GET / HTTP/1.1" 200 - 0.0008
Hello, John!
```

```
λ curl http://localhost:9292/crazy
127.0.0.1 - - [01/Jan/1979 19:10:44] "GET / HTTP/1.1" 404 - 0.0008
Not found
```

## Class vs Object

If you happen to instantiate a Rack object inside `config.ru`, it will be reused as long as Rack application runs. It means that the content of instance variables will be carried between requests if not set otherwise. It is a better idea to always define `#call` as a class method, i.e. pass in the class instead of an object inside `rackup` configuration file.

## Cascading Rack Apps

Rack::Cascade provides a way to combine Rack applications as a sequence. It takes an array of Rack applications as an argument. When a new request arrives, it will try to use the first Rack app in the array, if it gets a 404 response it will move to the next one.  Let's consider the following example:

```
require "rack_app"
run Rack::Cascade.new([Rack::File.new("public"), FancyRackApp])
```

The first app in our array is Rack::File, which serves static files from the directory provided as an argument. If there is a request for a file from `public` directory, Rack::File will try to look for it. If not found, Rack::Cascade will move execution to next application from the list.

## Rack Middleware

Rack middleware provides a way to implement a chained process execution for web applications. It's an implementation of [the pipeline design pattern][7]. It acts « in the middle » between the client and the server processing requests before they reach the server  and responses before they are returned to the client. Middlewares can be used for various purposes such as  managing user sessions, authentication or configuring static files access etc.

A Rack middleware has similar structure to Rack application, i.e. it responds to `#call`. Unlike Rack application, Rack middleware has an initializer that takes another Rack application or middleware as a parameter. In other words we can « wrap » a simple Rack application with a middleware, and then again, we can wrap the result with another middleware, and so on. As Rack middlewares have access to a passed in application, they can perform actions before or after they are passed to another Rack application.

The `use` keyword are used to define middlewares to instantiate, while by ‘run’ keyword designates a Rack application.

## Middleware Stack

`Rack::Builder` helps creating a middleware stack. It wraps one Rack middleware around another and then around given Rack application. Each object is instantiated with the next one, following in the stack as a parameter, creating a final Rack application.

```
app = Rack::Builder.new do
  use Rack::Etag           # Add an ETag
  use Rack::Deflator      # Compress
  run FancyRackApp     # User-defined logic
end
```

The code inside `rackup` configuration file is wrapped around with a `Rack::Builder` instance.

## Reloading

There is a handy Rack middleware which reloads the source of Rack application if it changed.

```
use Rack::Reloader, 0
run RackApp
```

The only problem is that it only reloads Ruby files. If you have dynamic templates, you can take a look at [rerun][9] gem

## Authentication

Another useful middleware is `Rack::Auth::Basic`. It can be used to protect our applications with [Basic HTTP authentication][10].

```
use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['admin', 'admin']
end
```

## Conclusion

[Rack][1] will help you better understand how HTTP protocol works and how popular Ruby frameworks like Rails make use of it. It is a good introduction to general mechanisms used in web applications.

[1]: https://github.com/rack/rack
[2]: http://rack.rubyforge.org/doc/SPEC.html
[3]: https://gist.github.com/4272713
[4]: http://rack.rubyforge.org/doc/classes/Rack/Request.html
[5]: http://rack.rubyforge.org/doc/classes/Rack/Response.html
[6]: http://httpstatusdogs.com/
[7]: http://www.cise.ufl.edu/research/ParallelPatterns/PatternLanguage/AlgorithmStructure/Pipeline.htm
[8]: http://en.wikipedia.org/wiki/Anonymous_function
[9]: https://github.com/alexch/rerun
[10]: http://en.wikipedia.org/wiki/Basic_access_authentication




