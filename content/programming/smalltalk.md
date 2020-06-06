
+++

+++
# Smalltalk

Smalltalk is an object-oriented, dynamically typed reflective programming language.

## If Statement

In Smalltalk, booleans (`True`/`False`) are objects (instances of the abstract
`Boolean` class). Every boolean has the type `True` or `False`, and no instance
data; it also has the `ifTrue:` and `ifFalse:` functions. Those functions take a
block of code as input. `True` overrides the `ifTrue:` function so that it
always runs the code provied as input while `ifFalse:` does nothing. The same
goes for `False` which overrides these two functions, but in reverse.

What other languages do with special syntax, Smalltalk does as a special case of method dispatching.

