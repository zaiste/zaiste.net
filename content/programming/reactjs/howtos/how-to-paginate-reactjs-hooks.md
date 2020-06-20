+++
title = "How To Paginate in React.js using React Hooks"
[taxonomies]
topics = [ "React.js", "JavaScript" ]
+++

```js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [page, setPage] = useState(1);
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const load = async () => {
      const response = await fetch( `<YOUR URL>&${page}`, {
        method: "GET",
        headers: new Headers({})
      })
      const collection = await response.json();

      setCollection(collection);
      setIsLoading(false);
    }

    await load();
  }, [page]);

  return (
    <div>
      <h1>Paginate Demo</h1>
      {isLoading && <p>Loading data from the server...</p>}

      {collection.length !== 0 && (
        <button onClick={nextPage}>Next Page</button>
      )}

      {collection.map((c, index) => (
        <div key={index}>
          ... display the collection elements here
        </div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
```
