+++
title = "How To Navigate between Screens in Flutter"
[taxonomies]
topics = [ "Flutter", "Dart" ]
+++

## TL;DR

In Flutter, screens and pages are usually called routes.

### Navigate to Another Screen

Use `Navigator.push` along with `MaterialPageRoute`:

```dart
Navigator.push(context, MaterialPageRoute(builder: (context) => AnotherScreen()));
```

Using Sprinkle library

```dart
context.display(AnotherScreen())
```


### Navigate Back

Use `Navigator.pop`

```dart
Navigator.pop(context);
```

Using Sprinkle library

```dart
context.back()
```

## Full Code Example

```dart
import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(context) {
    return MaterialApp(
      title: 'Flutter Navigation',
      home: MainScreen(),
    );
  }
}
```

```dart
class MainScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Main Screen'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              textColor: Colors.white,
              color: Colors.blue,
              child: Text('Navigate to Another Screen'),
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => AnotherScreen()));
              },
            )
          ],
        ),
      ),
    );
  }
}
```

```dart
class AnotherScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sub Page'),
        backgroundColor: Colors.redAccent,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Navigate back to Main Screen'),
              onPressed: () {
                Navigator.pop(context);
              },
            )
          ],
        ),
      ),
    );
  }
}
```