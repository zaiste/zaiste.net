+++
title = "Manually setup PostgreSQL instance"
[taxonomies]
topics = [ "PostgreSQL", "Nix" ]
+++

```bash
nix-shell -p postgresql
export PGDATA=~/db/content
initdb
pg_ctl start
createdb mydb
```

The `PGDATA` environment variables describes the home directory for a PostgreSQL instance. It will contain the configuration along with the databases.