
+++

+++
# How To Disable A ```
undefined
``` in Flutter

Use the ```
undefined
``` property of the ```
undefined
``` widget by setting it to ```
undefined
```:

```dart 
TextField(
  enabled: false,
  ...
)
```

This field won't respond to ```
undefined
``` events - it is similar to a disabled field in HTML.

Use ```
undefined
``` and ```
undefined
``` to make a TextField in Flutter readonly so that it can respond to the ```
undefined
``` events:

```dart 
TextField(
  focusNode: FocusNode(),
  enableInteractiveSelection: false,
  ...
)
```

