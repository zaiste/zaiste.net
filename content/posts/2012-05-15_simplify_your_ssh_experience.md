
+++
date = 2012-05-15T00:00:00.000Z


title = "Simplify your SSH experience"
topics = [ "ssh", "cli" ]

+++

I manage too many remote servers to be able to remember their IP addresses, usernames and passwords. The key to simplify this experience is a proper [SSH](http://www.openssh.org/) configuration. By adjusting `.ssh/config` file you can easily create a memorable alias, along with particular settings for any server you use.

TL;DR
-----

Use public/private key authentication to avoid entering password each time you connect to the server.  Create an alias for each server within `.ssh/config` using the syntax below

``` bash
Host alias-name
  HostName my.realm.com/or-ip
  User zaiste
```

and connect to it like so

```
λ ssh alias-name
```


Public/Private Key Authentication
---------------------------------

When you connect to a remote server you must enter a password in order to authenticate yourself. This step, however, can be easily avoided using public/private key authentication. The setup is pretty straightforward. First of all, you have to generate a public/private key pair:

```
λ ssh-keygen -t rsa -C '<your email>'
```

It is a good idea to choose a strong password. If you want to change the password for a specific key use `ssh-keygen` wth `-p` option. Additionaly a `-f` option can be use to specify a key file to use.

Next, copy the content of `.ssh/id_rsa.pub` file and add it to `.ssh/authorized_keys` on a remote server which you want to connect with. If the file (or directory) doesn't exist, simply create it. Now you should be able to connect to that server without entering your password

```
λ ssh zaiste@my.realm.com
```

It is also a good idea to have multiple keys, separated for each remote place or keys used with a specific group e.g. private, client specific, etc. This enhances the security in case any of the authentication key pairs are compromised.


Alias Configuration
-------------------

Let's make now a server alias, so we don't have to remember entire domain name or IP address each time we want to connect to it. Open your `.ssh/config` and add something like this.

```
Host my
   HostName my.realm.com
   User zaiste
```

Don't forget to adjust it for your case.

Such configuration will reduce ssh invocation to the following line

```
λ ssh my
```

For each entry you can adjust connection settings like port number or which private key to use. Take a look at SSH documentation for [possible options](http://netbsd.gw.com/cgi-bin/man-cgi?ssh+1)


Specifing Private Key
---------------------

By default for each server the same key pair is used. In order to change this behaviour we have to use `IdentityFile` option which specifies a private key to use for authentication with the given host, e.g.

```
Host client
   HostName client.server.com
   User p45dazz
   IdentityFile ~/.ssh/client.key
```

This can be pretty useful when you are working within different organization on GitHub.

```
Host ghn
  User git
  HostName github.com
  IdentityFile ~/.ssh/nukomeet.key
```

With such entry I can now clone from a specific organization using even more succinct command

```
λ git clone ghn:nukomeet/some_repository.git
```


Tunneling
---------

For security reason, you can leave only a limited number of open ports (on the server which you have control of), e.g  `80/443` for web and `22` for SSH. Now, In order to connect to specific services, we can simply tunnel them using the following command:

```
λ ssh -f -N -L 9906:127.0.0.1:27017 zaiste@db.example.com
```

It means that a remote port number `27017` (MongoDB server) is mapped to a local port `9906`. Now, by connecting to `localhost:9906` you will have access to a remote MongoDB server. There are two additional options `-f` which puts ssh in background and `-N` which does not execute a remote command. As before, if you use such command frequently, it can be saved to `.ssh/config` like so:

```
Host tunnel
  HostName db.example.com
  IdentityFile ~/.ssh/zaiste.key
  LocalForward 9906 127.0.0.1:27017
  User zaiste
```
