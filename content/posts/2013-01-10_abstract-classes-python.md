+++
date = 2013-01-10T00:00:00.000Z
title = "Abstract Classes in Python"
aliases = [
    "abstract_classes_in_python"
]
[taxonomies]
topics = [ "Python" ]
+++

Before Python 2.6 there was no explicit way to declare [an abstract class][1]. It changed with the  `abc` ([Abstract Base Class][2]) module from the standard library.

## `abc` module

`abc` module allows to enforce that a derived class implements a particular method using a special `@abstractmethod` decorator on that method.

```
from abc import ABCMeta, abstractmethod

class Animal:
    __metaclass__ = ABCMeta

    @abstractmethod
    def say_something(self): pass

class Cat(Animal):
    def say_something(self):
        return "Miauuu!"
```

```
>>> a = Animal()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: Can't instantiate abstract class Animal with abstract methods say_something
```

An abstract method can also have an implementation, but it can only be invoked with `super` from a derived class.

```
class Animal:
    __metaclass__ = ABCMeta

    @abstractmethod
    def say_something(self):
          return "I'm an animal!"

class Cat(Animal):
    def say_something(self):
        s = super(Cat, self).say_something()
        return "%s - %s" % (s, "Miauuu")
```

```
>>> c = Cat()
>>> c.say_something()
"I'm an animal! - Miauuu"
```

There is more feautres provided by `abc` module, but they are less common in use
than these described in this post. For details check [the documentation][2].

## More Pythonic Approach?

Such explicit declaration provided by `abc` module may be considered not very *pythonic*.  Because of Python's dynamic nature there are few things being checked during compilation, and there is no advanced type checking at that stage. For that reason, we could declare an abstract method by just raising a `NotImplementedError`.

``` python
class Animal:

    def say_something(self):
        raise NotImplementedError()
```

Additionaly, a class could follow some naming conventions e.g. prefixing a class name with `Base` or `Abstract`.

## Summary

Despite additional complexity, I find `abc` module quite useful: it provides
a slightly efficient way to communicate the purpose of the code due to its
explicitness along with an better flexibility due to possible implementation
inside the abstract method.


[1]: http://en.wikipedia.org/wiki/Abstract_type
[2]: http://docs.python.org/2/library/abc.html
