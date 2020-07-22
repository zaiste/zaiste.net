+++
title = ""
[taxonomies]
topics = [ "TypeScript" ]
+++

`pipe` is a higher-order, variadic function that performs a function composition.

```ts
const pipe = (f, g) => (input) => g(f(input));
```

Higher-order function (HOF) is a function that either accepts a function as an argument and/or returns a function.

Variadic function is a function that accepts any number of arguments

* first functional argument can be of any arity, while the remaining function must be unary (in JavaScript, a function can return only a single value).
* signature of the resulting (composed) function has argument(s) of the first function, and return type of the promise of the return type of the last function (even when all or some functions are synchronous)
* each function in the chain always gets resolved value of the last return. If the previous function returns an array of promises, they are resolved via Promise.all before proceeding.

```js
function pipe(...fns: any[]): any {
    return (...initialArgs: any) =>
        fns.reduce((current, fn, i) => current.then((lastResult: any) => {
            const currentResult = i === 0 ? fn(...lastResult) : fn(lastResult);
            return Array.isArray(currentResult) ? Promise.all(currentResult) : currentResult;
        }), Promise.all(initialArgs));
}
```

## Not working

```ts
type Chain<In, Out = In, Tmp = any> = []
    | [(arg: In) => Out]
    | [
        (arg: In) => Tmp,
        ...Chain<Tmp, Out>
    ];
declare function flow<In, Out>(...fns: Chain<In, Out>): Out
```

Recursion in TypeScript types is allowed only in some cases with interfaces, using a middleman type.

Another lesser issue is tuple types are not allowed to be spread at the moment.

## Working solution

```ts
type Lookup<T, K extends keyof any, Else=never> = K extends keyof T ? T[K] : Else
type Tail<T extends any[]> = ((...t: T) => void) extends ((x: any, ...u: infer U) => void) ? U : never;
type Func1 = (arg: any) => any;
type ArgType<F, Else=never> = F extends (arg: infer A) => any ? A : Else;
type AsChain<F extends [Func1, ...Func1[]], G extends Func1[]= Tail<F>> =
  { [K in keyof F]: (arg: ArgType<F[K]>) => ArgType<Lookup<G, K, any>, any> };
type LastIndexOf<T extends any[]> =
  ((...x: T) => void) extends ((y: any, ...z: infer U) => void)
  ? U['length'] : never
declare function flow<F extends [(arg: any) => any, ...Array<(arg: any) => any>]>(
  ...f: F & AsChain<F>
): (arg: ArgType<F[0]>) => ReturnType<F[LastIndexOf<F>]>;
```