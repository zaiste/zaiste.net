+++
title = "Open An URL For A Text Link In Flutter"
[taxonomies]
topics = [ "Flutter", "Dart" ]
+++


Use the `launch` & `canLaunch` functions from the `url_launcher` package along
with the `InkWell` widget:


```dart
import 'package:url_launcher/url_launcher.dart';

InkWell(
  child: Text("This is a text link"),
  onTap: () async {
    if (await canLaunch("<your URL here>")) {
      await launch("<your URL here>");
    }
  }
)
```

Alternatively, use the `RichText` widget:

```dart
class SomeText extends StatefulWidget {
  @override
  _SomeTextState createState() => _SomeTextState();
}

class _SomeTextState extends State<SomeText> {
  TapGestureRecognizer _myTapGestureRecognizer;

  @override
  void initState() {
    super.initState();
    _myTapGestureRecognizer = TapGestureRecognizer()
      ..onTap = () {
        launch('<your URL here>')
      }
  }

  @override
  void dispose() {
    _myTapGestureRecognizer.dispose();
    super.dispose();
  }


Center(
  child: RichText(
    text: TextSpan(
      children: [
        TextSpan(
          text: 'Regular text',
          style: TextStyle(color: Colors.black),
        ),
        TextSpan(
          text: 'blue-colored text which can be pressed',
          style: TextStyle(color: Colors.blue),
          recognizer: _myTapGestureRecognizer
        )
      ]
    );
  );
);
```

