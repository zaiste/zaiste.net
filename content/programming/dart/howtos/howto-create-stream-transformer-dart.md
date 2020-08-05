+++
title = "Create a Stream Transformer in Dart"
[taxonomies]
topics = [ "Dart" ]
+++

```dart
import 'dart:async';

void main() {
  StreamTransformer<Integer, Integer> tripler = StreamTransformer.fromHandlers(handleData: (data, sink) {
      sink.add(data * 3);
  });

  StreamController controller = StreamController();
  controller.stream.transform(tripler).listen((data) {
    print('data: $data');
  });

  controller.add(1);
  controller.add(2);
  controller.add(3);
}
```

