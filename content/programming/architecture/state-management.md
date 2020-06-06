
+++

+++
# State Management

Objects are a poor man’s closures. Closures are a poor man’s objects.

`useState` is for combining state onto a pure-function. State is located in React's core, associated with a function only through a value and a callback. It isn't located in function's local state. `useState` is a workaround.

SwiftUI similar MobX is class-based and keeps state in a class member.

MobX takes data (class properties) and makes it observable via annotations.

Redux is direct opposite to MobX. The former evolves state as a pure function of the current state and some change, while the latter incorporates mutable-observable pattern.

`@observable`, `useState` or `React.Component.state` are conceptually similar. All provide an observable value from the void along with methods of updating that observable.

