
+++

+++
# PostgreSQL

## Extensions

-   Horizontal Scaling and Sharding: Citus DB
-   Columnar Data Storage: cstore_fdw
-   Files as Tables: file_fdw
-   Streaming Computations: PipelineDB
-   Timeseries: TimescaleDB

## Generate Series

```sql
create table product (
  id serial primary key,
  created_at DATE,
  price NUMERIC(4,2)
);

insert into product (created_at, price) VALUES (
  generate_series('2015-01-12', '2015-02-22', interval '1 day'),
  generate_series(2.33, 45.12, 1.05)
);
```

## Update Case-When

```sql
update product set kind = (
  case kind
  when 'book' then 'book_kind'
  when 'cd'   then 'cd_kind'
  end
) where kind in ('book', 'cd');
```

## Insert Multiple

```sql
insert into widget (name) values ('Widget 1'), ('Widget 2'), ('Widget 3');
```

## UUID

```sql
create extension "uuid-ossp";

... = uuid_generate_v4();
```

## Truncate

Truncate doesn't scan the entire table while `DELETE FROM` without `WHERE` does.

## Group vs Non-Group

```sql
select create_date, name from widget where create_date = (select min(create_date) from widget);
```

This won't work:

```sql
select min(create_date), name from widget;
```

## Functions

PostgreSQL allows to run pre-defined code via user-defined functions. Those functions can be written not only in SQL, but also in C, Python, Perl, Tcl or PL/pgSQL.

### SQL Functions

SQL functions can accept and return base types, composite types and rows. They support variable numbers of arguments, default values for arguments and polymorphic arguments.

SQL functions can return multiple rows or nothing.

The function body can only contain SQL statements (no ifs/else, no variables, no loops).

### C Functions

C functions can be built as a shared library that can be dynamically loaded.

### PL/pgSQL Functions

[PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html) is a full-fledged programming language with variables, expressions and control statements. In particular, it includes features like cursors to work with SQL data.

### Python Functions

```bash
sudo apt install postgresql-plpython-11
```

```sql
CREATE EXTENSION plpythonu;

```

### Aggregate Functions

[Aggregate functions](https://www.postgresql.org/docs/current/functions-aggregate.html) operate over a set of values, and return a single result.

User-defined aggregate function:

```sql
CREATE OR REPLACE FUNCTION _final_median(NUMERIC[])
   RETURNS NUMERIC AS
$$
   SELECT AVG(val)
   FROM (
     SELECT val
     FROM unnest($1) val
     ORDER BY 1
     LIMIT  2 - MOD(array_upper($1, 1), 2)
     OFFSET CEIL(array_upper($1, 1) / 2.0) - 1
   ) sub;
$$
LANGUAGE 'sql' IMMUTABLE;

CREATE AGGREGATE median(NUMERIC) (
  SFUNC=array_append,
  STYPE=NUMERIC[],
  FINALFUNC=_final_median,
  INITCOND='{}'
);
```

