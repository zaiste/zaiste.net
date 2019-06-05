---
created_at: 2018-02-24
kind: article
publish: true
title: "JavaScript: Object Literal over Switch Statement"
tags:
- javascript
sitemap:
  priority: 0.8
abstract: >
---

```js
function dispatchStatus(status) {
  const statuses = {
    'accepted': () => 'This is accepted',
    'rejected': () => 'This is rejected',
    'pending': () => 'This is pending',
    'default': () => 'Status unknown'
  };
  return (statuses[status] || statuses['default'])();
}

dispatchStatus('accepted')
```