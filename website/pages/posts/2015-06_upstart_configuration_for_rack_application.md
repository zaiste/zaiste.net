---
created_at: 2015-06-24
kind: article
publish: true
title: "Upstart configuration for a Rack application"
tags:
- ubuntu
- rack
- upstart
---

Let's start with the simplest possible [Rack][1] application.

`config.ru`:

```
run lambda {|env| [200, {'Content-Type'  => 'text/plain'}, ["Hello, Zaiste!"]]}
```

Run it with `rackup` and see if it works using `curl`:

```
curl localhost:9292
Hello, Zaiste!
```

Our goal is to create an [Upstart][2] configuration, so the application is
managed through `service` command and starts whenever the server boots.

Upstart is a process initialization tool: it starts tasks and services during
boot, stops them during shutdown and supervises them while the system is
running. It replaces standard `init` daemon and brings additional features that
simplify the initialization process management.

Each task (a process that performs one time, specific execution) or service (a
process which runs in the background) is described using a configuration file.
Here's an example of a service that manages our Rack application. Both tasks and
services are named jobs in the Upstart realm.

User jobs run in the user's own session while system jobs run system-wide with
`PID 1` designation; their configuration is stored in the `/etc/init/` directory.

`/etc/init/zaiste-rack.conf`:

```
description "Simple Rack application"
author      "Zaiste"

start on filesystem or runlevel [2345]
stop on shutdown

script
    export HOME="/home/zaiste"
    echo $$ > /var/run/zaiste-rack.pid
    exec /usr/local/bin/rackup /home/zaiste/config.ru
end script

pre-start script
    echo "[`date`] zaiste-rack starting..." >> /var/log/zaiste-rack.log
end script

pre-stop script
    rm /var/run/zaiste-rack.pid
    echo "[`date`] zaiste-rack stopping..." >> /var/log/zaiste-rack.log
end script
```

`init-checkconf` allows to test the syntax of our Upstart configuration file.

```
init-checkconf /etc/init/zaiste-rack.conf
File /etc/init/zaiste-rack.conf: syntax ok
```

From now on, we can use `service` command to manage our application, i.e.

* `sudo service zaiste-rack start` to start it
* `sudo service zaiste-rack stop` to stop it
* `sudo service zaiste-rack status` to check its status
* `sudo service zaiste-rack restart` to restart it

[1]: http://rack.github.io/
[2]: http://upstart.ubuntu.com/
