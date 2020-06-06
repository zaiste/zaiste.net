+++
date = 2017-06-04T00:00:00.000Z
title = "Functions are methods in Ruby"
aliases = [
  "functions_are_methods_in_ruby"
]
[taxonomies]
topics = [ "Ruby" ]
+++

In Ruby it isn't possible to execute a piece of code that isn't defined on an object, because there is nothing in Ruby that is not an object - this way, strictly speaking, a concept of a function does not exist, there are only methods.

Methods in Ruby are defined using the reserved word `def`.

Blocks, Procs, Methods and Lambdas are variances of a function in Ruby. All functions in Ruby act (or can be made to act) like some variant of a Proc. lambdas in Ruby are objects of class Proc.  Proc objects don't belong to any object. They are called without binding them to an object.

```ruby
add = lambda { |a,b| a + b }
add = ->(a, b) { a + b }
```

Lambdas are like Procs, but with stricter argument passing and localised returns. Create a lambda which takes two arguments and returns the result of calling `+` on the first, with the second as its arguments.
In Ruby 1.9, the Proc class gained the method: `#curry`.

```ruby
plus_five = add.curry[5]
puts plus_five[8]
```

```ruby
plus_five = add.curry.(5)
puts plus_five.(8)
```

Blocks in Ruby are a special syntactic sugar to create Procs.

```ruby
def my_method
  yield if block_given?
end

my_method do
  puts 3 + 9
end # => 12
```

```ruby
def my_method(&block)
  block.class
end

my_method do
end # => Proc
```

```ruby
def my_method
  yield
end

my_method &proc { puts "Hello World!" } # => "Hello World!"
```

> Methods are a fundamental part of Ruby's syntax, but they are not values that Ruby programs can operate on. That is, Ruby's methods are not objects in the way that strings, numbers, and arrays are. It is possible, however, to obtain a Method object that represents a given method, and we can invoke methods indirectly through Method objects.

Methods are syntactic sugar for some variation of an underlying Proc.

```ruby
def executor
  yield
end

def greet
  "Hello World"
end

executor &method(:greet)
```

Lambdas and methods validate the arguments they receive while Procs do not: if you pass only one argument to a Lambda taking two arguments, you’ll get an `ArgumentError`. If you do the same to a Proc, it will accept it and set the rest of the arguments to `nil`. Any `return` statements used in a Proc will return from the method that called that Proc. Lambdas, on the other hand, will not - you can call a Lambda, get its return value, and process it, all within the one method.

Higher-order functions are functions that accept a function as an argument and/or return a function as the return value.

```ruby
def adder(a, b)
  lambda { a + b }
end

adder_fn = adder(5, 9)
adder_fn.call # => 14
```

Partial function aplication is calling a function with some number of arguments, in order to get a function back that will take that many less arguments. Currying is taking a function that takes n arguments, and splitting it into n functions that take one argument.


```ruby
apply_math = lambda do |fn, a, b|
  a.send(fn, b)
end

Result (best)

add = apply_math.curry.(:+)
subtract = apply_math.curry.(:-)
multiply = apply_math.curry.(:*)
divide = apply_math.curry.(:/)

add.(4, 7) # => 11

increment = add.curry.(1)
```
