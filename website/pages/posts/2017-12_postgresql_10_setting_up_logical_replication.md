---
created_at: 2017-12-19
kind: article
publish: true
title: "PostgreSQL 10: Setting up Logical Replication"
tags:
- postgresql
sitemap:
  priority: 0.8
---

[Logical Replication](https://www.postgresql.org/docs/10/static/logical-replication.html) is available in PostgreSQL since version 10. It is based on [pgLogical](https://www.2ndquadrant.com/en/resources/pglogical/). It does not have all of its features, but still it provides a basic version of this powerful functionality. Logical Replication was primarily developed by Petr Jelinek and Peter Eisentraut from [2ndquadrant](https://www.2ndquadrant.com/en/).

Traditional replication works by transferring the write ahead log to the standby server which applies the changes. It is a low-level, binary format. Thus, the standby server is an exact copy of the master server.

Logical replication allows replicating at the level of particular tables, columns or rows. Thus, it is a logical change. It can consolidate multiple databases into a single one.

You can enable replication by changing `wal_level` to `logical` in `postgresql.conf`. From now on the write ahead log knows how to translate the binary changes back to logical ones.

On the master server create a publication:

```sql
CREATE PUBLICATION a_pub_name FOR TABLE a_table;
```

You can also set it to all tables:

```sql
CREATE PUBLICATION alltables FOR ALL TABLES;
```

On the slave server create a subscription. `host` can point to a remote location, you will need to adjust `pg_hba.conf` in that case.

```sql
CREATE SUBSCRIPTION a_sub_name
CONNECTION 'host=localhost port=5432 dbname=source_db'
PUBLICATION a_pub_name;
```

A subscription must be refreshed when new tables are added to the related publication; otherwise they won't be replicated.

```sql
ALTER SUBSCRIPTION testsub REFRESH PUBLICATION;
```

There are two monitoring views: `pg_stat_replication` which shows all the replication connections to the current server and `pg_stat_subscription` which shows status information about the subscription on the downstream server.
