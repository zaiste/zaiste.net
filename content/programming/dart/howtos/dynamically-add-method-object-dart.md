+++
title = "Dynamically Add Method to Objects in Dart"
[taxonomies]
topics = [ "Dart" ]
+++

Use `noSuchMethod()`

```dart
@proxy
class Widget {
  final methods = <Symbol, Function>{};

  noSuchMethod(Invocation i) {
    if (i.isMethod && methods.containsKey(i.memberName)) {
      return Function.apply(methods[i.memberName],
          i.positionalArguments, i.namedArguments);
    }
    return super.noSuchMethod(i);
  }
}
```

Create `Widget` instance and assign a function to `methods` mapping with a custom name, i.e. `welcome`

```dart
var widget = Widget();
widget.methods[#welcome] = () => print('Hello, Dart');
```

Invoke the `welcome` method on the `Widget` instance as you'd have done with regular methods

```dart
widget.welcome()
```