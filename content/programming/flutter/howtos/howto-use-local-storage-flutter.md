+++
title = "How To Use Local Storage in Flutter"
+++

## Use the `shared_preferences` Plugin

Add `shared_preferences` as a dependency in your pubspec.yaml file:

```dart
SharedPreferences storage = await SharedPreferences.getInstance();
int counter = (storage.getInt('counter') ?? 0) + 1;

await storage.setInt('counter', counter);
```

## Use `SQLite`

## Use regular files

