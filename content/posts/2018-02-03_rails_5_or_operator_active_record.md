
+++
date = 2018-02-03T00:00:00.000Z


title = "Rails 5: OR operator in Active Record"
topics = [ "rails", "activerecord" ]

[extra]
priority = 0.8

+++

Rails 5 allows to use `or` operator when building Active Record queries.

```ruby
Article.where(id: 9)
  .or(Article.where(title: 'Rails 5: OR operator in Active Record'))
```

The query above returns a union of two relations specified. Those relations must
be structurally compatible: they must use the same model and set parameters via
`WHERE` or `HAVING`. Additionally, none of the relations can use `.limit()`,
`.offset()` or `.distinct()` functions.

This Active Record query is converted to the following SQL query.

```sql
SELECT "articles".* FROM "articles"
WHERE (
"articles"."id" = ?
OR
"articles"."title" = ?)
[
    ["id", 9],
    ["title", "Rails 5: OR operator in Active Record"]
]
```

`or` operator can be combined with `group` and `having` queries.

```ruby
articles = Article.group(:author_id)
articles.having('id > 8')
    .or(articles.having('title like "Rails 5%"'))
```

This Active Record query is converte to the following SQL query.

```sql
SELECT "articles".*
FROM "articles"
GROUP BY "articles"."author_id"
HAVING ((id > 8) OR (title like "Rails 5%"))
```

`or` operator can be combined with existing scopes

```ruby
class Article < ApplicationRecord
  scope :published, -> { where(published: true) }
end

Article.published
  .or(Article.where('id > 8'))
```

`or` operator can be also used to combine two or more scopes togther

```ruby
class Article < ApplicationRecord
  scope :status, -> (value) { where(status: value) }
  scope :published, -> { where(accepted: true) }
  scope :ready, -> { status("accepted").or(published) }
end
```
