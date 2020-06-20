+++
title = "How To Provide An Initial Value To A TextField Widget in Flutter"
[taxonomies]
topics = [ "Flutter", "Dart" ]
+++

## When Using `TextEditingController`

If you use `TextEditingController`, set its `text` field to the desired value

```dart
TextEditingController myController = TextEditingController()..text = 'Your initial value';

TextField(
  controller: myController
  ...
)
```

## When Not Using `TextEditingController`

If you are not using the `TextEditingContller`, use the `initialValue` field
directly from the `TextField` widget:

```dart
TextFormField(
  initialValue: "I am smart"
)
```

