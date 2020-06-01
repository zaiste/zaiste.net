
+++
date = 2014-02-05T00:00:00.000Z


title = "Lightweight Docker experience on OSX"
topics = [ "docker", "macos" ]

+++

At the moment [Docker][1] runs only on Linux. On OSX you have to setup a VM with
Linux installed on it in order to use it. The most popular approach is by using
[Vagrant][2] but this VirtualBox abstraction seems heavy. There is another, more
lightweight way of interacting with a VM on OSX using great [boot2docker][3]
project. It spins up a small Linux distribution (called [Tiny Core Linux][4])
which runs from RAM, weights around 24 MB and boots in 5-6 seconds.

In this article I’ll guide through all necessary steps to create more
lightweight Docker experience on OSX.

## Install Docker client build for OSX

```
curl -o docker http://get.docker.io/builds/Darwin/x86_64/docker-latest
chmod +x ./docker
mv docker ~/bin
export DOCKER_HOST=localhost
```

```
docker version
Client version: 0.7.6
Go version (client): go1.2
Git commit (client): bc3b2ec
2014/02/05 16:19:18 dial unix /var/run/docker.sock: no such file or directory
```

We are getting an error because there is no Docker daemon listening on the
socket. We will fix that in a moment by using the daemon that sits on the VM.

## Install boot2docker

```
curl https://raw.github.com/steeve/boot2docker/master/boot2docker > boot2docker
chmod a+x boot2docker
mv boot2docker ~/bin/boot2docker
```

## Initialize the VM and then start it

```
boot2docker init
[2014-02-01 16:22:12] Creating VM boot2docker-vm
...
```

```
boot2docker up
[2014-02-01 16:22:52] Starting boot2docker-vm...
[2014-02-01 16:23:12] Started.
```

Check if you can `ssh` into it (password is `tcuser`)

```
boot2docker ssh
```

Export `DOCKER_HOST` as `localhost` so local Docker OSX client can communicate
with the socket on the VM

```
export DOCKER_HOST=localhost
```

Run `docker version` to check if it works.

```
docker version
Client version: 0.7.6
Go version (client): go1.2
Git commit (client): bc3b2ec
Server version: 0.7.6
Git commit (server): bc3b2ec
Go version (server): go1.2
```

Let’s pull our first image and try to run it

```
docker pull zaiste/postgresql
Pulling repository zaiste/postgresql
…
```

```
docker run -d zaiste/postgresql
docker ps
CONTAINER ID        IMAGE                      COMMAND                CREATED             STATUS              PORTS                    NAMES
daffafef1a96        zaiste/postgresql:latest   /bin/su postgres -c    14 minutes ago      Up About a minute   0.0.0.0:5432/tcp   insane_turing
```

You can also build a Docker client yourself. For that you will need [Go][5]
installed on your system. For OSX the easiest way is to get it using [Homebrew][6].

```
brew install go
```

```
go get -v github.com/dotcloud/docker/docker
...
mv tmp/bin/docker ~/bin/
```

Hopefully, those steps will make your interactions with Docker on OSX
simpler and more productive.

[1]: http://docker.io/
[2]: http://www.vagrantup.com/
[3]: https://github.com/steeve/boot2docker
[4]: http://tinycorelinux.net/
[5]: http://golang.org/
[6]: http://brew.sh/

