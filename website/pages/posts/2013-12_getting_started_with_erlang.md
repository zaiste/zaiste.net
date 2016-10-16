---
created_at: 2013-12-29
kind: article
publish: true
title: "Getting started with Erlang"
tags:
- erlang
- 101
---

This article gives a brief overview of [Erlang][14] programming language along with references to useful learning materials.

## Language

[Erlang][15] is a general-purpose concurrent and functional programming language with eager evaluation, single assignment and strong typing. [Joe Armstrong][5] is the initial language creator. Erlang’s concurrency implementation is the Actor model: Erlang application is structured around (lightweight) processes. Concurrency is explicit, processes communicate using message passing instead of using shared state. Single assignment model means that each variable can be assigned a value only once in a specific context.  Erlang is a great fit for fault-tolerant, distributed, real-time applications.

Compiling Erlang code generates BEAM. BEAM stands for Bogdan’s Erlang Abstract Machine. BEAM code is run by ERTS (Erlang Runtime System).

Modules allows to store, encapsulate and share the code effectively. `-module(NAME)` directive sets the name for the module. the module name and its filename must match. `-export()` directive specifies functions available outside of the module.

Erlang has 8 primitive data types (Integer, Atom, Float, Reference, Binary, Pid, Port, Fun) and 2 compound data types (Tuple, List). There are also Records, a convenient syntax for accessing tuple’s elements.

Integer type is able to handle numbers of arbitrary size (only limited by the available memory). It doesn’t fully support, however, arbitrary large integer arithmetic because of broken power function:

```
math:pow(2,55).
36028797018963970.0
```

The result is float as Erlang relies on a float pow(x,y) function: it is an IEEE-754 float number in Decimal64 format which means it has a maximum
precision of 16 digits.

Integers can be also represented in any *base* between 2 and 26 e.g. binary representation is written as `2#1010`, hexadecimal representation is written as `16#AEFF`.

Binary is a sequence of raw data used for efficient data transportation.

Atoms are names starting with a lowercase letter e.g. `point`, `area`; their value is the same as their name. There are two special atoms `true` and `false` for representing boolean logic values.

Tuples are groups of items inside curly braces e.g. `{point, 4, 9}`.

All variable names must start with an uppercase letter. `=` used for single assignment is also a pattern matching operation.

```
A = {point, 4, 9}
{point, X, 9} = A  % X = 4
```

Records allow to refer to tuple’s items by name and to define default values for these elements e.g.

```
-record(person, {
     name,
     company = "ACME Corp”,
     desc
}).

X = #record{name = “Steve”, desc = “Programmer"}.
```

Functions with the same name but different arity are considered different functions. Functions may define guards that will check if input parameters can be accepted. It is preferred to pass a tuple as a function parameter as it gives more flexibility. `case` construct lets you use pattern matching and guards within functions body.

Strings are simply lists of characters. `$` can be used to convert a character to its numeric representation.

```
1> $h
104
2> [$h, $e, $l, $l, $o].
“hello"
3> “hello ” ++ “world”
“hello “ “world”
string:concat(“hello”, “world”)
```

Lists can hold any data. `[H|T]` matches against first element and the rest of the list.

```
1> X = [1, 2, 3, 4, 5].
[1, 2, 3, 4, 5].
2> [A|B] = X.
3> A.
1
4> B.
[2,3,4,5].
```

Erlang provides list comprehensions.

```
1> X = [1, 2, 3, 4, 5].
2> [Number * Number || Number <- X].
[1,4,9,16,25]
```

## Installation

You can download Erlang source code from the [official website][4]; platform specific packages are available from [Erlang Solutions][1]. On OSX you can use Homebrew i.e. `brew install erlang`; on 10.9 you may need to compile it with `unixodbc` i.e.

```
brew install unixodbc
brew install erlang --with-unixodbc
```

If you plan to use different versions of Erlang, [kerl][2] may come in handy:

```
kerl list releases
kerl update releases

kerl build R16B03 r16b03
kerl status

mkdir -p .erlangs/r16b03
kerl install r16b03 .erlangs/r16b03
. $HOME/.erlangs/r16b03/activate

kerl list installations
```

On OSX, you may need to adjust `kerl`:

```
echo KERL_CONFIGURE_OPTIONS="--disable-hipe --enable-smp-support --enable-threads --enable-kernel-poll  --enable-darwin-64bit”  > ~/.kerlrc
```

## The Erlang Shell

Erlang comes with a programming shell available via `erl`.

```
Erlang R16B03 (erts-5.10.4) [source] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false] [dtrace]

Eshell V5.10.4  (abort with ^G)
1> hello.
hello
2>3 + 2.
5
3>
```

`q()` quits the shell i.e. it turns off every Erlang process.
`h()` shows the history.
`e(-1)` executes previous line again.
`v(N)` references previous values, N
`b()` shows bound variables
`f()` removes a binding of a variable

## Emacs Erlang Mode

Emacs users should take a look at `erlang-mode`. The most commonly used functions are:

* `C-c C-j` erlang-generate-new-clause
* `C-c C-y` erlang-clone-arguments
* `C-c C-c` / `C-c C-u` comment / uncomment
* `C-a M-a` erlang-beginning-of-function
* `C-a M-e` erlang-end-of-function
* `C-c C-z` erlang-shell-display command
* `C-c C-k` erlang-compile command

## Further reading

[Learn you some Erlang][3] is a book for beginners that is available online in HTML for free. [Getting Started with Erlang User's Guide][6] provides essential information about the language in very succinct format. If you’re looking for a short syntax explanation, be sure to check [Learn X in Y minutes][7]. There is also an interesting presentation by Joe Armstrong on YouTube: [part 1][8], [part 2][9], [part 3][10], [part 4][11], [part 5][12], [part 6][13].

[1]: https://www.erlang-solutions.com/downloads/download-erlang-otp
[2]: https://github.com/spawngrid/kerl
[3]: http://learnyousomeerlang.com/
[4]: http://www.erlang.org/download.html
[5]: http://joearms.github.io/
[6]: http://www.erlang.org/doc/getting_started/users_guide.html
[7]: http://learnxinyminutes.com/docs/erlang/
[8]: http://www.youtube.com/watch?v=9uIhawQ1G0I
[9]: http://www.youtube.com/watch?v=Y4gqBGDcUtY
[10]: http://www.youtube.com/watch?v=soKyKq-dORc
[11]: http://www.youtube.com/watch?v=989ZENaDXgY
[12]: http://www.youtube.com/watch?v=ieEaaofM7uU
[13]: http://www.youtube.com/watch?v=vU2qW94w-z8
[14]: http://www.erlang.org/
[15]: http://en.wikipedia.org/wiki/Erlang_(programming_language)
