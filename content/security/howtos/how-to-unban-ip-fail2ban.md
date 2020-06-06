
+++

+++
# How to Unban an IP in fail2ban

Use the `set` command from the `fail2ban-client`:

```shell
sudo fail2ban-client set <jail> unbanip <ip>
```

e.g.

```shell
sudo fail2ban-client set sshd unbanip 1.1.1.1
sudo fail2ban-client reload
```

