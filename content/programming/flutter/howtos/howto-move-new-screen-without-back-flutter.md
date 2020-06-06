+++
title = "How To Move To A New Screen Without Back Button in Flutter"
+++


Use `Navigator.pushReplacement`:

```dart
Navigator
  .of(context)
  .pushReplacement(MaterialPageRoute(builder: (BuildContext context) => page))
```

