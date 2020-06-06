+++
date = 2013-03-04T00:00:00.000Z
title = "Serving Apps Locally with Nginx and Pretty Domains"
aliases = [
    "serving_apps_locally_with_nginx_and_pretty_domains"
]
[taxonomies]
topics = [ "Nginx" ]
+++

This post describes how to configure Nginx to serve application locally with
pretty domains such as `yourappname.dev/` without using over-engineered solutions,
like [pow][1], trying to shield the user from the complexity with extra,
unnecessary abstraction layers.

The instructions are OSX specific, but they can be easily adjusted to \*nix
systems.

## Nginx

Let's start by making sure there is no Apache process running. On OSX, we can
use the following command to turn it off:

```
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

Nginx can be installed in various ways, I'll use homebrew:

```
brew install nginx
```

Running Nginx on port `80` (or any port below `1024`) requires `sudo` command,
otherwise the launch agent will fail. For ports above `1024`, we can just
symlink the launch script as follows:

```
ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist
```

For default HTTP port, we need to change `listen` value from `8080` to `80` in
`/usr/local/etc/nginx.conf` . We can also slightly adjust `server_name`,
so both `app/` and `localhost/` resolve to `127.0.0.1`.

```
server {
     …
     listen 80;
     server_name app localhost;
     …
}
```

For ports below 1024 we cannot symlink the launch script. It must be copied
to system's `/Library/LaunchAgents`.

```
sudo cp /usr/local/opt/nginx/homebrew.mxcl.nginx.plist /Library/LaunchAgents
```

In `homebrew.mxcl.nginx.plist`, we have to change `UserName` to `root`. For
convenience, we can also change `Label` to `nginx`, which will allow us to write:

```
launchctl start nginx
```

instead of:

```
launchctl stop homebrew.mxcl.nginx
```

## Local DNS

Next step is setting up a local DNS. As it is not possible to use wildcards in
the `/etc/hosts` file, we cannot specify something like:

```
127.0.0.1      *.dev.
```

To get around this problem, we will install a DNS proxy, called [DNSMasq][2]:

```
brew install dnsmasq
```

The configuration is stored in `dnsmasq.conf` under `/usr/local/etc/`.

```
touch /usr/local/etc/dnsmasq.conf
```

Inside we put the following line:

```
address=/.dev/127.0.0.1
```

It says that all `*.dev` sites should be redirected to the local IP, i.e.
`127.0.0.1`.

Similar to Nginx process, `dnsmasq` must be run by `root`.

```
sudo cp -fv /usr/local/opt/dnsmasq/*.plist /Library/LaunchDaemons
sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
```

Then, we must configure OSX to use our local system as first DNS server.
Go to *System Preferences* and then *Network*. For DNS configuration put the
loopback IP (i.e. 127.0.0.1) as first followed by usual DNS IP addresses:

```
127.0.0.1
8.8.8.8
8.8.4.4
```

Now, if we try to ping some any address ending in `.dev`, it should return
`127.0.0.1`.

```
$ ping example.dev
PING example.dev (127.0.0.1): 56 data bytes
```

**Note**: On Linux it is possible to automatically prefix DNS server list with
`127.0.0.1`. It may be useful if you have to use DNS servers provided by DHCP
and/or you change your network often (e.g. home, office). I haven't found similar
solution for OSX.

## Virtual Hosts

For virtual hosts configurations, we will follow the convention of two
directories: `sites-enabled` and `sites-available`, under `/usr/local/etc/nginx`.

```
cd /usr/local/etc/nginx
mkdir sites-available
mkdir sites-enabled
```

We must slightly adjust `nginx.conf` by adding the following line within `http`
section:

```
 include sites-enabled/*.dev;
```

## Configuration with Backend

We are ready to specify per-app configuration. Let's take a look at the
configuration file template.

```
upstream NAME {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name NAME.dev;
    root PATH_TO_PUBLIC

    try_files $uri/index.html $uri.html $uri @app;

    location @app {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_redirect off;

      proxy_pass http://NAME;
    }
}
```

To make it work, we need to adjust it at least in two places i.e. `NAME` and
`PATH_TO_PUBLIC`. `NAME` can be anything, I put there application's name.
`PATH_TO_PUBLIC` specifies where assets are, e.g. for Rails it is the path to
`public` folder, for Pyramid, the path to `static` folder, etc.

The configuration file can be placed in `sites-available`, and then, it must be
linked to `sites-enabled`, e.g.

```
ln -s /usr/local/etc/nginx/sites-available/anapp.dev \
  /usr/local/etc/nginx/sites-enabled/anapp.dev
```

Once linked, we have to restart Nginx process. On OSX, it can be done in the
following way:

```
sudo launchctl stop nginx
sudo launchctl start nginx
```

## Configuration without Backend

An additional, configuration file is not necessary for client-side only
applications. We can set up a dynamic application dispatch by using a default
`server` directive, located in `/usr/local/etc/nginx/nginx.conf`. Nginx will
look for directories in defined base path that match the name from requested
domain, e.g. `appname.dev` will match a directory named `appname` inside
`/Users/zaiste/dev` from the example below:

```
server {
        listen       80;
        server_name  app localhost .dev;

        set $basepath "/Users/zaiste/dev";

        set $domain $host;
        if ($domain ~ "^(.*)\.dev$") {
            set $domain $1;
        }
        set $rootpath "${domain}";
        if (-d $basepath/$domain/public) {
            set $rootpath "${domain}/public";
        }
        if (-f $basepath/$domain/index.html) {
            set $rootpath $domain;
        }

        root $basepath/$rootpath;

        # redirect server error pages to the static page /50x.html
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

For now on, we can just create a new directory under `/Users/zaiste/dev` with a
HTML file, and it will be automatically picked up by Nginx.

## Summary

General solutions are just great: we build it from proven components and they
are aimed for wider compatibility. Conventions are also great, but not when they
try to simplify what's already simple. Using Nginx for serving applications
locally is easy to set up and use. Moreover, the proposed solution is
language/technology agnostic, it can be used for Rails, Pyramid, AngularJS or
any other web technology.

[1]: http://pow.cx
[2]: http://www.thekelleys.org.uk/dnsmasq/doc.html
