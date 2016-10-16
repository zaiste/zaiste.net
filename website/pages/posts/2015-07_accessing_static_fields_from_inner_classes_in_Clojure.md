---
created_at: 2015-07-05
kind: article
publish: true
title: "Accessing static fields from inner classes in Clojure"
tags:
- clojure
- java
---

In Clojure you can access static fields and methods using `/`.

    (Classname/staticMethod args*)
    Classname/staticField

e.g.

    (System/getProperty "java.vm.version")
    Math/PI

If you need to access a static field or method using an inner class, you cannot
use `./..` forms and you must use regular Java's `$` sign syntax. For the JVM,
an inner class `Classname.InnerClass` is just a class named `Classname$InnerClass`.

```
(Classname$InnerClass/staticMethod *args)
Classname$InnerClass/staticField
```

e.g.

    java.nio.channels.FileChannel$MapMode/READ_ONLY

If you are importing Classname with the `import` function or with the `:import`
keyword, you must also specify that you are importing `Classname$InnerClass`.
