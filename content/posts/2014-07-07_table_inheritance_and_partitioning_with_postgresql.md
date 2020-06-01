
+++
date = 2014-07-07T00:00:00.000Z


title = "Table inheritance and partitioning with PostgreSQL"
topics = [ "postgresql" ]

+++

PostgreSQL supports [table inheritance][1] and [table partitioning][2].

## Inheritance

Table inheritance allows to extract a common set of columns into a parent,
master table with children defining additional fields.

```
create table articles (id serial, title varchar, content text);
```
```
create table articles_w_tags (tags text[]) inherits (articles);
```
```
create table articles_wo_tags () inherits (articles);
```

Let's insert some data

```
insert into articles_wo_tags (title, content)
    values ('Title 1', 'Content 1'),
           ('Title 2', 'Content 2');
```

```
insert into articles_w_tags (title, content, tags)
    values ('Title 3', 'Content 3', '{"tag_1", "tag_2"}'::text[]),
           ('Title 4', 'Content 4', '{"tag_2", "tag_3"}'::text[]);
```

Let's perform a `select` query on each of these tables.

```
select * from articles_wo_tags;
 id |  title  |  content
----+---------+-----------
  1 | Title 1 | Content 1
  2 | Title 2 | Content 2
```

```
select * from articles_w_tags;
 id |  title  |  content  |     tags
----+---------+-----------+---------------
  3 | Title 3 | Content 3 | {tag_1,tag_2}
  4 | Title 4 | Content 4 | {tag_2,tag_3}
```

When querying the master table, the query references all rows of that master table
plus all of its children tables; values from the common set of columns are displayed.
The `only` keyword can be used to indicate that the query should apply only to a
particular table and not any tables below it in the inheritance hierarchy.

```
select * from articles;
 id |  title  |  content
----+---------+-----------
  3 | Title 3 | Content 3
  4 | Title 4 | Content 4
  1 | Title 1 | Content 1
  2 | Title 2 | Content 2
```

Changes performed on the master table are propagated to the children.

```
update articles set content = content || ' Changed';
```

```
select * from articles_w_tags;
 id |  title  |      content      |     tags
----+---------+-------------------+---------------
  3 | Title 3 | Content 3 Changed | {tag_1,tag_2}
  4 | Title 4 | Content 4 Changed | {tag_2,tag_3}
```

## Partitioning

Table partitioning means splitting a table into smaller pieces and provides
various performance benefits for tables that hold large amounts of data, i.e.
the size of a table is about to exceed the physical memory of the database
server.

PostgreSQL allows table partitioning via table inheritance. Each partition must
be created as a child table of a single parent table (which remains empty and
exists only to represent the whole data set).

PostgreSQL implements **range** and **list** partitioning methods. The former is
done with a range defined by a column or set of columns with no overlap between
the ranges. The latter is done by explicitly listing which key values appear in
each partition.

Let's start by creating a parent table called `logs`.

```
create table logs (created_at timestamp without time zone default now(),
                   content text);
```

We will partition table by date into four quarters of the year.

```
create table logs_q1
    (check (created_at >= date '2014-01-01' and created_at <= date '2014-03-31'))
    inherits (logs);
```
```
create table logs_q2
    (check (created_at >= date '2014-04-01' and created_at <= date '2014-06-30'))
    inherits (logs);
```
```
create table logs_q3
    (check (created_at >= date '2014-07-01' and created_at <= date '2014-09-30'))
    inherits (logs);
```
```
create table logs_q4
    (check (created_at >= date '2014-10-01' and created_at <= date '2014-12-31'))
    inherits (logs);
```

Next step is to create indices on the key column of each child table.

```
create index logs_q1_created_at on logs_q1 using btree (created_at);
create index logs_q2_created_at on logs_q2 using btree (created_at);
create index logs_q3_created_at on logs_q3 using btree (created_at);
create index logs_q4_created_at on logs_q4 using btree (created_at);
```

Next, let's create a trigger function to dispatch the data among child tables.

```
create or replace function on_logs_insert() returns trigger as $$
begin
    if ( new.created_at >= date '2014-01-01' and new.created_at <= date '2014-03-31') then
        insert into logs_q1 values (new.*);
    elsif ( new.created_at >= date '2014-04-01' and new.created_at <= date '2014-06-30') then
        insert into logs_q2 values (new.*);
    elsif ( new.created_at >= date '2014-07-01' and new.created_at <= date '2014-09-30') then
        insert into logs_q3 values (new.*);
    elsif ( new.created_at >= date '2014-10-01' and new.created_at <= date '2014-12-31') then
        insert into logs_q4 values (new.*);
    else
        raise exception 'created_at date out of range';
    end if;

    return null;
end;
$$ language plpgsql;
```

Let's attach the trigger function defined above to `logs` table.

```
create trigger logs_insert
    before insert on logs
    for each row execute procedure on_logs_insert();
```

Finally, let's insert some data into `logs` table to see the partitioning in
work.

```
insert into logs (created_at, content)
    values (date '2014-02-03', 'Content 1'),
           (date '2014-03-11', 'Content 2'),
           (date '2014-04-13', 'Content 3'),
           (date '2014-07-08', 'Content 4'),
           (date '2014-10-23', 'Content 5');
```

```
select * from logs_q1;
     created_at      |  content
---------------------+-----------
 2014-02-03 00:00:00 | Content 1
 2014-03-11 00:00:00 | Content 2
```

```
select * from logs_q2;
     created_at      |  content
---------------------+-----------
 2014-04-13 00:00:00 | Content 3
```

```
select * from logs_q3;
     created_at      |  content
---------------------+-----------
 2014-07-08 00:00:00 | Content 4
```

```
select * from logs_q4;
     created_at      |  content
---------------------+-----------
 2014-10-23 00:00:00 | Content 5
```

A short article that dive a bit more in [partitioning in PostgreSQL][4]

[1]: http://www.postgresql.org/docs/9.4/static/ddl-inherit.html
[2]: http://www.postgresql.org/docs/9.4/static/ddl-partitioning.html
[3]: http://www.postgresql.org/docs/9.4/static/runtime-config-query.html#GUC-CONSTRAINT-EXCLUSION
[4]: http://www.opensourceforu.com/2012/01/partitioning-in-postgresql/

