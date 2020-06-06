+++
date = 2019-01-08T00:00:00.000Z
title = "Flutter · Validating Forms"
abstract = ""
aliases = [
  "flutter_validating_forms"
]
[taxonomies]
topics = [ "Flutter", "Dart" ]
[extra]
priority = 0.8
+++

Flutter's `Form` widget is similar to a `<form>` tag in HTML: it groups form
fields together to conveniently validate them and to save their content.

`Form` widget can contain multipe `FormField` widgets, specifically they can be
`TextFormField` widgets for text fields.

```dart
final key = GlobalKey<FormState>();
String _name;
...
Form(
  key: key,
  child: TextFormField(
    decoration: InputDecoration(labelText: 'Name'),
    validator: (value) => value.isEmpty ? '`Name` field cannot be empty.' : null,
    onSaved: (value) => _name = value,
  ),
);
```

`validator` parameter specifies a function that receives the current value of
given field once the `#validate` (inherited from `FormField`) is invoked. The
function should return `null` if the field is valid, and an error string
otherwise.

`onSaved` parameter specifies a function that receives the current value of
given field once the `#save` (inherited from `FormField`) is invoked. The
function is usually used to store form's transient values in variables.

`key` is an unique identifier that allows to reference the widget, for example,
to invoke its state `#validate` or `#save` methods.

```dart
RaisedButton(
  onPressed: () {
    final form = key.currentState;

    if (form.validate()) {
      form.save();

      // ...
    }
  },
  child: Text('Submit Form'),
)
```

Once `#validate` is invoked, Flutter goes through every `FormField` widget
contained within the `Form` widget referenced by `key` and it calls the function
defined in its `validator` paramter. The process is identical for the `#save`
invocation, except that functions defined in `onSaved` are invoked.

Full source code:

```dart
import 'package:flutter/material.dart';

class FormWithValidation extends StatefulWidget {
  @override
  _FormWithValidationState createState() => _FormWithValidationState();
}

class _FormWithValidationState extends State<FormWithValidation> {
  String name = "";

  final key = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Form with Validation"),
      ),
      body: SingleChildScrollView(
        child: Form(
          key: key,
          child: Column(
            children: <Widget>[
              ListTile(
                title: TextFormField(
                  validator: (value) => value.isEmpty
                      ? "`NAME` field cannot be empty"
                      : null,
                  onSaved: (value) => name = value,
                  decoration: InputDecoration(labelText: 'NAME'),
                ),
              ),
              ListTile(
                title: RaisedButton(
                  onPressed: () {
                    final form = key.currentState;

                    if (form.validate()) {
                      form.save();

                      // ...
                    }
                  },
                  child: Text('Submit Form'),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
```

