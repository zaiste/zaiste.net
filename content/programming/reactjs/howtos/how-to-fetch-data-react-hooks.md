+++
title = "How To Fetch Data using React Hooks"
[taxonomies]
topics = [ "React.js", "JavaScript" ]
+++

Use the `useState` and `useEffect` hooks.

Provide an empty array as second argument to the `useEffect hook` to fetch data only when the component mounts, and not when it updates.

Using `async` directly in the `useEffect` function isn't allowed as the hook returns nothing or a clean up function, and not a `Promise`.

```js
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('<url>');

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {data.map(item => (
        <div>{item}</div>
      ))}
    </ul>
  );
}

export default App;
```

React Hooks are not intended approach for data fetching in React, instead use a feature called `Suspense`.

