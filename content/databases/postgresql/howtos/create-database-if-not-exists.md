+++
title = "Create a database if not exists in PostgreSQL"
[taxonomies]
topics = [ "PostgreSQL", "Nix" ]
+++

Unlike MySQL et al., PostgreSQL does not support the `CREATE ... IF NOT EXISTS` syntax for databases. This can be, however, simulate in `psql` with the `\gexec` parameter.

```sql
SELECT 'CREATE DATABASE <your db name>'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '<your db name>')\gexec
```

`\gexec` sends the current query buffer to the server, then treats each column of each row of the query's output (if any) as a SQL statement to be executed. `\gexec` cannot be used with the `-c` option in `psql`.

Another alternative that is convenient for shell scripts:

```bash
psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '<your db name>'" | grep -q 1 | psql -U postgres -c "CREATE DATABASE <your db name>"
```

