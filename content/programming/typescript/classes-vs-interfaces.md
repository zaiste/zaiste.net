+++
title = "Classes vs Interfaces in TypeScript"
[taxonomies]
topics = [ "TypeScript" ]
+++

A class is a blueprint from which we can create objects that share the same configuration - properties and methods. An interface is a group of related properties and methods that describe a shape of an object.

Classes and Interfaces only describe the data and don't provide implementation nor initialisation. In TypeScript, both can be used to type variables. Classes are more flexible as they be used for type-checking and implementation, whereas interfaces interfaces can be only used for type-checking.

ES6 introduced the `class` syntax. In addition to that, TypeScript extends JavaScript classes with extra features such as `static` properties or type-checking capabilities.

Classes are kept at runtime while interfaces are removed during the compilation stage.
