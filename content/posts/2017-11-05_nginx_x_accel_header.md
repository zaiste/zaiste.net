+++
date = 2017-11-05T00:00:00.000Z
title = "NGINX X-Accel header"
aliases = [
  "nginx_x_accel_header"
]
[taxonomies]
topics = [ "Nginx" ]
+++

`X-Accel-Redirect` response header makes an internal redirection to a `location` block determined by header's value returned from an upstream (backend).

This allows, for example, to handle authentication or logging in the backend and then have NGINX handle serving the contents from redirected location. This way freeing up the backend to handle other requests. This feature is commonly known as `X-Sendfile`.

```
location /protected {
  internal;
  root /path/to/files;
}
```

The location should be defined as `internal` to prevent the client from going directly to the URI.

If the application returns a response with `X-Accel-Redirect` header set `/protected/file.txt` location, NGINX will serve `/path/fo/files/protected/file.txt`. If you want to serve `/path/to/files/file.txt`, then replace `root` with `alias`.

```
location /protected {
  internal;
  alias /path/to/files/;
}
```

Note the trailing slash at the end, i.e. `/path/to/files/` instead of `/path/to/files`.
