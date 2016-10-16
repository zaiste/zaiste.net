---
created_at: 2015-06-20
kind: article
publish: true
title: "Basic HTTP authentication in Nginx"
tags:
- nginx
---

Use Nginx's `auth_basic` and `auth_basic_user_file` directives in order to
configure basic HTTP authentication. They can be set directly within `server` or
per `location`.

```
server {
  ...
  auth_basic "Restricted Content";
  auth_basic_user_file /etc/nginx/.htpasswd;
}
```

`auth_basic` specifies a realm name to be displayed for users when prompting for
credentials; `auth_basic_user_file` points to the password file.

```
printf "zaiste:$(openssl passwd -crypt zaiste)\n" >> /etc/nginx/.htpasswd
```
