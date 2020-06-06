
+++

+++
# Java vs Kotlin

## Conciseness

Plain Objects or Data Classes

in Kotlin:

```kotlin
data class Widget(var name: String, var owner: Person)
```

It generates getters, setters, `hashCode()`, `equals()`, `toString()`.

You can define default parameters

```kotlin
class Book(val title: String,
           val price: Int = 10000,
           val desc: String = "") {
}
```

You can refer to parameters using their names

```kotlin
val book = Book(title = "Madame Bovary", price = 1000, desc = "Good")
```

You can use `it` for lambdas

```kotlin
mylist.filter { it > 4 }
```

## Safety

You have to explicitly allow variables to be `null` aka. nullable-types by
adding `?` to the type name. Those will be checked at compile-time.

```kotlin
val name: String? = ""

```

## Async Programming

In Java there are callbacks. In Kotlin there are coroutines which allow to write code in a blocking way, they are lightweight threads.

## Function Types

Kotlin has proper function types.

