---
created_at: 2017-10-17 
kind: article
publish: true
title: "NGINX: Server & Location Block"
tags:
- nginx
---

NGINX determines a `server` and `location` block to use each time a client request is made.

A `server` block defines a virtual server used to handle requests based on the domain name, port, and IP address. `listen` and `server_name` directives are used by NGINX to determine that `server` block by matching the IP address and the port of the request. 

A `location` block is defined within a `server` block. It is used to define how to handle requests for different resources and URIs within the context of the parent `server` block. 

A `listen` directive can be set to a pair of IP address and port, to only an IP address (with the default port 80), to only a port (with every interface i.e. `0.0.0.0` for that port) and finally to a  path to a Unix socket. Any server block that does not include a `listen` directive is given the listen parameters of `0.0.0.0:80` (or `0.0.0.0:8080`  if being run by a non-root user). 

If there are multiple `server` blocks matching `listen`, NGINX evaluates the `server_name` directive by checking the request's `Host` header. 

```
location optional_modifier location_match {
  ...
}
```

If there's no modifier, a location is interpreted as a prefix match. It will be matched against the beginning of the request URI. `=`  request's URI must match exactly the location match. `~` the location is interpreted as a case-sensitive regular expression match. `~*` the location is interpreted as a case-insensitive regular expression match.

The `return` directive defines a new (rewritten) URL. It is simpler and recommend instead of `rewrite` whenever possible.

```
return (301 | 302 | 303 | 307) url;
```

If the code is omitted, `302` is used by default. 

```
return url;
```

If there's a need to test for more complicated distinctions between URLs, capture elements in the original URL that don’t have corresponding NGINX variables, or change or add elements in the path? You can use the rewrite directive in such cases.

If you need capture elements in the original URL that don’t have corresponding NGINX variables, or change elements in the path, use the `rewrite` directive. The `rewrite` directive may not halt request processing by NGINX. `return` directive always halts the processing, thus it is more efficient. 

The `last` flag indicates to skip any subsequent `rewrite` directives in the current `server` or `location` block and it starts a search for a new location that matches the rewritten URL.
