+++
date = 2014-01-28T00:00:00.000Z
title = "Enable PostgreSQL HStore by default"
[taxonomies]
topics = [ "PostgreSQL" ]
+++

In PostgreSQL `create database` (or `createdb` on cli) by default copies the
standard system database named `template1` into the newly created database. You
can adjust this template database with frequently used extensions e.g. `HStore` to
avoid the manual process of adding them with `create extension` for each new
database.

Let's add `hstore` extension to `template1` database.

```
psql -d template1 -c 'create extension hstore;'
```

Then, create a new database.

```
createdb foo
```

Finally, check which extensions are installed for that database.

```
psql foo -c '\dx'
                           List of installed extensions
  Name   | Version |   Schema   |                   Description
---------+---------+------------+-----------------------------------------------
 hstore  | 1.2     | public     | data type for storing sets of (key, value) pai
 plpgsql | 1.0     | pg_catalog | PL/pgSQL procedural language
```

