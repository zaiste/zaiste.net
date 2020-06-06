+++
date = 2018-02-24T00:00:00.000Z
title = "JavaScript: Object Literal over Switch Statement"
abstract = ""
[taxonomies]
topics = [ "JavaScript" ]
[extra]
priority = 0.8
+++

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