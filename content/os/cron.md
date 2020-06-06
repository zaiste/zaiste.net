+++
title = "Cron"
+++

Every user on a system may have their own crontab file.

`cron` files are usually located under `/var/spool/cron`.

The `/etc/crontab` file is system-wide.

The `/etc/cron.d` directory may contain cron files. Some Linux distributions
have `/etc/cron.{hourly,daily,weekly,monthly}` directories

`cron.deny` specifies users who cannot use cron.

cron daemon will not catchup and run past queries in a case of the system being off (powered off or the daemon being stopped).

cron logs the actions via syslog (either `/var/log/cron` or `/var/log/syslog`).

## crontab

In the crontab file you cannot use `\` to extend a command over multiple lines.

cron requires that commands are terminated with a new line, including the last line.

