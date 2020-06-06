
+++

+++
# How To Setup a Firewall using UFW on Ubuntu 18.04

Ubuntu comes with a firewall configuration tool called UFW (Uncomplicated Firewall). UFW is a user-friendly front-end for managing iptables firewall rules. Its goal is make managing iptables easier.

## UFW: Check Firewall Status

```bash
sudo ufw status
```

## UFW: Default Policies

By default, UFW will block all of the incoming connections and allow all outbound connections. Protocols such as HTTP/S or SSH must be explicitly whitelisted.

## UFW: Application Profiles

`apt` may add an UFW application profile. Those profiles are stored in the
`/etc/ufw/applications.d/` directory. Each profile contains UFW settings for
that particular application

List all UFW application profiles:

```bash
sudo ufw app list
```

Display more information about each UFW application profile and its rules:

```bash
sudo ufw app info 'Nginx Full'
```

## UFW: Allow Incoming Connections

Allow incoming SSH connections:

```bash
sudo ufw allow ssh
```

If the ssh daemon listens on a different port e.g. 5522:

```bash
sudo ufw allow 5522/tcp
```

## UFW: Active/Enable Firewall

Activate (or Enable) the firewall:

```bash
sudo ufw enable
```

## UFW: Allow Port Ranges

Allow access to port ranges:

```bash
sudo ufw allow 7100:7200/udp
```

## UFW: Allow Specific IPs

```bash
sudo ufw allow from 1.1.1.1
```

## UFW: Allow Specific IPs with Specific Ports

```bash
sudo ufw allow from 1.1.1.1 to any port 1234
```

## UFW: Allow Subnets

Allow connections from a range of IPs addresses by specifying a subnet:

```bash
sudo ufw allow from 192.168.1.1/24 to any port 5432
```

## UFW: Allow Specific Network Interfaces

```bash
sudo ufw allow in on eth1 to any port 5432
```

## UFW: Deny Specific IPs

```bash
sudo ufw deny from 1.1.1.1
```

## UFW: Deny Specific IPs with Specific Ports

```bash
sudo ufw deny from 1.1.1.1 to any port 80
```

## UFW: Insert Rules with Higher Priority

The order in which the rules are added is the order that UFW will use when processing an incoming connections. A general rule to allow SSH access on port 22 will pass through everyone, even if (later on) a specific IP address is blocked from the incoming connections.

Add a rule at the top of the rule chain (the highest priority):

```bash
sudo ufw insert 1 <rule> comment 'block specific person'
```

