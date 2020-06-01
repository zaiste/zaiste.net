
+++
date = 2017-09-11T00:00:00.000Z


title = "NGINX: Image Server with image_filter & secure_link modules"
topics = [ "nginx" ]

+++

NGINX with enabled [`image_filter`](http://nginx.org/en/docs/http/ngx_http_image_filter_module.html) and [`secure_links`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html) modules allows to quickly build an image server. The server can resize and cache images. It acts as a reverse-proxy between the external world and an internal storage with full-size image versions. Additionally, it protects images using MD5 hash values. It's a basic mechanism of resource authorization. It allows to access an image only if its hash value is known to the requester.

NGINX needs to be compiled with those two modules. This is not a default configuration. You can check enabled modules by running `nginx -V`. `nginx-extras` package in Ubuntu, however, comes with `image_filter` and `secure_links` already enabled.

Starting from NGINX 1.9.11 you can load modules dynamically. You can install the module and enable it. Here are Debian/Ubuntu specific instructions.

```
sudo apt-get install nginx-module-image-filter
```

Then, in `nginx.conf` use `load_module` directive to enable it:

```
load_module modules/ngx_http_image_filter_module.so;
```

Let's start with the cache. It is a file-based mechanism that stores resized versions of images. It should be large enough to reduce the number of resizing operations. In our example, the cache will be holding up to 10 GB of images. The `max_size` parameter defines the point at which NGINX starts to remove the least recently requested images from the cache to make room for new items.

```
proxy_cache_path /var/cache/nginx/images levels=1:2 keys_zone=images:64M inactive=60d max_size=10GB;
```

Let's specify two `server` blocks: an internal server for resizing images acting as a reverse-proxy to the actual storage (in our case S3) and a public server that proxies authorized requests to the internal server and stores requested images in the cache.

Here's the public server:

```
server {
  listen 80;
  server_name images.zaiste.net;

  location /resize {
    secure_link $arg_hash;
    secure_link_md5 "$uri your-secret-goes-here";
    if ($secure_link = "") {
      return 404;
    }

    proxy_cache images;
    proxy_cache_lock on;
    proxy_cache_valid 30d;
    proxy_cache_use_stale error timeout invalid_header updating;
    expires 30d;
    proxy_pass http://localhost:11337;
  }
}
```

The `secure_link` module works by generating a hash, which is the concatenation of the URL of the requested image and a secret string. This hash is long, so it is more convenient to append it to the URL rather than prepending it. This mechanisms prevents people from requesting arbitrary images.

Here's an example of a valid URL:

```
https://images.zaiste.net/resize/100x100/polyconf.jpg?hash=159c3isu11W1TBRm0YwBN
```

Internal server fetches images from S3 and resizes them on-the-fly based on dimensions specified in the URL. You can also define other image transformation such us cropping or rotating.

```
server {
  listen 11337;
  server_name localhost;

  set $backend 's3.eu-central-1.amazonaws.com/your-bucket-name';

  resolver 8.8.8.8;
  resolver_timeout 30s;

  proxy_buffering off;
  proxy_pass_request_body off;
  proxy_pass_request_headers off;

  proxy_hide_header "x-amz-id-2";
  proxy_hide_header "x-amz-request-id";
  proxy_hide_header "x-amz-storage-class";
  proxy_hide_header "Set-Cookie";
  proxy_ignore_headers "Set-Cookie";

  proxy_set_header Host $backend;

  image_filter_jpeg_quality 95;
  image_filter_buffer 50M;
  image_filter_interlace on;

  location ~ ^/resize/(?<width>\d+)x(?<height>\d+)/(?<name>.*)$ {
    image_filter resize $width $height;
    proxy_pass http://$backend/$name;
  }

  location ~ ^/resize/(?<width>\d+)/(?<name>.*)$ {
    image_filter resize $width -;
    proxy_pass http://$backend/$name;
  }

 location ~ ^/crop/(?<width>\d+)x(?<height>\d+)/(?<name>.*)$ {
    image_filter crop $width $height;
    proxy_pass http://$backend/$name;
  }
}
```

NGINX needs an explicit definition for DNS resolution when using variables in `proxy_pass` directive i.e. `$backend`. Otherwise, you will get `no resolver defined to resolve localhost` error.

You can clean AWS specific headers using `proxy_hide_header`.

Original images may be large. We need to allocate enough memory for `image_filter` module so it can load and resize them. In our example we set the `image_filter_buffer` directive to handle image files of up to 50 MB. The dash `‑` in the second example tells NGINX to maintain the original aspect ratio.

This setup, if used in production, should also provide a rate limiting mechanism. This can be done in NGINX using [`limit_req`](http://nginx.org/en/docs/http/ngx_http_limit_req_module.html) module.
