
+++
date = 2015-01-16T00:00:00.000Z


title = "Rewrite HTTP to HTTPS in Nginx"
topics = [ "nginx" ]

+++

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
