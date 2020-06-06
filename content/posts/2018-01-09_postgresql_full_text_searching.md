+++
date = 2018-01-09T00:00:00.000Z
title = "PostgreSQL Full Text Searching"
[taxonomies]
topics = [ "PostgreSQL" ]
[extra]
priority = 0.8
+++

[Full Text Searching](https://www.postgresql.org/docs/10/static/textsearch.html) is a feature that allows to identify natuaral-language documents (textual entities) matching a query. It provides a lingustic support that goes beyond regular expressions by handling the derived forms of words e.g. declension, conjugation, etc. As a result it brings more relevency to search results.

Let’s create an example data set.

```sql
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta JSONB
);
```

Each document consists of few text column and a `JSONB` column with some metadata inside.

`tsvector` is a PostgreSQL data type that provides the optimum performance for full text searching. This column holds a subset of content from other fields in a form adapted for full text searching. It concatenates and normalizes textual content from those other fields.

```sql
ALTER TABLE articles ADD COLUMN document TSVECTOR;
CREATE INDEX document_idx ON articles USING gin(document);
```

Once created it needs to be filled with desired values.  In the following example we decided to provide full text searching for the content of `title`, `content` column along with a `tags`  field from `JSONB` column. Each column can have a weight to specify its importance with `A` being the most important and `D` being the least important.

```sql
UPDATE articles
SET document =
  setweight(to_tsvector(coalesce(title,'')), 'A') ||
  setweight(to_tsvector(coalesce(content,'')), 'B') ||
  setweight(to_tsvector(coalesce(meta->>'tags','')), 'D');
```

Additionally, there should be a trigger to update the field on `INSERT/UPDATE` whenever one of the source columns changes.

```sql
CREATE FUNCTION articles_document_trigger() RETURNS trigger AS $$
begin
  new.document :=
    setweight(to_tsvector(coalesce(title,'')), 'A') ||
    setweight(to_tsvector(coalesce(content,'')), 'B') ||
    setweight(to_tsvector(coalesce(meta->>'tags','')), 'D');
  return new;
end
$$ LANGUAGE plpgsql;
```

The trigger will be run just before any `INSERT` or `UPDATE` operation.

```sql
CREATE TRIGGER articles_document_update BEFORE INSERT OR UPDATE
ON articles
FOR EACH ROW EXECUTE PROCEDURE articles_document_trigger();
```

Here’s a query to search for documents matching a specific term i.e. a word or sequence of words

```sql
SELECT id, title
FROM articles, plainto_tsquery('postgresql') AS q
WHERE (document @@ q);
```

Here’s a query to search for documents starting with a specific word:

```sql
SELECT id, title
FROM articles, tsquery('simple', 'postgresql:*') AS q
WHERE (document @@ q);
```

Full text seaching is a powerful feature of PostgreSQL. It provides a convenient and performant technique to query for textual data. There is no need for additional software or libraries to start using it. Everything is stored in a single database. This way it is easier to manage and maintain.