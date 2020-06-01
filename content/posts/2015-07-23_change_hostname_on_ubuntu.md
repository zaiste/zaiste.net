
+++
date = 2015-07-23T00:00:00.000Z


title = "Change hostname on Ubuntu"
topics = [ "ubuntu", "sysadmin" ]

+++

Before Ubuntu `13.04` you could use `hostname` command along with changing host
names in `/etc/hosts`. Now, you can use `hostnamectl` which comes as a part of
the `systemd-services` package, which is installed by default.

    sudo hostnamectl set-hostname <new-hostname>

Unfortunately, you must to separately adjust `/etc/hosts`.
