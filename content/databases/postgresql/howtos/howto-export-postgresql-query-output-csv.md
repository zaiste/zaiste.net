
+++

+++
# How To Export PostgreSQL Query Output as CSV

`\o` puts the query output into file at given location. PostgreSQL must have write privileges to that location.

```bash

\f ','
\a
\t
\o /tmp/output.csv
```

`\f` set field separator
`\a` set output format unaligned
`\t` show only tuples

Then, just run the query

```sql
SELECT * FROM widgets;
```

Another approach using `\copy`

```sql
\copy (SELECT * FROM widgets LIMIT 10;) TO '~/path/on/filesystem/file.csv' CSV HEADER
```

-   queries must be single line
-   if the database doesn't have access to the filesystem, output to `STDOUT`

It's required to quote the columns if there are timestamp fields in the DB.

```sql
\copy (SELECT * FROM widgets ) TO '~/path/to/file.csv' DELIMITER ',' QUOTE '"' FORCE QUOTE * HEADER CSV
```

Command Line

```bash
psql -d dbname -t -A -F"," -c "select * from widgets" > output.csv
```

This method doesn't include column headers.

