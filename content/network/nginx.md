+++

+++
# Nginx

Nginx is an event-based architecture. It uses a single thread running an event loop which handles sockets when they become ready for reading or writing.

This means that requests are not really handled at the same time, but several requests can be quickly handled one-by-one.

## Lua

Lua instances are shared between requests handled by the same worker process. multiple workers are not going to give you the same result. In order to share data between instances, use `lua_shared_dict`.

lua_package_path sets the Lua module search path used by scripts specified by set_by_lua, content_by_lua and others. The path string is in standard Lua path form, and ;; can be used to stand for the original search paths.

## WWW to Non-WWW

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    include snippets/ssl-example.com.conf;
    include snippets/ssl-params.conf;

    return 301 https://example.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com;
    include snippets/ssl-example.com.conf;
    include snippets/ssl-params.conf;
    ...
}
```

## Tuning

### Enable HTTP/2

```nginx
listen 443 ssl http2;
```

### Enable SSL session cache

```nginx
ssl_session_cache shared:SSL:1m; # 1 megabyte
ssl_session_timeout 1m; # 1 minute
```

### Disable SSL session tickets

```nginx
ssl_session_tickets off;
```

### Disable TLS version 1.0

```nginx
ssl_protocols TLSv1.1 TLSv1.2;
```

### Reduce SSL buffer size

```nginx
ssl_buffer_size 4k;
```

### Enable OCSP Stapling

OCSP (Online Certificate Status Protocol) stapling is an alternative approach for checking the revocation status of X.509 certificates. This appends a time-stamped OCSP response signed by the CA to the initial TLS handshake, eliminating the need for clients to contact the CA.

```nginx
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /path/to/full_chain.pem;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
```

### Enable HTTP Strict Transport Security (HSTS)

HTTP Strict Transport Security (HSTS) is a header which allows a web server to declare a policy for browsers to only connect using HTTPS connections. This ensures users do not skip security warnings: it locks users to HTTPS. This policy enforcement protects secure websites from downgrade attacks, SSL stripping, and cookie hijacking.

### Enable Brotli

```nginx
brotli on;
brotli_comp_level 4;
brotli_types text/plain text/css application/javascript application/json image/svg+xml application/xml+rss;
brotli_static on;
```

## HowTos

-   [How To Install Nginx on Ubuntu 18.04](@/network/nginx/howtos/howto-install-nginx-ubuntu-18-04.md)
-   [How To Resize On The Fly and Cache Images in Nginx](@/network/nginx/howtos/howto-resize-on-the-fly-cache-images-nginx.md)

