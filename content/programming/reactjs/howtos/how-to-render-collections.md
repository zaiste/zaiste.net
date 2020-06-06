
+++

+++
# How To Render Collections

## Array

For array use `.map` function.

```js
export default function WidgetList({ widgets }) {
  return (
    <ul>
      {widgets.map((widget, index) => (
        <li key={index}>{widget}</li>
      ))}
    </ul>
  );
}
```

## Objects

For objects use `Object.entries` function

```js

```

