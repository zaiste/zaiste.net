---
created_at: 2018-02-04
kind: article
publish: true
title: "Rails: Find Column Null, not Null or Empty"
tags:
- rails
- activerecord
sitemap:
  priority: 0.8
---

Let's find records where column is `NULL` or empty using Active Record

```ruby
Article.where(topic: [nil, ""])
```

Let's now find records where column is NOT `NULL` or empty using Active Record

```ruby
Article.where.not(topic: [nil, ""])
```

This Active Record expression will be converted to the following SQL query.

```sql
SELECT "articles.*"
FROM "articles"
WHERE
NOT (("articles"."topic" = '' OR "articles"."topic" IS NULL))
```
