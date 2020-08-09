+++
title = "Filter List in Dart"
[taxonomies]
topics = ["Dart"]
+++

Use `Random` from `dart:math`:

```dart
import 'dart:math';

main() {
  var random = Random();
  for (var i = 0; i < 10; i++) {
    print(random.nextInt(100));
  }
}
```

`.nextInt(k)` generates a random integer number in `[0, k)`, i.e. from `0` to `k-1` included.