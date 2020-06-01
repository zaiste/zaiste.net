
+++

+++
# How To Render Collections

## Array

For array use ```
undefined
``` function.

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

For objects use ```
undefined
``` function

```js 

```

