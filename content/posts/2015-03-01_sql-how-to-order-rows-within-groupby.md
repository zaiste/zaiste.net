+++
date = 2015-03-01T00:00:00.000Z
title = "SQL: How to order rows within GROUP BY"
aliases = [
  "sql_how_to_order_rows_within_group_by"
]
[taxonomies]
topics = [ "SQL" ]
+++

Let's consider the following `posts` table

```
 title  | author |    published_at
--------+--------+---------------------
 Post 2 | Zaiste | 2015-03-02 00:00:00
 Post 1 | Zaiste | 2015-02-01 00:00:00
 Post 4 | Mary   | 2015-03-04 00:00:00
 Post 3 | John   | 2015-03-02 00:00:00
```

Our question is: *What's the latest publication date of each author?*; to answer
it we will use `max` aggregation function.

```
SELECT author, max(published_at)
FROM posts
GROUP BY author;
```

```
 author |         max
--------+---------------------
 Mary   | 2015-03-04 00:00:00
 Zaiste | 2015-03-02 00:00:00
 John   | 2015-03-02 00:00:00
```

Similary to get the oldest publication date of each author we will use
`min` function.

```
SELECT author, min(published_at)
FROM posts
GROUP BY author;
```

```
 author |         min
--------+---------------------
 Mary   | 2015-03-04 00:00:00
 Zaiste | 2015-02-01 00:00:00
 John   | 2015-03-02 00:00:00
```

To order those results we use plain `ORDER BY` clause with `min` function as its
parameter.

```
SELECT author, min(published_at)
FROM posts
GROUP BY author
ORDER BY min(published_at) ASC;
```

```
 author |         min
--------+---------------------
 Zaiste | 2015-02-01 00:00:00
 John   | 2015-03-02 00:00:00
 Mary   | 2015-03-04 00:00:00
```

