
+++

+++
# How To Provide An Initial Value To A TextField Widget in Flutter

## When Using ```
undefined
```

If you use ```
undefined
```, set its ```
undefined
``` field to the desired value:

```dart 
TextEditingController myController = TextEditingController()..text = 'Your initial value';

TextField(
  controller: myController
  ...
)
```

## When Not Using ```
undefined
```

If you are not using the ```
undefined
```, use the ```
undefined
``` field directly from the ```
undefined
``` widget:

```dart 
TextFormField(
  initialValue: "I am smart"
)
```

