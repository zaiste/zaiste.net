
+++

+++
# Synchronous Callback vs Asynchronous Callback

## Synchronous Callback

-   is invoked before a function returns i.e. callback receiver remains on the stack

```js 
list.foreach(callback)

// here, the callback is expected to be invoked on each element
```

-   is invoked in the original thread, thus it doesn't create thread-safety concerns
-   may access data stored on the stack (e.g. local variables)
-   may access data tied to the current thread (e.g. thread-local variables)
-   may be able to assume that certain applicaton state is unchanged, e.g. that objects exist, timers have not fired, I/O has not occured

## Asynchronous Callback

-   also known as Deferred Callback
-   is invoked after a function returns, or on another thread's stack
-   mechanisms for deferred execution: threads and main loops (also known as event loops, dispatchers, executors)
-   popular with I/O-related receivers
-   may be invoked on another thread (the need for synchronization of resources the callback accesses)
-   cannot access data of the original stack or thread such as local variables or thread-local data
-   must assume that other threads/events modified the application's state

## Summary

Taking a callback doesn't make a function asynchronous e.g. ```
undefined
``` in JavaScript.

For a function to be asynchronous it must perform an asynchronous operation, e.g.

-   by using timer functions: 

    ```
    undefined
    ```

    , 

    ```
    undefined
    ```
-   by using special functions: 

    ```
    undefined
    ```

    , 

    ```
    undefined
    ```
-   by performing I/O (network, database, filesystem)
-   by subscribing to an event

