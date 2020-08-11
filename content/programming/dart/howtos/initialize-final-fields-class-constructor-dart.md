+++
title = "Initialize `final` Fields of a Class in Dart"
[taxonomies]
topics = [ "Dart" ]
+++


```dart
class Point {
  final num x;
  final num y;
  final num distanceFromOrigin;

  Point(this.x, this.y)
      : distanceFromOrigin = sqrt(pow(x, 2) + pow(y, 2));
}
```
