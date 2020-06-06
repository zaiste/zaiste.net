+++
date = 2018-03-05T00:00:00.000Z
title = "Intro to fail2ban with ufw"
aliases = [
    "intro_fail2ban_with_ufw"
]
[taxonomies]
topics = [ "Linux" ]
[extra]
priority = 0.8
+++

[fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page) is configured by default to only ban failed SSH login attempts. Check the current configuration with the following command:

    sudo fail2ban-client status

    Status
    |- Number of jail:	1
    `- Jail list:	sshd


## Setup

Let's start by configuring `fail2ban` to use `ufw` instead of `iptables`. Verify
that there is a `ufw.conf` inside `/etc/fail2ban/action.d/` directory.

Copy `jail.conf` to `jail.local` to prevent changes from
being overwritten if a package update provides a new default file.

    cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

Open `/etc/fail2ban/jail.local` and find `banaction` directive. Change its value to
`ufw` as shown below.

    banaction = ufw


## Enable filters

`fail2ban` comes with many, ready-to-use filters. They are stored in
`/etc/fail2ban/filter.d/` directory. Let's enable `nginx-botsearch` filter. This
is done via jails which connect filters (regex) with actions (mainly banning).

Let's create a custom jail to list one or more filters and their actions. It
will be placed under `/etc/fail2ban/jail.d/` as `custom.conf` with the following
content:

    [nginx-botsearch]
    enabled = true
    port = http,https
    filter = nginx-botsearch
    logpath = /var/log/nginx/access.log
    maxretry = 2
    findtime = 120

`filter` specifies which filter to use while `enabled` set to `true` makes it
active. `bantime` specifies how many seconds an offending IP is banned for. If a client makes more than `maxretry` attempts within the amount of time set by `findtime`, they will be banned. Each filter match increments the counter within its jail. The counter is set to zero if no match is found within `findtime` seconds.

The last step is to reload `fail2ban`

    sudo fail2ban-client reload

Verify that the jail is enabled:

    sudo fail2ban-client status

    Status
    |- Number of jail:	2
    `- Jail list:	nginx-botsearch, sshd


## Create filters

It is easy to extend `fail2ban` with additional custom filters. Let's create a
filter to prevent requests for scripts that's compatible with Nginx logs. It
will be called `nginx-noscript` stored under `/etc/fail2ban/filter.d/`.

    [Definition]
    failregex = ^<HOST> -.*GET.*(\.php|\.asp|\.exe|\.pl|\.cgi|\.scgi)
    ignoreregex =

The regular expression can be tested against existing using `fail2ban-regex`.
This allows to verify if the expression catches the right entries.

    fail2ban-regex /var/log/nginx/access.log /etc/fail2ban/filter.d/wp-login.conf

    Running tests
    =============

    Use   failregex filter file : nginx-noscript, basedir: /etc/fail2ban
    Use         log file : /var/log/nginx/access.log
    Use         encoding : UTF-8


    Results
    =======

    Failregex: 1109 total
    |-  #) [# of hits] regular expression
    |   1) [1109] ^<HOST> -.*GET.*(\.php|\.asp|\.exe|\.pl|\.cgi|\.scgi)
    `-

    Ignoreregex: 0 total

    Date template hits:
    |- [# of hits] date format
    |  [42531] Day(?P<_sep>[-/])MON(?P=_sep)Year[ :]?24hour:Minute:Second(?:\.Microseconds)?(?: Zone offset)?
    `-

    Lines: 42531 lines, 0 ignored, 1109 matched, 41422 missed [processed in 2.80 sec]
    Missed line(s): too many to print.  Use --print-all-missed to print all 41422 lines

As before, it needs to be enabled. Open `/etc/fail2ban/jail.d/custom.conf` and
add the following snippet:

    [nginx-noscript]
    enabled = true
    port = http,https
    filter = nginx-noscript
    logpath = /var/log/nginx/access.log
    maxretry = 2
    findtime = 120

Reload `fail2ban`

    sudo fail2ban-client reload

Check if the new jail is active:

    sudo fail2ban-client status

    Status
    |- Number of jail:	2
    `- Jail list:	nginx-botsearch, sshd


## Additional

Check the details of the bans being enforced by a particular filter

    sudo fail2ban-client status nginx-noscript

    Status for the jail: nginx-noscript
    |- Filter
    |  |- Currently failed:	0
    |  |- Total failed:	37
    |  `- File list:	/var/log/nginx/access.log
    `- Actions
       |- Currently banned:	2
       |- Total banned:	17
       `- Banned IP list:	2.2.2.2 1.1.1.1

Manually un-ban an IP address

    sudo fail2ban-client set nginx-noscript unbanip 1.1.1.1
