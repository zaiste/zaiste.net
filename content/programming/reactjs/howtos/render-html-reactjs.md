+++
title = "Render HTML in React.js"
[taxonomies]
topics = [ "React.js", "JavaScript" ]
+++

Use the `dangerouslySetInnerHTML` property:

```jsx
<div dangerouslySetInnerHTML={{ __html: '<here goes the HTML content to render as is' }} />
```

You can create a reusable component for rendering HTML in React.js

```jsx
const RawHTML = ({children, className = ""}) =>
  <div className={className} dangerouslySetInnerHTML={{ __html: children }} />
```
