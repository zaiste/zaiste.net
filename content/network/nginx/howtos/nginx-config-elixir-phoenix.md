+++
title = "Configure NGINX for Phoenix applications"
topics = [ "NGINX", "Phoenix" ]
+++

Using NGINX as a front-end proxy for web applications is a relatively standard setup.

## Basic configuration

NGINX listens on port `:80` for requests and then proxies them to the Phoenix appplication running on port `:5544`.

```
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_pass http://localhost:34567;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

The last two `proxy_set_header` directives upgrade the client-server connection, so that a Phoenix application can use websockets and channels.

## Securing the Phoenix application with SSL

* You need to obtain a SSL certificate via *Let’s Encrypt* separately
* This configuration assumes this certificate is available in `/etc/letsencrypt/live/example.com/*`
* All unencrypted traffic is redirected to the secure connection on port `:443`
* The HTTP2 support is enabled using the `http2` directive

```conf
upstream phoenixapp {
  server localhost:34567;
}

http {
  server_tokens off; # hide server information
}

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name example.com;

  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2 default_server;
  listen [::]:443 ssl http2 default_server;
  server_name example.com;

  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
  ssl_ecdh_curve secp384r1;
  ssl_session_cache shared:SSL:10m;
  ssl_session_tickets off;
  ssl_stapling on;
  ssl_stapling_verify on;
  ssl_dhparam /etc/ssl/certs/dhparam.pem;

  add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
  add_header X-Frame-Options DENY;
  add_header X-Content-Type-Options nosniff;

  location ~ /.well-known {
    root /var/www/html;
    allow all;
  }

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_pass http://phoenixapp;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```


## Static assets in Phoenix

The `phoenix.digest` generates fingerprinted and gzipped static assets by default. There is, however, no `Expires` header set on those assets. Additionally, NGINX sends ungzip assets first. Let's improve that by adding a `location` directive inside the existing `location /` - it will match all types of static files.

```
server {

  # ...

  location / {

    # ...

    location ~* ^.+\.(css|cur|gif|gz|ico|jpg|jpeg|js|png|svg|woff|woff2)$ {
      root /path/to/my/app/priv/static;
      etag off;
      expires max;
      add_header Cache-Control public;
    }
  }
}
```

* the `root` directive must be set to a path where the static files are stored via the `phoenix.digest` task