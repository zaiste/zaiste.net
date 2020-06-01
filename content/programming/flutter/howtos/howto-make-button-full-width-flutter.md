
+++

+++
# How To Make A Button Full Width in Flutter

Use the ```
undefined
``` widget, which enforces the child to match its parent size:

```dart 
SizedBox.expand(
  child: new RaisedButton(...),
)
```

Using the ```
undefined
``` or ```
undefined
``` it only limits the streching in particular axis:

```dart 
SizedBox(
  width: double.infinity,
  child: RaisedButton(...),
)
```

