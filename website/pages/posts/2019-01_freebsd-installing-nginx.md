---
created_at: 2019-01-15
title: "FreeBSD · Installing Nginx"
tags:
- freebsd
- nginx
abstract: >
  This article describes how to install and configure an Nginx server on FreeBSD.
---

This article describes how to install and configure an Nginx server on FreeBSD.

[Nginx](https://www.nginx.com/) is an open-source web server created by Igor
Sysoev. Nginx can be also used as a reverse proxy, a load balancer or a HTTP
cache. Nginx is the second most popular web server.

On FreeBSD, Nginx can be installed as a binary package using `pkg`, or from
sources via the Ports Collection.

## Install Nginx as binary 

Install Nginx as a binary using `pkg`:

```bash
pkg install nginx
```

## Install Nginx from sources

Installing nginx via the Ports Collection allows to include or exclude
particular modules.

```bash
portsnap fetch update
cd /usr/ports/www/nginx/
make install clean
```

## Enable Nginx at boot 

FreeBSD uses the `rc` system of startup scripts for managing services. Those
services will be started automatically at boot time as specified in
`/etc/rc.conf`.

Every service available on the system has its corresponding script located in the
`/usr/local/etc/rc.d/` directory. These scripts define a variable called `rcvar`
needed to enable each service.

In order to find out the `rcvar` of each service you can simply grep their
directory:

```bash
grep rcvar /usr/local/etc/rc.d/*
```
```bash
/usr/local/etc/rc.d/avahi-daemon:rcvar=avahi_daemon_enable
/usr/local/etc/rc.d/avahi-dnsconfd:rcvar=avahi_dnsconfd_enable
/usr/local/etc/rc.d/cupsd:rcvar="cupsd_enable"
/usr/local/etc/rc.d/dbus:rcvar=dbus_enable
/usr/local/etc/rc.d/nginx:rcvar=nginx_enable
/usr/local/etc/rc.d/tcsd:rcvar=tcsd_enable
/usr/local/etc/rc.d/tpmd:rcvar="${name}_enable"
```

For Nginx the `rcvar` is `nginx_enable`.

Enable `nginx` to run at boot time:

```bash
sysrc nginx_enable="YES"
```

`sysrc` is a convenience tool for interacting with the `/etc/rc.conf` file.

## Start Nginx

Use `service` to start Nginx:

```bash
service nginx start
```
```bash
Performing sanity check on nginx configuration:
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
Starting nginx.
```

## Restart Nginx

Use `service` to restart Nginx:

```bash
service nginx restart
```
```bash
Performing sanity check on nginx configuration:
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
Stopping nginx.
Performing sanity check on nginx configuration:
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
Starting nginx.
```

## Stop Nginx

Use `service` to stop the Nginx server:

```bash
service nginx stop
```

## Reload Nginx config

Use `service` to reload the configuration for the Nginx server:

```bash
service nginx reload
```
```bash
Performing sanity check on nginx configuration:
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```

## Nginx Essentials 

- Nginx configuration file: `/usr/local/etc/nginx/nginx.conf`
- Nginx default document directory: `/usr/local/www/nginx/`
- Nginx global error log file: `/var/log/nginx-error.log`
- Nginx global access log file: `/var/log/nginx-access.log`

## Create Nginx document directory

Create a directory in `/usr/local/www/`, e.g. for `domain.com`:

```bash
mkdir -p /usr/local/www/domain.com/html/
```

Set the ownership of the `domain.com/` directory to the `www` user (the default
Nginx user created during Nginx installation):

```bash
chown -R www:www /usr/local/www/domain.com/
```

Set the permissions for the document directory:

```bash
chmod -R 755 /usr/local/www/domain.com/
```

Finally, create a sample `index.html` HTML file in
`/usr/local/www/domain.com/html/`:

```bash
touch /usr/local/www/domain.com/html/index.html
```

Add the following HTML content to this newly created `index.html`:

```html
<html>
  <head><title>Title for Domain.com</title></head>
  <body>
    <h1>This is Domain.com</h1>
  </body>
</html>
```

## Configure Nginx Virtual Hosts 

Nginx's server block is similar to Apache's virtual host concept. This allows to
serve the content for a specific domain or an IP address.

Create the directory for server blocks:

```bash
mkdir /usr/local/etc/nginx/servers/
```

Include the server blocks directory in `nginx.conf` located at
`/usr/local/etc/nginx/` within the `http` block:

```nginx
http {
  ...
  include "servers/*.conf";
}
```

Add the `server` block configuration for a domain/ip of choice:

```bash
vi /usr/local/etc/nginx/servers/domain.com.conf
```

Put the following content in this newly created server block configuration:

```nginx
server {
    access_log /var/log/nginx/domain.com.access.log;
    error_log /var/log/nginx/domain.com.error.log;
    listen       80;
    server_name  domain.com www.domain.com;

    location / {
        root   /usr/local/www/domain.com/html;
        index  index.html;
    }
}
```

If you made any mistakes within `nginx.conf`, you can always revert to the
default Nginx configuration replacing it with the content of `nginx.conf-dist`
which is located in the same directory, e.g.

```bash
cp /usr/local/etc/nginx/nginx.conf-dist /usr/local/etc/nginx/nginx.conf
```

## Adjust Nginx config

Uncomment the `user` directive and replace its value from `nobody` to `www`.

```bash
user www;
```

Change `worker_processes` from `1` to `auto`:

```bash
worker_processes auto;
```

By setting `auto` Nginx will try to autdetect the best value for this directive
dependeing on the number of CPU cores.

Test the configuration for syntax errors:

```bash
nginx -t
```
```bash
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```

Finally, reload the configuration using `service` to make it live:

```bash
service nginx reload
```
