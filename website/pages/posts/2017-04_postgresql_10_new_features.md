---
created_at: 2017-04-16 
kind: article
publish: true
title: "PostgreSQL 10 New Features"
tags: 
- postgresql
---

## Logical replication

*Logical replication* allows table-level granularity, from multiple clusters to single cluster, of a single table to multiple clusters, it can be used between major PostgreSQL versions. It can create local objects on subscribers e.g. table indexes.

## Partitioning 

Partitioning is a simpler version of table inheritance: the parent table is always empty while child tables (partitions) have implicit constraints defined. Those contrains determine which partition will have a tuple added when this is inserted into the parent.

```sql
CREATE TABLE numbers (x INTEGER) PARTITION BY RANGE (x);
CREATE TABLE negatives PARTITION OF numbers FOR VALUES FROM (UNBOUNDED) TO (0);
CREATE TABLE positives PARTITION OF numbers FOR VALUES FROM (0) TO (UNBOUNDED)
```

```
INSERT INTO numbers VALUES (-3), (-1), (9), (99);
```

```
SELECT * FROM numbers;
```

```
x
----
-3
-1
9
99
```

```
SELECT * FROM negatives;
```

```
x
----
-3
-1
```

```
SELECT * FROM positives;
x
----
9
99
```

Partitioning creates child constrains accordingly and it routes parent `INSERT` into child tables. As of time of writing, partitioning doesn't create tables for non-covered values and there is no hash partitioning. It doesn't also move rows that were updated and no longer match the partition constrains. 

## Hash Index

PostgreSQL 10 will make *Hash Index* a first-class feature being crash-safe, replicated with reduced locking during bucket splits and faster lookups, index growth will be more even and there will be possibility to do single-page pruning. 

## ICU Library

PostgreSQL 10 will use [ICU library](site.icu-project.org/) providing Unicode and Globalization support for software applications instead of OS-supplied. 

## Quorum Commit

PostgreSQL 10 will provide quorum set of synchronous standbys also known as quorum commit. 

## Parallelism

PostgreSQL 10 will support parallelism in btree index scans and in bitmap heap scans, in merge joins and in procedural languages. 

## Mult-column statistics

PostgreSQL 10 will provide multi-column statistics with `CREATE STATISTICS ... WITH`

## Improved `pg_stat_activity`

PostgreSQL 10 improves `pg_stat_activity` with additional wait tracking for client reads/writes, server reads/writes/fsynsc, and synchronous replication. It additionally displays auxiliary, worker and WAL processes. 

## Stronger Password Hashing

PostgreSQL 10 will use `SCRAM-SHA-256` instead of `MD5` for more secure password authentication.

## Full text search for `json` and `jsonb`

PostgreSQL 10 will support full text search for `json` and `jsonb` columns. 
