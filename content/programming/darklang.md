
+++

+++
# Darklang

Dark aims to provide the quick prototyping of Python using their built-in editor along with a language that comes with static types (similar to OCaml).

In Dark, types cannot be changed; only new types are made to replace the previous ones.

Dark doesn't have `null`s and exceptions.

Dark supports HTTP and at some point it will also support GRPC, Thrift or similar things. This way you can access 3rd party services and wrap them in SDKs in the Dark package manager.

Dark primary audience are experienced programmers, and not beginners.

Dark proposes a different process around software development. Instead of a process that takes code from a machine and sends it to the production enviroment, the code is already in that environment, but sandboxed. It's done this way because transefering code from a local machine to the production environment is somehow risky and error prone.

Dark is designed to allow extremely fine grained ownership, for example allow a contractor access to a single HTTP route or function.

