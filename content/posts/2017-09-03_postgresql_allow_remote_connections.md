
+++
date = 2017-09-03T00:00:00.000Z


title = "PostgreSQL: Allow Remote Connections"
topics = [ "postgresql" ]

+++

```bash
$ netstat -nlt
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN
```

Port `5432` is bound to `127.0.0.1`. It means any attempt to connect to the PostgreSQL server from outside the machine will be rejected.

Edit `postgresql.conf` by changing `listen_addresses = 'localhost'` to `listen_addresses = '*'`. Restart PostgreSQL server

```
sudo systemctl restart postgresql
```

From now on `Local Address`” for port `5432` should change to `0.0.0.0`.

You should be now able to initiate a remote connection. Replace `1.1.1.1` with the IP of your PostgreSQL server.

```
$ psql -h 1.1.1.1 -U postgres
psql: could not connect to server: Connection refused
	Is the server running on host "1.1.1.1" and accepting
	TCP/IP connections on port 5432?
```

Bounding to `0.0.0.0`  interface is not enough. Remote connections also need a proper authentication rule being set in `pg_hba.conf`. By adding the following entry at the end, you will allow connections from any IP.

```
host    all             all              0.0.0.0/0                       md5
host    all             all              ::/0                            md5
```

You can also set IPs that can connect to this PostgreSQL server explicitly. The following configuration allows only connections from a machine `9.9.9.9`.

```
host    all             all              9.9.9.9/0                       md5
```
