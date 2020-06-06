+++
date = 2015-05-07T00:00:00.000Z
title = "PostgreSQL: Unix domain socket vs TCP/IP loopback"
aliases = [
  "postgresql_unix_socket_vs_tcpip_loopback"
]
[taxonomies]
topics = [ "PostgreSQL" ]
+++

PostgreSQL will use TCP/IP loopback (if you specify `localhost`, otherwise
if you specify nothing, it will use Unix domain socket.

Unix domain socket are similar to system pipes i.e. they only send data
without checksums or other meta information, contrary to TCP/IP sockets
that use a three-way handshake; in other words data carried over Unix
sockets doesn't have to through the TCP/IP layers; there is also fewer
context switches.

Bruce Momjian (a PostgreSQL core developer) made [a benchmark][1] which
measured query network performance and showing that Unix socket
communication was 33% faster than using the TCP/IP stack.

[1]: http://momjian.us/main/blogs/pgblog/2012.html#June_6_2012
