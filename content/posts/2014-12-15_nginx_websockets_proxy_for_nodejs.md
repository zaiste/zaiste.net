
+++
date = 2014-12-15T00:00:00.000Z


title = "NGINX WebSocket Proxy"
topics = [ "nginx", "websocket" ]

+++

[NGINX][1] can be easily configured as a reverse [WebSocket][2] proxy since version `1.3`.
WebSocket handshake is compatible with HTTP using `Upgrade` and `Connection` headers. As
WebSocket connections are long running, NGINX will keep these connections open rather then
closing them as idle.

Set `Upgrade` and `Connection` headers explicitly for NGINX to handle a WebSocket connection.

```
location / {
    proxy_pass http://app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

Additionaly, such WebSocket proxy mechanism can be extended to have multiple backend servers for
high availability and performance wth NGINX server acting as a load balancer between them.

By default NGINX closes the connection if no data is sent for 30 seconds. This timeout value can
be changed wth `proxy_read_timeout`; alternatively, a WebSocket server should send ping messages periodically
to reset the timer.


[1]: http://nginx.org/
[2]: http://www.websocket.org/
