
+++
date = 2015-09-03T00:00:00.000Z


title = "PostgreSQL Primer for Busy People"
topics = [ "postgresql", "primer" ]

+++

<div class="notice blockquote">
This is work-in-progress, suggestions or tips are welcome.
To move around efficiently, use `Ctrl-F`. Last updated: <strong>Dec 1st, 2017</strong>
</div>

[PostgreSQL][1] is an open source object-relational database system. It is a
multi-user, multi-threaded database management system.

## Installation and configuration

### Install PostgreSQL on Debian/Ubuntu

Add APT repository

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
```

Install PostgreSQL

```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib postgresql-client libpq-dev
```

### Install PostgreSQL on macOS

```
brew install postgresql
```

### Set password for postgres (PostgreSQL root) role

```
sudo -u postgres psql
\password
```

### Disable PostgreSQL version

```
sudo service postgresql status
9.1/main (port 5432): online
9.2/main (port 5433): online
9.4/main (port 5434): online
```

Each PostgreSQL cluster in Debian/Ubuntu has a `start.conf` file that controls
what `/etc/init.d/postgresql` should do. Replace `auto` with `manual` in
`/etc/postgresql/9.x/main/start.conf`.

### Disable auto boot

```
update-rc.d -f postgresql remove
```

### Show clusters

```
sudo pg_lsclusters
```

### Upgrade PostgreSQL

Install the newest PostgreSQL version. Check if you have more than one cluster running.

```
sudo pg_lsclusters
Ver Cluster Port Status Owner    Data directory               Log file
9.6 main    5432 online postgres /var/lib/postgresql/9.6/main /var/log/postgresql/postgresql-9.6-main.log
10  main    5433 online postgres /var/lib/postgresql/10/main  /var/log/postgresql/postgresql-10-main.log
```

Stop the newer cluster

```
sudo pg_dropcluster 10 main --stop
```

Upgrade the older cluster to the newset versio

```
sudo pg_upgradecluster 9.6 main
```

Remove the older cluster

```
sudo pg_dropcluster 9.6 main
```


## User

A role is a user in a database world. Roles are separate from operating system users and global across a cluster. Users without password can connect to the cluster only locally (i.e. through socket).

### Create role

On the command line

```
sudo -u postgres createuser [role_name] -d -P
```

In `psql`

```
CREATE ROLE [role_name] WITH LOGIN CREATEDB PASSWORD '[password]';
```

### List roles

In `psql`

```
\du
```

or

```
select * from pg_roles
```

### Change a user’s password

```
ALTER ROLE [role_name] WITH PASSWORD '[new_password]';
```

### Allow user to create databases

```
ALTER USER <username> WITH CREATEDB;
```


## Database

### List all databases

in `psql`

```
\l
```

### Create database

on the command line

```
sudo -u postgres createdb [name] -O [role_name]
```

in `psql`

```
CREATE DATABASE [name] OWNER [role_name];
```

### Drop database

on the command line

```
sudo -u postgres dropdb [name] --if-exists
```

in `psql`

```
DROP DATABASE IF EXISTS [name];
```

### Export database as CSV

```
COPY (SELECT * FROM widgets) TO '/absolute/path/to/export.csv'
WITH FORMAT csv, HEADER true;
```

`COPY` requires to specify an absolute path and only writes to the file system
local to the database. `\copy` is a wrapper around COPY that circumvents those
restrictions.

```
\copy (SELECT * FROM widgets) TO export.csv
WITH FORMAT csv, HEADER true
```

You can specify encoding of exported data (e.g. `latin1` for Excel instead of
  `utf-8`).

```
\copy (SELECT * FROM widgets) TO export.csv
WITH FORMAT csv, HEADER true, ENCODING 'latin1'
```

### Create compressed PostgreSQL database backup

```
pg_dump -U [role_name] [db_name] -Fc > backup.dump
```

### Create schema-only database backup

Schema-only means tables, indexes, triggers, etc, but not data inside; done `-s`
option.

```
pg_dump -U [role_name] [db_name] -s > schema.sql
```

### Restore database from binary dump

```
PGPASSWORD=<password> pg_restore -Fc --no-acl --no-owner -U <user> -d <database> <filename.dump>
```

### Create compressed backups for all databases at once

```
pg_dump -Fc
```

### Convert binary database dump to SQL file

```
pg_restore binary_file.backup > sql_file.sql
```

### Copy database quickly

In order to copy a database, we create a new database and specify an existing
one as the template.

```
createdb -T app_db app_db_backup
```

### Change database ownership

```
ALTER DATABASE acme OWNER TO zaiste;
```

## Table

### List tables

```
\dt
```

### Create table

```
CREATE TABLE widgets (
  id BIGINT PRIMARY KEY,
  name VARCHAR(20),
  price INT,
  created_at timestamp without time zone default now()
)
```

### Insert into table

```
INSERT INTO widgets VALUES(1,'widget1',100)
INSERT INTO widgets(name, price) VALUES ('widget2', 101)
```

### Upsert into table

PostgreSQL 9.5 or newer:

```
INSERT INTO widgets VALUES ... ON CONFLICT UPDATE
```

PostgreSQL 9.4 (and older) doesn't have built-in UPSERT (or MERGE) facility and it's difficult to do it right (concurrent use).

### Drop table

```
DROP TABLE IF EXISTS widgets
```

### Delete all rows from table

```
DELETE FROM widgets;
```

### Drop table and dependencies

```
DROP TABLE table_name CASCADE;
```

## Column

### Available column types

### Create Enum type

```
CREATE TYPE environment AS ENUM ('development', 'staging', 'production');
```

### Add column to table

```
ALTER TABLE [table_name] ADD COLUMN [column_name] [data_type];
```

### Remove column from table

```
ALTER TABLE [table_name] DROP COLUMN [column_name];
```

### Change column data type

```
ALTER TABLE [table_name] ALTER COLUMN [column_name] [data_type];
```

### Change column name

```
ALTER TABLE [table_name] RENAME COLUMN [column_name] TO [new_column_name];
```

### Set default value for existing column

```
ALTER TABLE [table_name] ALTER_COLUMN created_at SET DEFAULT now();
```

### Add `UNIQUE` constrain to existing column

```
ALTER TABLE [table_name] ADD CONSTRAINT [constraint_name] UNIQUE ([column_name]);
```

or shorter (PostgreSQL will automatically assign a constrain name)

```
ALTER TABLE [table_name] ADD UNIQUE ([column_name]);
```


## Date and time

### Dates

`clock_timestamp()` returns current value. `now()` always returns current value, unless in a transaction, in which case it returns the value from the beginning of the transaction.

### Convert datetimes between timezones

```
SELECT now() AT TIME ZONE 'GMT';
SELECT now() AT TIME ZONE 'PST';
```

### Get to know the day of the week for a given date

```
SELECT extract(DAY FROM now());
```

### Specify time interval

* 3 days ago: `SELECT now() - interval '3 days';`
* 4 hours ago: `SELECT now() - interval '4 hours';`
* 2 days and 7 hours ago `SELECT now() - interval ‘2 days 7 hours';`

