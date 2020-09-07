+++
title = "Combine useState with TypeScript in React.js"
[taxonomies]
topics = [ "React.js", "TypeScript" ]
+++

First, you need to change the file extension of your components from `.jsx` to `.tsx`. Then:

1. install React.js' types declarations i.e. `npm i -D @types/react`;
2. define a shape of your date using TypeScript interfaces; and
3. parametrize the `useState` invocation with that interface (or type) - this is known as *generics* or *parametrized types*.

```tsx
interface Widget {
  name: string;
  size: number;
}

const [widget, setWidget] = useState<Widget>({ name: 'My First Widget', size: 100 });
```

### Note

For JavaScript primitive types (i.e. `string`, `number`, `bigint`, `boolean`, `undefined` and `symbol`), the `useState` hook can *guess* the proper type. This ability is possible because of TypeScript's **type inference**.
