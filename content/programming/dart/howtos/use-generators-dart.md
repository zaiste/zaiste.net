+++
title = "Use Generators in Dart"
[taxonomies]
topics = [ "Dart" ]
+++

In Dart, generators are functions that generate a sequence of values on-demand (lazy evaluation). Dart's generators can be synchronous and asynchronous. Synchronous generators return an `Iterable` while asynchronous ones return a `Stream`. Asynchronous generators allow for asynchronous operations in their bodies (i.e. operations invoked with the `await` keyword), something that cannot be done in synchronous ones. Generators in Dart can also be used recursively.

## Synchronous Generators

You can create a synchronous generator from a function using the `sync*` keyword:

```dart
Iterable<int> range(int num) sync* {
  while (num > 0) {
    yield --num;
  }
}

void main() {
  for (int value in range(10)) {
    print(value);
  }
}
```

## Asynchronous Generators

You can create a asynchronous generator from a function using the `async*` keyword:

```dart
Stream<int> range(int num) async* {
  while (num > 0) {
    yield --num;
  }
}

void main() {
  range(10).listen((value) => print(value));
}
```

## Recursive Generators

You can make generators recursive by using the `yield*` on the recursive function invocation:

```dart
Iterable<int> range(int num) sync* {
  if (num > 0) {
    yield --num;
    yield* range(num);
  }
}
```