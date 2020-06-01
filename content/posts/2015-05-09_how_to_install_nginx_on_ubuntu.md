
+++
date = 2015-05-09T00:00:00.000Z


title = "How to install Nginx on Ubuntu"
topics = [ "nginx", "ubuntu" ]

+++

For more up-to-date Nginx versions, it is a good idea to add official
Nginx package source URLs.

As Nginx releases are signed using PGP you need to download
[its PGP key][1] and then add it to `apt`.

```
wget http://nginx.org/keys/nginx_signing.key
```
```
apt-key add nginx_signing.key
```

Append to `/etc/apt/source.list` the appropriate package source URL
depending on your OS version, e.g. for Trusty

```
deb http://nginx.org/packages/ubuntu/ trusty nginx
deb-src http://nginx.org/packages/ubuntu/ trusty nginx
```

Finally, install Nginx.

```
apt-get install nginx
```


[1]: http://nginx.org/keys/nginx_signing.key
