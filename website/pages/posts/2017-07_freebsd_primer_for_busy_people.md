---
created_at: 2017-07-09
kind: article
publish: true
title: "FreeBSD Primer for Busy People"
tags:
- freebsd
- '101'
---

This is *work-in-progress*.

## Software

There are two ways to install software in FreeBSD: binary packages and compiled ports. Binary packages provide faster installation with simpler process while ports allow customization. In most cases, you should stick with binary packages; they are similar to `.deb` files on Debian/Ubuntu based systems and `.rpm` files on Red Hat/Fedora based systems. Binary packages are managed using `pkg` command.  A port is a collection of files designed to automate the process of compiling an application from source code. It contains all information to install it (i.e.  how to download, extract, patch, compile, and install it).


### Install software

```
pkg install sudo
```

Update the `pkg` repository index.

```
sudo pkg update -f
```

### Upgrade software

```
pkg update
pkg upgrade
```

### Find software

In packages:
```
pkg search git
```

In ports:
```
whereis git
```

Alternative, in ports:

```
cd /usr/ports
```
```
make search name=git
```
```
make quicksearch name=git
```

When using search or quicksearch, the search string is case-insensitive.

## System

### Update FreeBSD

Check if there are new patches for FreeBSD kernel and main system libraries

```
freebsd-update fetch
freebsd-update install
```

If kernel was patched, restart is needed

```
shutdown -r now
```

### Schedule security updates

Security updates scheduled to be applied daily

```
printf '@daily root    freebsd-update cron' >> /­­etc/­cron
```

### Timezone

Set the timezone

```
tzsetup
```

Enable NTP daemon so servers stay in sync.

```
printf 'ntpd_enable="YES"\nntpd_sync_on_start="YES"' >> /­etc/rc.conf
```

Start NTP daemon

```
service ntpd start
```

### Firewall

Only allow SSH

```
printf 'firewall_enable="YES"\nfirewall_quiet="YES"\nfirewall_type="workstation"\nfirewall_myservices="22/tcp"\nfirewall_allowservices="any"\nfirewall_logdeny="YES"' >> /­etc/rc.conf
```

Limit the number of logs per IP address:

```
printf 'net.inet.ip.fw.verbose_limit=5' >> /­etc/sysctl.conf
sysctl net.inet.ip.fw.verbose_limit=5
```

Save firewall rules in `/usr/local/etc/ipfw.rules`

```
$IPF 70 allow all from any to any out keep-state
$IPF 80 allow icmp from any to any
# open port ftp

$IPF 110 allow tcp from any to any 21 in
$IPF 120 allow tcp from any to any 21 out

# 22 for ssh
$IPF 130 allow tcp from any to any 22 in
$IPF 140 allow tcp from any to any 22 out

# mail port 25

$IPF 150 allow tcp from any to any 25 in
$IPF 160 allow tcp from any to any 25 out

# dns (53) udp and tcp in
$IPF 170 allow udp from any to any 53 in
$IPF 175 allow tcp from any to any 53 in

# dns (53) udp and tcp out
$IPF 180 allow udp from any to any 53 out
$IPF 185 allow tcp from any to any 53 out

# http (80),
$IPF 200 allow tcp from any to any 80 in
$IPF 210 allow tcp from any to any 80 out
# deny and log everything
$IPF 500 deny log all from any to any
```

Reference the rules in `/etc/rc.conf`

```
firewall_script="/usr/local/etc/ipfw.rules"
```

Start the firewall

```
service ipfw start
```

See firewall rules

```
ipfw list
```

### Swap file

Swap is used as an addition to RAM and can help with system stability. The swap file can be made anywhere and named anyhow. Generally the swap file should be about the size of RAM.

```
truncate -s 2G /swapf
chmod 0600 /swapf
```

Add a device that is linked to this new file and get it configured to mount at boot

```
sudo sh -c 'echo "md99 none swap sw,file=/swapf,late 0 0" >> /etc/fstab'
```

Check if this has been appended to fstab

```
cat /etc/fstab
```

Perform swapon

```
swapon -aqL
```

Check `swapinfo` whether the swap file is set up:

```
sudo swapinfo -g
```

## User

### Create user & assign to group

Create a user, assign it to `wheel` group and then set their password:

```
pw useradd zaiste -g wheel
```

```
passwd zaiste
```

## Shell

### Install Zsh

```
pkg install zsh
```

By default, zsh looks for system-wide defaults in `/usr/local/etc`. If you previously set up `/etc/zprofile`, `/etc/zshenv` either move them to `/usr/local/etc` or rebuild zsh with the `ETCDIR` option enabled.

```
chsh -s /usr/local/bin/zsh zaiste
```


