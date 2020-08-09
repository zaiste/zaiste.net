+++
title = "Filter Lists in Dart"
[taxonomies]
topics = ["Dart"]
+++

Use `.where`:

```dart
var elements = ['one', 'two', 'three', 'four'];

elements.where((f) => f.startsWith('t')).toList();
```