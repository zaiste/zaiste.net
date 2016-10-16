---
created_at: 2015-01-16
kind: article
publish: true
title: "Rewrite HTTP to HTTPS in Nginx"
tags:
- nginx
---

```
server {
       listen         80;
       server_name    example1.com example2.com;
       return         301 https://$host$request_uri;
}

server {
       listen         443 ssl;
       server_name    example1.com example2.com;
       ...
}
```

`$host` is used instead of `$server_name` to properly match between `server`
block the corresponding domains.

Check [Nginx Pitfalls][1]

[1]: http://wiki.nginx.org/Pitfalls
