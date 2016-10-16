---
created_at: 2012-07-14
kind: article
publish: true
title: "logrotate for virtual host logs"
tags:
- devops
---

In this post I'll explain how to set up log rotation for virutal host logs. This
setup is independant of the web server being used.

Let's start by creating a separate configuration file:

```
vim /etc/logrotate.d/vhost
```

In that file we specify which log files should be automaticaly rotated. In our case
we will use a regular expression that matches files somewhere inside `/srv/www/` but from
the `logs/` directory and with the `.log` ending.

```
/srv/www/*/logs/*.log {
  rotate 8
  weekly
  size 256M
  compress
  delaycompress
  sharedscripts

  postrotate
    /usr/sbin/apache2ctl graceful > /dev/null
  endscript
}
```

This configuration has the following characteristics:

 * rotate logs 8 times
 * rotate logs on a weekly basis
 * rotate logs if logs file are bigger than 256M
 * compress logs when they're archived
 * delay compress till next rotation
 * `sharedscripts` means that the postrotate script is executed once for all logs matching the wildcarded pattern
