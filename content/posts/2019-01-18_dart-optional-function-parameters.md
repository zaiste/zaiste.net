
+++
date = 2019-01-18T00:00:00.000Z
title = "Dart · Optional Function Parameters"
topics = [ "dart" ]
description = """
In Dart, there are two ways to specify optional parameters: they can be either positional or named.
"""

+++

In [Dart](https://www.dartlang.org/), there are two ways to specify optional
parameters: they can be either positional or named.

Optional parameters are parameters which don't have to be specified when calling
given function. Optional parameters must be declared *after* required parameters.
Additionally, optional parameters can have a default value, which is used once
the function invocation doesn't specify it.

## Positional Parameters in Dart

Square brackets `[]` are used to specify optional, positional parameters in Dart.

```dart
readFile(String name, [String mode, String charset = 'utf-8']) {
  // ...
}
```

For such declaration `name` is always required while `mode` and `charset` are
optional. Also, `charset` will default to `utf-8` if not specified. Those
parameters are positional, because you cannot omit `mode` if you want to specify
the file `charset`.

```dart
readFile('hello.dart');
readFile('hello.dart', 'w+');
readFile('hello.dart', 'w+', 'iso8859-1');
```

Additionally, the parameter names are specified and visible only at the level of
the function declaration. The function caller must know which position
corresponds to which parameter. This leads to a slightly less readable code.

## Named parameters in Dart

Curly brackets `{}` are used to specify optional, named parameters in Dart.

```dart
readFile(String name, {String mode, String charset = 'utf-8'}) {
  // empty
}
```

Named parameters are referenced by name, which means that they can be used
during the function invocation in an order different from the function
declaration.

```dart
readFile('hello.dart');
readFile('hello.dart', mode: 'w+');
readFile('hello.dart', charset: 'iso8859-1');
readFile('hello.dart', charset: 'iso8859-1', mode: 'w+');
readFile('hello.dart', mode: 'w+', charset: 'iso8859-1');
```
