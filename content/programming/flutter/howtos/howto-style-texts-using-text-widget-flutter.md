+++
title = "How To Style Texts using the `Text` widget in Flutter"
[taxonomies]
topics = [ "Flutter", "Dart" ]
+++


```dart
Text(
  'Styling text in Flutter',
  style: TextStyle(
    fontSize: 30.0,
    color: Colors.green,
    background: Paint(color: Colors.red),
    fontWeight: FontWeight.bold,
    shadows: [
      Shadow(
        blurRadius: 10.0,
        color: Colors.blue,
        offset: Offset(5.0, 5.0),
      ),
      Shadow(
        color: Colors.red,
        blurRadius: 10.0,
        offset: Offset(-5.0, 5.0),
      ),
    ],
    decoration: TextDecoration.underline,
    decorationColor: Colors.black,
    decorationStyle: TextDecorationStyle.solid,
    letterSpacing: -1.0,
    wordSpacing: 5.0,
    fontFamily: 'YourCustomFont',
  )
);
```
For the custom font (using the `fontFamily`) put the font file in the `assets/` directory and register it in `pubspec.yml`:

```yaml
flutter:
  fonts:
  - family: YourCustomFont
    fonts:
    - asset: assets/custom_font.ttf
```

