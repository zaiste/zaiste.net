+++
date = 2012-08-06T00:00:00.000Z
title = "DB 101: PostgreSQL, MySQL and SQLite compared"
[taxonomies]
topics = [ "PostgreSQL", "MySQL", "Sqlite" ]
+++

In this post I go through basic adminstrative commands for [PostgreSQL][1],
[MySQL][2] and [SQLite][3]. The idea is to organize it in one place as it slips my mind quite
often. In square brackets I'm putting optional parameters. For Linux I assume
a root access.


Installing
----------

### PostgreSQL

On OSX

```
λ brew install postgres
```

On Linux (+ setting a possword for `postgres` user)

```
λ apt-get install postgresql
λ passwd postgres
```

### MySQL

On OSX

```
λ brew install mysql
```

On Linux

```
λ apt-get install mysql-server mysql-client
```

Accessing a DB server
---------------------

### PostgreSQL

```
λ su - postgres
λ psql dbname
```

### MySQL

```
λ mysql -u root -p [dbname]
```


Creating a DB user
------------------

### PostgreSQL

On OSX

```
λ createuser zaiste
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) y
Shall the new role be allowed to create more new roles? (y/n) n
```

On Linux

```
λ sudo -u postgres createuser zaiste
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) y
Shall the new role be allowed to create more new roles? (y/n) n
```

With `psql`

```
=# create user zaiste with password 'pass';
CREATE ROLE
```


### MySQL

```
mysql> CREATE USER 'zaiste'@'localhost' IDENTIFIED BY 'pass';
```

Creating a database
-------------------

### PostgreSQL

On CLI

```
λ createdb realm -O zaiste
```

With `psql`

```
=# create database realm with owner zaiste;
CREATE DATABASE
```

### MySQL

```
mysql> CREATE DATABASE realm;
```

On localhost

```
mysql> GRANT ALL ON realm.* TO zaiste@localhost [identified by 'pass'];
```

On specific IP

```
mysql> GRANT ALL ON realm.* TO zaiste@192.168.1.5 [identified by 'pass'];
```


### SQLite

In SQLite3 there is no database server. Databases are just regular files. If the
file doesn't exist, it will be created once you launch the `sqlite` client.

```
λ sqlite realm.db
```

Check Version
-------------

### PostgreSQL

```
=# select version();
                                  version
------------------------------------------------------------------------------
 PostgreSQL 9.2.0 on x86_64-apple-darwin12.1.0, compiled by Apple clang version
    4.0 (tags/Apple/clang-421.0.57) (based on LLVM 3.1svn), 64-bit
```

### MySQL

More details:

```
λ mysqladmin -u root -p -h localhost version
Enter password:
mysqladmin  Ver 8.42 Distrib 5.1.61, for debian-linux-gnu on x86_64
Copyright (c) 2000, 2011, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Server version          5.1.61-0ubuntu0.11.10.1
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /var/run/mysqld/mysqld.sock
Uptime:                 77 days 12 hours 15 min 42 sec

Threads: 1  Questions: 70715217  Slow queries: 2  Opens: 40905  Flush tables: 1
   Open tables: 64  Queries per second avg: 10.559
```

Less details:

```
λ  mysql -V
mysql  Ver 14.14 Distrib 5.1.61, for debian-linux-gnu (x86_64) using readline 6.2
```

Check Socket
------------

### MySQL

```
λ mysqladmin -u root variables | grep socket
```

Importing
---------

### PostgreSQL

```
λ mysql -u zaiste -p -h localhost dbname < dumpfile.sql
```

Listing Databases
-----------------

### PostgreSQL

```
=# \l[ist]
                             List of databases
   Name     | Owner  | Encoding |   Collate   |    Ctype    | Access privileges
------------+--------+----------+-------------+-------------+-------------------
 postgres   | zaiste | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 template0  | zaiste | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/zaiste        +
            |        |          |             |             | zaiste=CTc/zaiste
 template1  | zaiste | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/zaiste        +
            |        |          |             |             | zaiste=CTc/zaiste
 realm      | zaiste | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```

### MySQL

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| realm              |
| db1                |
| db2                |
+--------------------+
```

### SQLite

```
.databases
```

Switch database
----------------

### PostgreSQL

```
=# \c[onnect] db1;
You are now connected to database "db1" as user "zaiste".
```

### MySQL

```
mysql> use db1;
Database changed
```


Showing tables
--------------

### PostgreSQL

```
realm=# \d[t]
            List of relations
 Schema |       Name        | Type     | Owner
--------+-------------------+----------+--------
 public | table1            | table    | zaiste
 public | table1_id_seq     | sequence | zaiste
 public | table2            | table    | zaiste
 public | table2_id_seq     | sequence | zaiste
 public | table3            | table    | zaiste
 public | table3_id_seq     | sequence | zaiste
```

### MySQL

```
mysql> show tables;
+-------------------+
| Tables_in_realm   |
+-------------------+
| table1            |
| table2            |
| table3            |
+-------------------+
```

### SQLite

```
.tables
```

Showing schema
--------------

### PostgreSQL

```
=# \d table1
                            Table "public.table1"
 Column|    Type                |                  Modifiers
-------+------------------------+----------------------------------------------------
 id    | integer                | not null default nextval('table1_id_seq'::regclass)
 name  | character varying(255) |
 title | character varying(255) |
```


### MySQL

```
mysql> describe table1;
+--------------------+--------------+------+-----+---------+----------------+
| Field              | Type         | Null | Key | Default | Extra          |
+--------------------+--------------+------+-----+---------+----------------+
| id                 | int(11)      | NO   | PRI | NULL    | auto_increment |
| sequence           | int(11)      | YES  |     | NULL    |                |
| name               | varchar(255) | YES  |     | NULL    |                |
| title              | varchar(255) | YES  |     | NULL    |                |
+--------------------+--------------+------+-----+---------+----------------+
```

### SQLite

```
.schema table1
```

Setting password
-----------------

### MySQL

For the first time

```
λ mysqladmin -u root -p password NEWPASS
```

Updating the password

```
λ mysqladmin -u root -p'OLDPASS' password NEWPASS
```

Timing
------

### PostgreSQL

```
=# \timing
Timing is on.

=# SELECT * from pg_catalog.pg_attribute ;
Time: 9.583 ms
```

[1]: http://www.postgresql.org
[2]: http://www.mysql.com/
[3]: http://www.sqlite.org/
