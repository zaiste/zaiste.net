+++
title = "Make a HTTP `POST` Request with JSON as Body in Dart or Flutter"
[taxonomies]
topics = [ "Dart" ]
+++

```dart
import 'package:http/http.dart' as http;

Map data = {
  'key1': 1,
  'key2': "some text"
}

String body = json.encode(data);

http.Response response = await http.post(
  url: 'https://example.com',
  headers: {"Content-Type": "application/json"},
  body: body,
);
```

