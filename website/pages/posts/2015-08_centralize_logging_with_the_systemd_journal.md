---
created_at: 2015-08-17 
kind: article
publish: true
title: "Centralize logging with the systemd journal"
image: "systemd.jpg"
tags:
- systemd
- devops
---

the `systemd` journal is a useful tool for collecting and managing system and
application logs which are usually dispersed throughout the system and handled
by different daemons and processes. It’s a centralized management solution to
standardize logging of all kernel, initrd and userland processes and collecting
these logs as the journal regardless of where the messages are originating. This
journal is implemented with the `journald` daemon and stores the data in a
binary format (which can easily be as outputted as JSON or other format). You
interact with the data using a single command called `journalctl`.

`systemd` journal can be used to complement an existing `syslog` implementation
(as it collects data from more sources than traditional syslog implementations
  are capable of) or to replace the `syslog` functionality entirely.

## Filter logs by time

Display all of the logs collected since the most recent reboot

    journalctl -b

See the logs from the previous boot where `-1` is a relative pointer

    journalctl -b -1

List boots that `journald knows`

    journalctl --list-boots

Display all of the logs collected logs since `Aug 16th, 2015 at 1:03 AM`

    journalctl --since "2015-08-16 01:03:00"

If the time segment is missing, `00:00:00` (midnight) will be substituted. You don’t need to specify seconds.

    journalctl --since "2015-05-03" --until "2015-06-12 13:16"

Display the logs from yesterday

    journalctl --since yesterday

Display the logs in a specific time range with relative date

    journalctl --since 11:00 --until “2 hours ago"

## Filter logs by service

Display all of the logs from Nginx

    journalctl -u nginx.service

Display all of the logs from Nginx collected today

    journalctl -u nginx.service --since today

Display the logs by `pid` or `gid`

```
journalctl _PID=8088
```

Display only these kernel messages

    journalctl -k

Display only these kernel messages from 2 boots ago

    journalctl -k -b -2

Display only logs of a specified priority (or above)

    journalctl -p err -b

The journal adheres the standard syslog message levels (highest to lowest priority)

```
0: emerg
1: alert
2: crit
3: err
4: warning
5: notice
6: info
7: debug
```

## Adjust logs output

Output all of the logs from Nginx in JSON by typing:

    journalctl -b -u nginx -o json

or

    journalctl -b -u nginx -o json-pretty

Some of the available formats:

- `cat`: only the message field itself.
- `export`: a binary format
- `json` or `json-pretty`
- `short`: the default syslog style output
- `short-iso`: the default format wth ISO 8601 timestamps

## Monitor logs

Display last 20 log entries

    journalctl -n 20

Follow the logs as they are being written (similar to `tail -f`):

    journalctl -f

Find out the amount of space used by the journal

    journalctl --disk-usage

Shrink the journal to the requested size: :

    journalctl --vacuum-size=3G

Shrink the journal to keep entries up to one year in the past

    journalctl --vacuum-time=1years

Check current time configuration

```
timedatectl status
      Local time: Mon 2015-04-27 13:49:46 CEST
  Universal time: Mon 2015-04-27 11:49:46 UTC
        RTC time: Mon 2015-04-27 11:49:46
       Time zone: Europe/Paris (CEST, +0200)
 Network time on: yes
NTP synchronized: yes
 RTC in local TZ: no
```
