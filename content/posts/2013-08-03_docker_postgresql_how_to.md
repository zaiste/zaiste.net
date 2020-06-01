
+++
date = 2013-08-03T00:00:00.000Z


title = "Docker PostgreSQL How-To"
topics = [ "docker", "postgresql", "howto" ]

+++

[Docker][1] is one of the most exciting open source project right now. In short,
it allows to easily create lightweight, portable, self-sufficient containers
that can run any application, e.g. PostgreSQL service.

Back in June I created a Docker image for PostgreSQL service which became pretty
popular on Docker Index. In this article, I'll show how to use this image and
how I built it.

## PostgreSQL service Prêt-à-Porter

[The image][2] I create allows you to easily launch with a running instance of
PostgreSQL.  It's no longer necessary to go through the usual pain of installing
PostgreSQL server locally. Docker nicely encapsulates the whole process. Below is
a slightly more verbose version of [this gist][3].

*Note:* As of version 0.5.2, docker requires root privileges to run.
You have to either manually adjust your system configuration (permissions on
/var/run/docker.sock or sudo config), or prefix `docker` with `sudo`. Check
[this thread][5] for details.

Fetch the image from Docker Index.

```
docker pull zaiste/postgresql
```

Run it, whether as a daemon or with the container output attached to your
terminal screen.

```
CONTAINER=$(docker run -d zaiste/postgresql)
```

Identify which IP address has been assigned to this container

```
CONTAINER_IP=$(docker inspect $CONTAINER | grep IPAddress | awk '{ print $2 }' | tr -d ',"')
```

Finally, connect to PostgreSQL service (running on Docker) with `psql`.

```
psql -h $CONTAINER_IP -p 5432 -d docker -U docker -W
```

*Note:* `psql` must be installed locally.

Now it's all set up and ready. You can create roles and databases using `psql`.

```
psql (9.2.4)
Type "help" for help.

docker=# CREATE DATABASE foo OWNER=docker;
CREATE DATABASE
```

Enjoy.

## Installing PostgreSQL on Docker

Let's now go through the process of creating a Docker image that provides
a PostgreSQL service. For clarity I won't be showing commands output.

Run an interactive shell in Docker container.

```
docker run -i -t ubuntu /bin/bash
```

Update its dependencies.

```
apt-get update
```

Install `python-software-properies`.

```
apt-get install python-software-properties
apt-get install software-properties-common
```

Add Pitti's PostgreSQL repository. It contains the most recent stable release
of PostgreSQL i.e. `9.2`.

```
add-apt-repository ppa:pitti/postgresql
apt-get update
```

Finally, install PostgreSQL 9.2

```
apt-get -y install postgresql-9.2 postgresql-client-9.2 postgresql-contrib-9.2
```

Now, create a PostgreSQL superuser role that can create databases and other roles.
Following Vagrant's convention the role will be named `docker` with `docker`
password assigned to it.

```
sudo -u postgres createuser -P -d -r -s docker
```

Create a test database also named `docker` owned by previously created `docker`
role.

```
sudo -u postgres createdb -O docker docker
```

Adjust PostgreSQL configuration so that remote connections to the database are
possible. Make sure that inside `/etc/postgresql/9.2/main/pg_hba.conf` you have
following line:

```
host    all             all             0.0.0.0/0               md5
```

Additionaly, inside `/etc/postgresql/9.2/main/postgresql.conf` uncomment
`listen_address` so it is as follows:

```
listen_address='*'
```

*Note:* this PostgreSQL setup is for development only purposes. Refer to
PostgreSQL documentation how to fine-tune these settings so that it is enough
secure.

Exit the container, create an image and assign it a name. `<container_id>` is in
the Bash prompt; you can also locate it using `docker ps -a`.

```
docker commit <container_id> <your username>/postgresql
```

Finally, run PostgreSQL server via `docker`.

```
CONTAINER=$(docker run -d -p 5432 \
  -t <your username>/postgresql \
  /bin/su postgres -c '/usr/lib/postgresql/9.2/bin/postgres \
    -D /var/lib/postgresql/9.2/main \
    -c config_file=/etc/postgresql/9.2/main/postgresql.conf')
```

Connect the PostgreSQL server using `psql`.

```
CONTAINER_IP=$(docker inspect $CONTAINER | grep IPAddress | awk '{ print $2 }' | tr -d ',"')
psql -h $CONTAINER_IP -p 5432 -d docker -U docker -W
```

As before, create roles or databases if needed.

```
psql (9.2.4)
Type "help" for help.

docker=# CREATE DATABASE foo OWNER=docker;
CREATE DATABASE
```

Additionally, publish there your newly created image on Docker Index.

```
docker login
Username: <your username>
[...]
```

```
docker push <your username>/postgresql
```

## PostgreSQL service auto-launch

Running our image seems complicated. We have to specify the whole command with
`docker run`. Let's simplify it so the service starts automatically when the
container starts.

```
docker commit <container_id> <your username>/postgresql -run='{"Cmd": \
  ["/bin/su", "postgres", "-c", "/usr/lib/postgresql/9.2/bin/postgres -D \
  /var/lib/postgresql/9.2/main -c \
  config_file=/etc/postgresql/9.2/main/postgresql.conf"], PortSpecs": ["5432"]}
```

From now on, just type `docker run <your username>/postgresql` and PostgreSQL
should automatically start.

## Summary

We learnt how to use [zaiste/postgresql][2] image to launch PostgreSQL server on
Docker and how to create the exact same image manually. In the next article,
I'll show how to simplify the process of creating a Docker image using a
`Dockerfile`.

You can discuss this post on [HN][4].

[1]: http://docker.io/
[2]: https://index.docker.io/u/zaiste/postgresql/
[3]: https://gist.github.com/zaiste/5735631
[4]: https://news.ycombinator.com/item?id=6198470
[5]: https://groups.google.com/forum/?fromgroups#!topic/docker-club/P3xDLqmLp0E
