
+++

+++
# Promise vs Observable in JavaScript

Promises provide a single future value while Observables provide any number of future values.

Observables are *not* a superset of Promises as they are inifinite lists that
can be composed using various operators such as `map`, `filter` or `reduce`.

Observables can be cancelled while Promises cannot be cancelled.

Streams in Node.js are not observables.

Promises return a value only once while Observables may return a value more than once.

