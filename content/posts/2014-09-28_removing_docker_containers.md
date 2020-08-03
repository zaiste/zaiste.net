+++
date = 2014-09-28T00:00:00.000Z
title = "Removing Docker containers and images"
aliases = [
  "removing_docker_containers"
]
[taxonomies]
topics = [ "Docker" ]
+++

Playing with Docker can leave you with several stopped containers and unneeded,
intermediary images. This may waste substantial disk space. This article shows
how to efficiently remove such containers and images.

## List all exited containers

```
docker ps -aq -f status=exited
```

## Remove stopped containers

```
docker ps -aq --no-trunc -f status=exited | xargs docker rm
```

This command will **not** remove running containers, only an error message will be
printed out for each of them.

## Remove dangling/untagged images

```
docker images -q --filter dangling=true | xargs docker rmi
```

## Remove containers created after a specific container

```
docker ps --since a1bz3768ez7g -q | xargs docker rm
```

## Remove containers created before a specific container

```
docker ps --before a1bz3768ez7g -q | xargs docker rm
```

## Use `--rm` for `docker build`

Use `--rm` together with `docker build` to remove intermediary images
during the build process.
