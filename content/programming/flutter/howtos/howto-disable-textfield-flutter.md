+++
title = "How To Disable A `TextField` in Flutter"
[taxonomies]
topics = [ "Flutter", "Dart" ]
+++

Use the `enabled:` property of the `TextField` widget by setting it to `false`:

```dart
TextField(
  enabled: false,
  ...
)
```

This field won't respond to `onTap` events - it is similar to a disabled field in HTML.

Use `focusNode` and `enableInteractiveSelection` to make a TextField in Flutter
readonly so that it can respond to the `onTap` events:

```dart
TextField(
  focusNode: FocusNode(),
  enableInteractiveSelection: false,
  ...
)
```

