
+++

+++
# Pi Hole

Pi Hole is a network-wide ad blocker. It can remove almost all ads on all devices without having to install an adblocker on each of these devices.

Pi Hole provides a DNS Server for all requests. Pi-Hole is place in between a device and the DNS server so that it blocks out any requests to known ad servers.

Pi Hole blocks ads on any device including the ones that do not allow you to make any modifications. It also reduces the bandwidth and it improves overall network performance.

$2 to $5 in electricity cost for the whole year to keep the Pi running 24/7.

Pi Hole can work with the WiFi, but a wired connection is better for reliability as DNS requests will depend on this.

Enable SSH by creating an empty file called `ssh` in the root folder on the SD card.

Additionally, set fixed IP for the Pi Hole device.

```bash
wget -O basic-install.sh https://install.pi-hole.net
sudo bash basic-install.sh
```

PiHole has DHCP capabilities, which means it can act as your DHCP server and assign IP addresses to your clients. However, most routers can do this well as well. Therefore, we are going to let your router handle that and not use PiHole’s DHCP server.

## Pi Hole Commands

### Pi Hole: Change Web Panel Password

```bash
pihole -a -p
```

### Pi Hole: Status, Realtime log and Statistics

```bash
pihole status
pihole -t tail log
pihole -c
```

### Pi Hole: Whitelist and Blacklist

List whitelisted domains:

```bash
pihole -w -l
```

Add a domain to the whitelist:

```bash
pihole -w example.com
```

Remove a domain from the whitelist:

```bash
pihole -w -d example.com
```

List blacklisted domains:

```bash
pihole -b -l
```

Add a domain to the blacklist:

```bash
pihole -b example.com
```

Remove a domain from the blacklist:

```bash
pihole -b -d example.com
```

### Pi Hole: Update

```bash
pihole -up
```

### Pi Hole: Query Logging

Turn query logging on:

```bash
pihole -l on
```

Turn query logging off:

```bash
pihole -l off
```

### Pi Hole: Enable & Disable

```bash
pihole enable
pihole disable
pihole disable 10m
pihole disable 60s
```

## Move Query Logging to RAM

Extensive writing can damage SD card. Move your logs to RAM instead of SD card.

https&#x3A;//github.com/azlux/log2ram

