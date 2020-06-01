
+++
date = 2015-03-07T00:00:00.000Z


title = "Session vs Cookie in Rails"
topics = [ "rails", "http" ]

+++

Rails session makes values available from page to page by storing it in a cookie which expires when the browser closes, e.g

```
session[:foo] = "bar"
```

```
Name    _session_name
Value   a_base_64_value
Host    localhost
Path    /
```

Rails 3 session data is base64 encoded value, while for Rails 4 it is an encrypted value.

A cookie can be set to expire in the future so it still exists even if the browser is closed.

```
cookies[:foo] = { value: "bar", expires: 3.years.from_now.utc }
```

Setting a cookie to expire far in the future became common enough that Rails added a special `permanent` method to implement it, e.g.

```
cookies.permanent[:foo] = "bar"
```
