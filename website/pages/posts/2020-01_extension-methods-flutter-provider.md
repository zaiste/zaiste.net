---
created_at: 2020-01-18
title: Using **Extension Methods** in **Flutter** for the **Provider** Lookup
publish: true
tags:
- Flutter
- Dart
---

Dart 2.7 adds the extension methods. This feature allows to add new members (not only methods) to existing types.

Extension methods can be invoked like regular methods even though they are just static functions. Note that you can define extension methods not only for instance methods, but also for operators, setters and getters (but not for fields). The more adapted name would be the extension members. The Dart team, however, decided to name this feature similarly to other programming languages so that it sounds more familiar.

Extension methods solve the issue of wrapping objects in order to augment the wrapped objects with additional features. In other words, this feature allows to simplify the use of helpers methods. Extension methods don't make regular wrappers, however. Writing `this` inside an extension method declaration refers to the object being wrapped and not the wrapping object. This is important as the extension methods syntax is somehow similar to the `class` or `mixin` syntax. Such definition could suggest that the `this` in the extension method declaration refers to itself - this is not true.

Without extension methods we need to wrap a string using the helper class method:

```dart
class Util {
  static String capitalize(String input) {
    return input.isEmpty ? input : (input[0].toUpperCase() + input.substring(1));
  }
}

void main() {
  print(Util.capitalize('The quick brown fox jumps over the lazy dog'));
}
```

With extension methods we can call our new method directly on the string value. Moreover, the method can be made available as a getter for convenience.

```dart
extension CapitalizeExtension on String {
  String get capitalize {
    return this.isEmpty ? this : (this[0].toUpperCase() + this.substring(1));
  }
}

void main() {
  print('The quick brown fox jumps over the lazy dog'.capitalize);
}
```

The compiler automatically wraps any `expression.method()` as `Extension(expression).method()` as long as the extension is accessible, applicable and there isn't already a member with the same name in that context.

In Flutter, we can use the extension methods to simplify the way of looking up the Provider data in the widget tree. Traditionally, we wrap the Flutter `context` using the `Provider.of<T>` , but since Dart 2.7 we can now define the following extension method:

```dart
extension MyExtension<T> on BuildContext {
  T provide<T>() => Provider.of<T>(this);
}
```

so that we can write:

```dart
context.provide<String>()
```

instead of:

```dart
Provider.of<String>(context)
```

We can invoke the Provider method directly on the Flutter `BuildContext`. We don't have access to this Flutter class, but using the extension methods, we can extend it to have such method available on the `context` variable.

---

In the following YouTube video, I'm refactoring a Flutter application to use extension methods on the `Provider` class to simplify the data lookup:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Zb2ThVYXE2E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you liked this article or the video, consider subscribing to [my YouTube channel](https://www.youtube.com/channel/UCzgkOWKcwy0uhYilE6bd1Lg/) and [my Dart & Flutter newsletter](https://landing.mailerlite.com/webforms/landing/p3m2y2).
