+++
date = 2017-08-02T00:00:00.000Z
title = "NGINX Cache"
aliases = [
  "nginx_cache"
]
[taxonomies]
topics = [ "Nginx" ]
+++

A proxy cache is located between a client and an origin server. It stores the content that passes between. If a client requests content that the cache has stored, it is returned directly without contacting the origin server. This improves performance. The application servers don't need to generate pages each time. Their system resource usage (CPU, RAM and I/O) is reduced.

NGINX provides a full set of caching features. You can enable with `proxy_cache_path` and `proxy_cache` directives. The first one sets the cache location along with its configuration. The second one activates the cache.

```
proxy_cache_path /path/to/the/cache levels=1:2 keys_zone=just_cache:10m max_size=10g inactive=69m use_temp_path=off;

server {

  location / {
    proxy_cache just_cache;
    proxy_pass http://some_upstream;
  }
}
```

* `levels` defines a directory hierarchy under under the given path. `1:2` sets it as two-level directory. This is recommended if there is a lot of files on single level. By default, it's just one level i.e. a single directory.
* `keys_zone` sets up a shared memory zone just for the *cache keys*. Having those keys in memory improves lookup time, thus request/response time. `10m` defines a 10 megabytes zone which can hold about 80,000 keys.
* `max_size` defines the maximum size of the cache. In the example above it is set as 10 gigabytes. This parameter is optional, not specifying a value makes the cache grow to use available disk space.
* `inactive` defines how long an item should be kept in the cache without being accessed. `69m` specifies a 69 minutes widow: a file that has not been requested within that time is deleted.
* `use_temp_path` forces NGINX not to use the temporary cache area and to use directly the cache directory specified.
* `proxy_cache` activates the caching for requests that match URL of the parent `location` block. You can specify `proxy_cache` within `server` block to apply it to all `location` blocks.

NGINX can be also configured to deliver stale content from its cache when it's not possible to get fresh content from the origin servers.  This provides an extra level of fault tolerance for the servers being proxed by NGINX. It also ensures the content availability in the case of server failures or traffic spikes. This functionality is enabled with `proxy_cache_use_stale` directive.

```
location / {
  proxy_cache_use_stale error timout http_500 http_502 http_503 http_504;
}
```

The configuration above states that when NGINX receives and error, timeout or a `50x` response and it has a stale version of the requested file in the case, that file will be delivered to the client instead of the actual error.

There is a set of optional directives for fine-tuning the cache performance.
* `proxy_cache_revalidate` tells NGINX to use conditional `GET` requests to refresh the content from origin servers. Once the cache item is expired, NGINX uses `If-Modified-Since` header for the request send to the origin server. This saves bandwidth as the server sends the full response only if the actual content has been modified. It uses the `Last-Modified` header for that.
* `proxy_cache_min_uses` defines the number of times an URL must be requested before it's being cached by NGINX. The default value is `1`.
* `proxy_cache_use_stale` has an additional `updating` parameter to deliver stale content if it's in the process of being updated from the origin server. By setting `proxy_cache_background_update` directive to `on` those updates will be done in the background.
* `proxy_cache_lock` set to `on` is useful when there are several requests for the same content. That directive ensures that only one of those identical requests is sent to the origin server. The remaining requests wait for it to finish and then they are served directly from the cache.

NGINX's cache configuration allows to split the cache distribution between multiple hard drives. `$request_uri` is used to determine which cache to use for each request. This way request for the same URL are cached in the same location.

```
proxy_cache_path /path/to/hd1 levels=1:2 keys_zone=cache_hd1:10m max_size=10g inactive=69m use_temp_path=off;
proxy_cache_path /path/to/hdd2 levels=1:2 keys_zone=cache_hd2:10m max_size=10g inactive=69m use_temp_path=off;

split_clients $request_uri $just_cache {
  50%  "cache_hd1";
  50%  "cache_hd2";
}


server {
    location / {
        proxy_cache $just_cache;
        proxy_pass http://upstream;
    }
}
```

NGINX follows `Cache-Control` header in responses from the origin server to determine if something should be cached or not. It does not cache responses with `Cache-Control` set to `Private`, `No-Cache`, `No-Store` or with `Set-Cookie` in the response header. NGINX doesn't cache responses if `proxy_buffering` is set to `off` as well. `Cache-Control` headers can be ignored with `proxy_ignore_headers` set to `Cache-Control`.

By default, only `GET` and `HEAD` requests are cached. This can be changed with `proxy_cache_methods`. Its default value is `GET HEAD` and it can be extended with `POST` if needed.

`Pragma` header with `no-cache` value is used by clients to bypass cache layer and go straight to the origin server. This header is not activated by default. This feature can be configured using `proxy_cache_bypass` directive set to `$http_pragma`.
