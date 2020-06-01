
+++

+++
# Singleton Pattern

In short, don't use Singleton Pattern.

-   a Singleton is global state
-   a Singleton is a memory leak if no one is using it, otherwise it's difficult to state when it should free memory
-   a Singleton leads to boilerplate, most of the languages don't support it
-   it's difficult/impossible to use Singletons in a multi-threading environement

