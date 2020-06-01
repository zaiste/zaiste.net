
+++

+++
# TypeScript's Built-In Type Declarations with the ```
undefined
``` Compiler Option

Since version 2.0, the built-in standard library type declarations have been split into modules in TypeScript. This allows to select which (of those built-in) declarations to include in the project.

There are several groups which can be defined with the ```
undefined
``` compiler option (or via the ```
undefined
``` property in ```
undefined
```):

-   dom
-   webworker
-   es5
-   es6 / es2015
-   es2015.core
-   es2015.collection
-   es2015.iterable
-   es2015.promise
-   es2015.proxy
-   es2015.reflect
-   es2015.generator
-   es2015.symbol
-   es2015.symbol.wellknown
-   es2016
-   es2016.array.include
-   es2017
-   es2017.object
-   es2017.sharedmemory
-   scripthost

By default, if not set explicitly, TypeScript will include type declarations needed for web development, depending on the target:

-   for 

    ```
    undefined
    ```

     as target: 

    ```
    undefined
    ```

    , 

    ```
    undefined
    ```

     and 

    ```
    undefined
    ```
-   for 

    ```
    undefined
    ```

     as target: 

    ```
    undefined
    ```

    , 

    ```
    undefined
    ```

    , 

    ```
    undefined
    ```

     and 

    ```
    undefined
    ```

