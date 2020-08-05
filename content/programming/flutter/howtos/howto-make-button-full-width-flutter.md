+++
title = "Make A Button Full Width in Flutter"
[taxonomies]
topics = [ "Flutter", "Dart" ]
+++


Use the `SizedBox` widget, which enforces the child to match its parent size:

```dart
SizedBox.expand(
  child: new RaisedButton(...),
)
```

Using the `width` or `height` it only limits the streching in particular axis:

```dart
SizedBox(
  width: double.infinity,
  child: RaisedButton(...),
)
```