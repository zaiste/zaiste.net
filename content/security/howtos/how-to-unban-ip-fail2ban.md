
+++

+++
# How to Unban an IP in fail2ban

Use the ```
undefined
``` command from the ```
undefined
```:

```shell 
sudo fail2ban-client set <jail> unbanip <ip>
```

e.g.

```shell 
sudo fail2ban-client set sshd unbanip 1.1.1.1
sudo fail2ban-client reload
```

