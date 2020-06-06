+++
date = 2012-07-23T00:00:00.000Z
title = "Shared DB to Postgres:Dev Migration on Heroku"
[taxonomies]
topics = [ "PostgreSQL" ]
+++

In order to migrate your Shared DB to Postgres:Dev plan on Heroku, follow these
steps:

## Turn on the maintance mode

```
λ heroku maintenance:on
```

## Add Postgres:Dev plan to your app

```
λ heroku addons:add heroku-postgresql:dev

Adding heroku-postgresql:dev to YOUR_APP... done, v10 (free)
Attached as HEROKU_POSTGRESQL_xxxxxx
Database has been created and is available
```

where `xxxxxx` is an uniq color name e.g. `GREEN`, `VIOLET`, etc.

## Backup the data

```
λ heroku pgbackups:capture --expire

SHARED_DATABASE (DATABASE_URL)  ----backup--->  b002
Capturing... done
Storing... done
```

It creates a most recent backup of your database.

## Restore

```
λ heroku pgbackups:restore HEROKU_POSTGRESQL_xxxxxx

HEROKU_POSTGRESQL_xxxxxx  <---restore---  b002 (most recent)
                                          SHARED_DATABASE (DATABASE_URL)
```

It restores your previous backup on the new database created with Postgres:Dev
plan.

## Switch the database

```
λ heroku pg:promote HEROKU_POSTGRESQL_xxxxxx

Promoting HEROKU_POSTGRESQL_xxxxxx to DATABASE_URL... done
```

It makes the new database as primary for your application. You can check if
everything is OK with `heroku config`.

## Turn off the maintance mode

```
λ heroku maintenance:off
```

It's done, your database should be properly migrated.