## JSON

### Extract from JSON

```
SELECT '{"arr":[2,4,6,8]}'::json -> 'arr' -> 2              # returns 6
```

```
SELECT '{"arr":[2,4,6,8]}'::json #> ARRAY['arr','2']        # returns 6
```

### Create JSON array

```
CREATE TABLE test (
  j JSON,
  ja JSON[]
);
```

```
INSERT INTO test(ja) VALUES (
  array[
    '{"name":"alex", "age":20}'::json,
    '{"name":"peter", "age":24}'::json
  ]
);
```

## PSQL

### Render `NULL` visible in `psql`

By default `NULL` is indifferentiable from an empty string.

```
\pset null ¤
```

### Extended display mode

Extended display on and off depending on the size

```
\x auto
```

## Indexes

An index helps retrieve rows from a table and its use is efficient only if the number of rows to be retrieved is relatively small. Adding an index to a column will allow you to query the data faster, but data inserts will be slower.

A partial index covers just a subset of a table’s data. It is an index with a `WHERE` clause. By reducing the index size (less storage, easier to maintain, faster to scan), its efficiency increases.

*sequential scan*: the database searches over all of the data before returning the results.

```
CREATE INDEX widgets_paid_index ON widgets(paid) WHERE paid IS TRUE;
```

### Types

* *B-Tree* is the default index (compatible with all data types) and it creates a balanced tree i.e. amount of data on both sides of the tree is roughly the same. The number of levels that must be traversed to find rows is always similar. B-Tree indexes are well suited for equality and range queries.
* Hash indexes are only useful for equality comparisons and not transaction safe, they need to be manually rebuilt after crashes. There is no substantial advantage over using B-Tree
* Generalized Inverted (GIN) is useful when an index maps many values to one row. They are good for indexing array values and for implementing full-text search.
* Generalized Search Tree (GiST) allows to build general balanced tree structures. They can be used not only for equality & and range comparisons operations. They are used to index the geometric data types and full-text search.


## Varia

### PgBouncer

[PgBouncer][2] is a lightweight connection pooler for PostgreSQL. An application connects to `pgbouncer` as if it were a PostgreSQL server, `pgbouncer` creates a connection to the actual server or it reuses one of its existing connections. Its aim is to lower the performance impact of opening new connections to PostgreSQL server.

### WAL

PostgreSQL maintains a write ahead log (WAL) in the `pg_xlog/` subdirectory of the cluster's data directory. The log records every change made to the database's data files.

[1]: https://www.postgresql.org/
[2]: https://pgbouncer.github.io

[999]: https://gist.github.com/chen206/4030441
[998]: http://postgresguide.com/performance/indexes.html
[997]: https://devcenter.heroku.com/articles/postgresql-indexes
[996]: https://www.tutorialspoint.com/postgresql/postgresql_indexes.htm
[995]: http://stackoverflow.com/questions/17267417/how-to-upsert-merge-insert-on-duplicate-update-in-postgresql
