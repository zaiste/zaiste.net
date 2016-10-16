---
created_at: 2014-12-11
kind: article
publish: true
title: "PostgreSQL JSON data type"
tags:
 - postgresql
 - json
---

[PostgreSQL JSON data type][1] is useful for storing multi-level, dynamically structured object graphs. The serialised object is stored in a text column. The `json` type takes care of deserialising it back to object graph while reading values from that column. Additionally, the database checks that the value is a valid JSON.

PostgreSQL 9.3 introduces special functions and operators to effortlessly operate on JSON data stracture.

## Warmup

Let's start by manipulating JSON data without storing it first.

Array access:

```
select '[11,55,99]'::json->1;
```

```
 ?column?
----------
 55
```

Object access:

```
select '{"a": 1, "b": 2}'::json->'b';
```

```
 ?column?
----------
 2
```

Path based access:

```
select '{"a": [11, 55, 99]}'::json #> '{"a", 1}';
```

```
 ?column?
----------
 55
```

```
select json_extract_path('{"a": [11, 55, 99]}', 'a', '1');
```

```
 json_extract_path
-------------------
 55
```

Enumarate an object:

```
select * from json_each('{"a": 11, "b": "zig"}');
```

```
 key | value
-----+-------
 a   | 11
 b   | "zig"
```

Extract keys from an object:


```
select json_object_keys('{"a": 1, "b": "zig"}');
```

```
 json_object_keys
------------------
 a
 b
```

Calculate array size:

```
select json_array_length('[1,2,3,4,5]');
```

```
 json_array_length
-------------------
                 5
```


## Preparing data

```
create table users (id serial, name varchar, settings json);
```

```
insert into users values (1, 'Zaiste', '{
  "default_view": "list",
  "handle": "zaiste",
  "favorites": ["11", "22", "33", "44"],
  "accounts": {
    "simple": {
      "balance": 1000.0,
      "name": "My Simple Account"
  	},
    "advanced": {
      "balance": 2000.0,
      "name": "My Advanced Account"
    }
  }
}');

insert into users values (2, 'Bunia', '{
  "default_view": "mosaic",
  "handle": "bunia",
  "favorites": ["22", "55", "77"],
  "accounts": {
    "simple": {
      "balance": 1500.0,
      "name": "My Simple Account"
    },
    "advanced": {
      "balance": 800.0,
      "name": "My Advanced Account"
    }
  }
}');
```
Let's check if it's added correctly.

```
select * from users;
```

```
 id |  name  |                 settings
----+--------+------------------------------------------
  1 | Zaiste | {                                       +
    |        |   "default_view": "list",               +
    |        |   "favorites": ["11", "22", "33", "44"],+
    |        |   "accounts": {                         +
    |        |     "simple": {                         +
    |        |       "balance": 1000.0,                +
    |        |       "name": "My Simple Account"       +
    |        |   },                                    +
    |        |     "advanced": {                       +
    |        |       "balance": 2000.0,                +
    |        |       "name": "My Advanced Account"     +
    |        |     }                                   +
    |        |   }                                     +
    |        | }
  2 | Bunia  | {                                       +
    |        |   "default_view": "mosaic",             +
    |        |   "favorites": ["22", "55", "77"],      +
    |        |   "accounts": {                         +
    |        |     "simple": {                         +
    |        |       "balance": 1500.0,                +
    |        |       "name": "My Simple Account"       +
    |        |     },                                  +
    |        |     "advanced": {                       +
    |        |       "balance": 800.0,                 +
    |        |       "name": "My Advanced Account"     +
    |        |     }                                   +
    |        |   }                                     +
    |        | }
```


## Selecting JSON data

`->` operator returns the original JSON type whereas `->>` returns text.

Extracting values from fields at first level:

```
select id, settings->'default_view' from users;
```

```
 id | ?column?
----+----------
  1 | "list"
```

Extracting values from arrays:


```
select id, settings->'favorites'->>2 from users;
```

```
 id | ?column?
----+----------
  1 | 33
```

Extracting values from nested fields:

```
select id, settings->'accounts'->'simple'->'balance' from users;
```

```
 id | ?column?
----+----------
  1 | 1000.0
```

## Filtering JSON data

You can select rows based on values from JSON field:

```
select name from users
where settings->>'default_view' = 'mosaic';
```

```
 name
-------
 Bunia
```

```
select name from users
where settings->'accounts'->'simple'->>'balance' = '1000.0';
```

```
  name
--------
 Zaiste
```

## Aggregating JSON data

```
select name, sum(cast(settings->'accounts'->'simple'->>'balance' as decimal))
as total
from users
group by name;
```

```
  name  | total
--------+--------
 Zaiste | 1000.0
 Bunia  | 1500.0
```

```
select avg(cast(settings->'accounts'->'simple'->>'balance' as decimal)) as avg from users;
```

```
          avg
-----------------------
 1250.0000000000000000
```

For more functions check [PostreSQL's docs on « aggregate functions »][2]

## Indexing JSON data

You can add indicies on any (even nested) JSON field:

```
create unique index user_settings_handle
on users ((settings->>'handle'));
```

[1]: http://www.postgresql.org/docs/9.3/static/datatype-json.html
[2]: http://www.postgresql.org/docs/9.3/static/functions-aggregate.html
