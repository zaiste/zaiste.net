
+++

+++
# How To Render Conditionally in React.js

```js 
export default function Widget({ isVisible }) {
  return (
    <div>
      {isVisible && <h1>This is a Widget</h1>};
    </div>
  );
}
```

Another approach:

```js 
export default function Widget({ isVisible }) {
  if (!isVisible) {
    return (
      <div>
        <h1>No widget</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>This is a Widget</h1>
    </div>
  );
}
```

