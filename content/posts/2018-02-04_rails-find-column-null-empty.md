+++
date = 2018-02-04T00:00:00.000Z
title = "Rails: Find Column Null, not Null or Empty"
aliases = [
  "rails_find_column_null_or_empty"
]
[taxonomies]
topics = [ "Rails" ]
[extra]
priority = 0.8
+++

Let's find records where column is `NULL` or empty using Active Record

```rb
Article.where(topic: [nil, ""])
```

Let's now find records where column is NOT `NULL` or empty using Active Record

```rb
Article.where.not(topic: [nil, ""])
```

This Active Record expression will be converted to the following SQL query.

```sql
SELECT "articles.*"
FROM "articles"
WHERE
NOT (("articles"."topic" = '' OR "articles"."topic" IS NULL))
```
