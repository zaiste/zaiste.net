+++
title = "How To Validate A Phone Number in Dart"
[taxonomies]
topics = [ "Dart" ]
+++

```dart
String pattern = r'^(?:[+0][1-9])?[0-9]{10,12}$';
RegExp regExp = new RegExp(patttern);

regExp.hasMatch(value)
```

+ `^` beginning of a string
+ `(?:[+0][1-9])?` optionally match a `+` or `0` followed by a digit from `1` to `9`
+ `[0-9]{10,12}` match 10 to 12 digits
+ `$` end of the strin


