
+++

+++
# Tacit (Point-Free Style) Programming

Tactit programming is a programming paradigm in which function definitions do not identify the arguments (or "points") on which they operate. Instead the definitions compose other functions.

Combinator-style programming means expressing functions as a series of steps using function composition. This technique makes code more clear and readable.

Thomas Yaeger has written a Lambdabot plugin to automatically convert a large subset of Haskell expressions to pointfree form.

Point-free style may lead to code which is difficult to modify. A function written in a pointfree style may need to be to adically changed to make minor changes in functionality. This is because the function becomes more complicated than a composition of lambdas and other functions, and compositions must be changed to application for a pointful function.

