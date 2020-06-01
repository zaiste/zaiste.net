
+++
date = 2017-07-02T00:00:00.000Z


title = "Switch statement in JavaScript"
topics = [ "javascript", "code" ]

+++

JavaScript `switch` statement can be quite useful: it provides cascade functionality which simplifies the code in case of having to normalize a bunch of similar but not identical possible inputs (eg, 'n', 'no', false, 'false', '0', 0).

Depending on the runtime `switch` can be more efficient than building a bunch of `if`s, because the engine can optimize for the different conditions and build a reference table internally (i.e. translating to native machine code instead of the higher JavaScript layer). All the branch addresses (i.e. offsets) for all the cases are calculated during compilation. Therefore, when something matches a case it just takes one branch instruction to move the program counter to that particular address and start code execution from there (ignoring the step to calc absolute address from the offset).

In some cases, Function Hash (or look-up tables) may be a better means of organizing the code (particularly if your switch is just calling other functions), and can make your code much more testable.

```
class ActionHandler {
  dispatch(action) {
    return this.actions[action]();
  },

  actions: {
    "m": move(),
    "p": print(),
    "esc": exit(),
  }
};
```

There is also polymorphism which is often proposed as anti-switch argument, but this is coming primarily from class-based languages. JavaScript isn't such type of language, so habits and opinions of other languages shouldn't be applied to it.

