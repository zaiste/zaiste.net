---
created_at: 2015-01-21
kind: article
publish: true
title: "How to install FreeBSD on Hetzner"
tags:
- freebsd
---

FreeBSD may not be as popular or as well known as other operating systems, but
it steadly becomes an interesting alternative. [Facebook wants Linux networking as good as FreeBSD][3],
[FreeBSD Foundation Receives $1 Million from WhatsApp][4] and recently, DigitalOcean [introduced
FreeBSD droplets][2]. But if you prefer a dedicated machine instead of a virtual one,
it is also very easy to install FreeBSD on Hetzner.

## Install the base system

Log in to Hetzner [Robot][1]

Choose your server and select `Rescue` tab, as a OS choose `FreeBSD`. Click `Activate rescue system`. Note the root password for later use.

Choose `Reset` tab and `Send CTRL+ALT+DEL to the server` as a reset type. Click send.

After a few seconds, log in to your server

```
ssh root@<YOUR IP>
Password for root@rescue:
FreeBSD 10.1-RELEASE (GENERIC) #0 r274401: Tue Nov 11 21:02:49 UTC 2014

Welcome to mfsBSD, the memory based FreeBSD distribution.

This is a stripped-down version of FreeBSD without:
- manual pages, info pages, examples
- include files, static library files, development tools
- bind binaries (host, dig, named, etc.)

Feel free to email me with any bug reports or feature suggestions.
Martin Matuska <mm@FreeBSD.org>
http://mfsbsd.vx.sk/
[root@rescue ~]#
```

Run `bsdinstallimage` and choose most recent FreeBSD version (10.1) and 64 bit architecture. Make sure you use a proper keyboard map.

As a file system choose ZFS. Use `Stripe` as a virtual device type. Select your disk and confirm.

The system will start extracting the distribution files followed by a creation of a root account.

Next, choose a network interface. Select `Yes` for both IPv4, IPv6 and DHCP configuration.

Choose your timezone. Leave default selection for system configuration. If needed, add other user accounts. Confirm your final configuration and reboot with `shutdown -r now`

## Install additional software

Software can be installed as a binary package using `pkg` or from source using ports. The former method is preferred unless you need specific configuration. Both methods can be mixed if needed.

Configuration for the software that comes with the system is located in `/etc` while everything installed by the user is stored in `/usr/local` i.e. configuration in `/usr/local/etc`, startup scripts in `/usr/local/etc/rc.d` and binaries in `/usr/local/bin`.

Let’s install basic packages

```
pkg install sudo less vim-lite zsh
```

To check what is installed (either using `pkg` or with ports):

```
pkg info
```

To check if a new version of a software package is available:

```
pkg version
```

## Adjust configuration

Once restarted, log in with `ssh`. Let’s adjust SSH daemon configuration and disable root login and password authentication.

Open `/etc/ssh/sshd_config`, change `ChallengeResponseAuthentication` to `no` and `PermitRootLogin` to  `no`.

Restart SSH daemon

```
service sshd restart
```

In `.profile` switch PAGER from `more` to `less`.

[1]: https://robot.your-server.de/server
[2]: https://www.digitalocean.com/company/blog/presenting-freebsd-how-we-made-it-happen/
[3]: http://www.theregister.co.uk/2014/08/07/facebook_wants_linux_networking_as_good_as_freebsd/
[4]: http://www.theinquirer.net/inquirer/news/2382297/whatsapp-founder-showers-freebsd-with-usd1m-after-facebook-windfall
