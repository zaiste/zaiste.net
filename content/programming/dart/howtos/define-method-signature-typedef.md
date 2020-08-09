+++
title = "Define a Method Signature with `typedef`"
[taxonomies]
topics = [ "Dart" ]
+++

```dart
typedef Comparison<T> = int Function(T a, T b);

class A<T> {
  Comparison<T> compare;
}
```
