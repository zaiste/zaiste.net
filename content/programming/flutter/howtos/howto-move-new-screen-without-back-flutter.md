
+++

+++
# How To Move To A New Screen Without Back Button in Flutter

Use ```
undefined
```:

```dart 
Navigator
  .of(context)
  .pushReplacement(MaterialPageRoute(builder: (BuildContext context) => page))
```

