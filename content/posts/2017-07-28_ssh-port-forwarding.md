
+++
date = 2017-07-28T00:00:00.000Z
title = "SSH Port Forwarding"
aliases = [
  "ssh_port_forwarding"
]
[taxonomies]
topics = [ "SSH", "CLI" ]
+++

[SSH (Secure Shell)](https://en.wikipedia.org/wiki/Secure_Shell) is a widely used network protocol to securely log onto remote systems. One of its features is /SSH Port Forwarding/ (or SSH tunneling). This functionality forwards encrypted connections between a local and a remote computer. There are 3 types of port forwarding: local port forwarding, remote port forwarding and dynamic port forwarding.

## Local Port Forwarding

Local port forwarding is created with `-L` parameter.

```
ssh -L source_port:forward_to_host:destination_port via_host
```

This command connects to `via_host` from the local machine. `via_host` runs a SSH server. It then forwards all connection attempts to `source_port` on the local machine (a machine that initiated the `ssh` command) to `destination_port` port on the remote `forward_to_host` machine. `forward_to_host` machine must be reachable from the `via_host` machine. Forwarding can be also done through Unix sockets.

Here's an example.

```
ssh -L 8080:zaiste.net:80 acme
```

In this example we connect with `acme` machine. We then forward any connection to port `8080` on the local machine to port `80` on zaiste.net. As a result, opening `localhost:8080` in the browser actually makes a request to a HTTP server (port 80) listening on `zaiste.net`. You won't be, however, able to see its `index.html`  page. Read on to find out why.

By default, anyone (even on different machines) can connect to the specified port on the local machine. This can be restricted to programs on the same host by supplying a bind address:

```
ssh -L 127.0.0.1:8080:zaiste.net:80 acme
```

The request you are sending when hitting refresh in the browser for `localhost:8080` are being built with a `Host` destination header of `localhost` value. This request reaches the `zaiste.net` machine, but it's ignored as invalid virtual host designation (`localhost` cannot be a domain name on the server that runs `zaiste.net`).

Let's adjust the `Host` HTTP header so the remote web server properly identifies the corresponding destination.

```
curl -H "Host: zaiste.net" -L localhost:8080
```

`-L` parameter for `curl` is for following redirects. You should see now the content of `index.html`  from `zaiste.net` as long as you are connected to `acme` machine.

`forward_to_host` host may also refer to the remote machine through which the `ssh` connection is made (i.e. `via_host`). In that case we can just say `127.0.0.1` or `localhost` as it's local in the context of already established ssh connection with `via_host`. In other words, `127.0.0.1` or `localhost` refers to `via_host` machine.

```
ssh -L 4000:127.0.0.1:3306 acme
```

SSH binds to port 4000 on the local machine. Any traffic that comes to this port is sent to the SSH server that listens on `acme` (remote machine). Once received by `acme` the traffic is then sent to port `3306` of `127.0.0.1`, which is `acme` itself.

You can forward multiple ports in a single ssh command:

```
ssh -L 5544:127.0.0.1:4455 -L 3366:127.0.0.1:6633 via_host
```

Ports numbers less than `1024` or greater than `49151` are reserved for the system. Privileged ports (ports lower then `1024`) can only be forwarded by root.  If you're using local (or remote) port forwarding, you need to specify the destination server, i.e. `via_host`.

Let's say you need to connect to a PostgreSQL database on a remote `acme` machine. The PostgreSQL server only allows local connection for security reasons. PostgreSQL is running on the port 5432 on the remote `acme` machine.

```
$ ssh -L 9000:localhost:5432 acme
```

This command forwards the local port `9000` to the port `5432` on the `acme` machine. You can connect to that remote PostgreSQL server through the local machine using `psql` on `localhost:9000`.

Port forwarding is enabled by default. If not, check `AllowTcpForwarding` in `/etc/ssh/sshd_config`.

## Remote Port Forwarding

Remote port forwarding is created with `-R` parameter.

```
ssh -R source_port:forward_to_host:destination_port via_host
```

This command connects to `via_host`. `via_host` runs a SSH server. It then forwards all connection attempts to `source_port` on the remote `via_host` machine to `destination_port` port on the local machine (a machine that initiated the `ssh` command) . `forward_to_host` machine must be reachable from the the local machine machine. Forwarding can be also done through Unix sockets.

Here's an example

```
ssh -R 10123:127.0.0.1:123 acme
```

`ssh` connects to `acme`. `-R` makes `ssh` listen on the port `10123` of `acme`.  Once there's a process on `acme` connecting to 10123, `ssh` server listening on the same `acme` machine will transfer that connection to the local machine (a machine that initiated the `ssh` command) and then it'll be forwarded to `127.0.0.1` on the port `123`. Contrary to local port forwarding, `127.0.0.1` refers to the local machine i.e. a machine that initiated the `ssh` connection. In other words, remote port forwarding allows to map a port of the local machine onto the remote server via SSH.

The command for forwarding port 80 from your local machine (localhost) to the remote host on port 8000 is:

```
ssh -R 8000:localhost:80 via_host
```

This form of remote port forwarding requires an adjustment to the  SSH server configuration. You need to set `GatewayPorts` to `yes` inside `/etc/ssh/sshd_config`. It allows the SSH server to bind port 8000 on the wildcard address. This way the port becomes available to the public address of the `via_host` remote machine.

You can also set `GatewayPorts` to `clientspecified`. This way the remote port won't be bind on the wildcard address. SSH server binds to the loopback address by default. With this configuration setup, you need to explicitly specify an empty bind address for binding the wildcard address (public access to `via_host` on the port `8000`). It is done by prefixing the remote port with the `:` sign.

```
ssh -R :8000:localhost:80 via_host
```

You can also specify an IP address from which connections to the port are allowed.

```
ssh -R 7.7.7.7:8080:localhost:80 host147.aws.example.com
```

In this example, only connections from the IP address `7.7.7.7` to port 8080 are allowed.

If the remote server has `GatewayPorts` set to `no` with no possibility of changing it, you can achieve the same result by executing with a double forwarding. Execute the remote forwarding above followed by a local forwarding using `-g` option, but *from* the remote `via_host` server.

```
ssh -g -L 8001:localhost:8000 oli@remote-machine
```

`-g` allows remote hosts to connect to local forwarded ports. This will make loopback port `8000` on the server accessible on all interfaces on port `8001`.

How remote port forwarding can be useful? Let's consider the following example. At you work you have a FTP server on port `21` and accessible only from the internal network. From that internal network at work you can only access outside world on port `80` (web browsing). At home you have a SSH server. You configure it to listen on port `80`. Your home IP is `7.7.7.7`. You execute the following remote port forwarding from within your network at work.

```
ssh zaiste@7.7.7.7 -p 80 -R 5566:127.0.0.1:21
```

Once at home, you will be able to access the FTP server at work by pointing your FTP client to `localhost` on port `5566`.

Let's consider another scenario. You have a Rails application running locally on your computer on port `3000`. Your Internet provider don't assign public IPs. People from the external world (Internet) cannot access your home network. It's not possible to connect to your machine directly via the internet. You may, however, set up a remote port forwarding to allow this.

```
ssh -R 7000:127.0.0.1:3000 via_host
```

People will be able to access your Rails application on port `3000` by pointing their browser to `via_host` IP address on the port `7000`.

## Dynamic Port Forwarding (SOCKS)

Dynamic Port Forwarding allows a communication not on a single port, but across a range of ports. This port forwarding is created using `-D` parameter. This option will make SSH acts as a SOCKS proxy server.

SOCKS5 is an internet protocol which routes packets between a server and a client using a proxy server. SOCKS5 proxy servers use both TCP and UDP protocols (SOCKS4 only uses TCP).  A SOCKS proxy is simply a SSH tunnel in which specific applications forward their traffic down the tunnel to the remote server, and then on the server end, the proxy forwards the traffic out to the general Internet. Unlike a VPN, a SOCKS proxy has to be configured for each application separately on the client machine. There is, however, no need to install 3rd party applications to use it.

Proxies usually rewrite data packet headers. This may leads to decrease performance and mislabeling errors. SOCKS5 proxy servers do not rewrite data packet headers. They are more performant and less prone to data routing errors. Unlike HTTP proxies which can only interpret and work with webpages, SOCKS5 proxies can work with any kind of traffic. This is because SOCKS proxy servers are low-level proxies that can handle any program, protocol and any type of traffic.

Dynamic Port Forwarding can handle connections from multiple ports. It analyzes the traffic to determine the proper destination for the given connection. For example, a browser configured to use it as a SOCKS proxy can then access HTTP, HTTPS, FTP, etc. over the same connection. If you're using dynamic port forwarding, you need to configure programs to use a SOCKS proxy server.

Here's an example.

```
ssh -D 8123 -f -C -q -N via_host
```

`-D` tells SSH to create a SOCKS tunnel on the the port `8123`. `-f` forks the process to the background. `-C` compresses the data before sending it. `-q` enables quiet mode. `-N` tells SSH that no command will be sent once the tunnel is up.

## Tips & Tricks


The `-nNT` flags will cause SSH to not allocate a tty and only do the port forwarding.

```
$ ssh -nNT -L 9000:imgur.com:80 user@example.com
```






