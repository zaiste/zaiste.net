
+++

+++
# Programming HowTos

## How to do a HTTP request

### How to do a HTTP request using jQuery

```js 
jQuery.ajax({
  url: "/api/product/666",
  type: "PUT",
  data: {
    "title": "Awesome Book is this",
    "description": "This is descrption",
    "style": "12345"
  },
  success: (data, textStatus, jqXHR) => {
  }
});
```

### How to do a HTTP request using Axios

### How to do a HTTP request using Fetch

