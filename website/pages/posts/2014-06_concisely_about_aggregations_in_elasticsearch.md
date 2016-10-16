---
created_at: 2014-06-17
kind: article
publish: true
title: "Concisely about Aggregations in Elasticsearch"
tags:
- elasticsearch
---

[Elasticsearch][1] v1.0 introduces [Aggregations][3] module. Aggregations allow to derive on-the-fly (analytic) information from documents returned by the current query; e.g to count or group those documents, or to provide distribution histograms.

It is a significant improvement over [Facets API][2] which became deprecated. Facets had a few shortcomings, namely they could not be nested and were difficult to combine. Aggregations solve these problems; they provide a way to express multi-level calculations  in a single request and performed at query-time,

Aggregations can be categorized as either **Metrics Aggregations** or **Bucket Aggregations**. Metrics Aggregations return a value (single-value e.g. `avg`) or values (multi-value e.g. `stats`) calculated over documents returned by the query. Bucket aggregations define criteria to put documents into relevant groups (called buckets).


## Aggregation structure

```
"aggregations" : {
    "<aggregation_name>" : {
        "<aggregation_type>" : {
            <aggregation_body>
        },
        ["aggregations" : { [<sub_aggregation>]* } ]
    }
    [,"<aggregation_name_2>" : { ... } ]*
}
```

* `aggregation_name` defines a name to identify an aggregation
* `aggregation_type` defines an aggregation type e.g. `terms`, `stats`, `range`, etc.
* `aggregation_body` defines actual aggregation criteria


## Examples

First, let's initialize the index with a proper mapping and some data using the
following [Gist][5]. Start with the content of `step1` file followed by `step2`.
If you want to change some data you must first delete the index with `DELETE /wizards`, then
recreate the mapping and finally insert the new data.

All examples are [Sense][4] compatible.

`value_count` aggregation returns the number of values (not necessarily unique) indexed for a given field.

```
POST /wizards/wizard/_search
{
  "size": 0,
  "aggs": {
    "with_domain_count": {
      "value_count": {
        "field": “domain"
      }
    }
  }
}
```
```
{
  [...]
  "aggregations": {
    "with_domain_count": {
      "value": 5
    }
  }
}
```

`cardinality` aggregation returns the approximate number of distinct values indexed for a given field

```
POST /wizards/wizard/_search
{
   "size": 0,
   "aggs": {
      "with_uniq_domain_count": {
          "cardinality": {
            "field": "domain"
         }
      }
   }
}
```
```
{
  [...]
  "aggregations": {
    "with_uniq_domain_count": {
      "value": 3
    }
  }
}
```

`terms` aggregation returns buckets constructed over unique values indexed for a given field and their count.

```
POST /wizards/wizard/_search
{
   "size": 0,
   "aggs": {
      "by_name": {
         "terms": {
            "field": "name"
         }
      }
   }
}
```
```
{
  [...]
  "aggregations": {
    "by_name": {
      "buckets": [
        {
           "key": "anne",
           "doc_count": 2
        },
        {
           "key": "smith",
           "doc_count": 2
        },
        {
           "key": "carol",
           "doc_count": 1
        },
        {
           "key": "john",
           "doc_count": 1
        },
        {
           "key": "johnson",
           "doc_count": 1
        },
        {
           "key": "kabinsky",
           "doc_count": 1
        },
        {
           "key": "marceau",
           "doc_count": 1
        },
        {
           "key": "tom",
           "doc_count": 1
        }
      ]
    }
  }
}
```

Let's try to group the whole names using `terms` aggregation. In the mapping
there is another field (`name.raw`) that holds names, but is not analyzed by
Elasticsearch (marked `not_analyzed`) i.e. in this particular case, it is not
splitted in words.

```
POST /wizards/wizard/_search
{
   "size": 0,
   "aggs": {
      "by_name_raw": {
         "terms": {
            "field": "name.raw"
         }
      }
   }
}
```
```
{
  [...]
  "aggregations": {
    "by_name_raw": {
      "buckets": [
        {
           "key": "Anne Kabinsky",
           "doc_count": 1
        },
        {
           "key": "Anne Marceau",
           "doc_count": 1
        },
        {
           "key": "Carol Smith",
           "doc_count": 1
        },
        {
           "key": "John Smith",
           "doc_count": 1
        },
        {
           "key": "Tom Johnson",
           "doc_count": 1
        }
     ]
    }
  }
}
```

Aggregations can be nested (except that a metric aggregation cannot have any
children). Below, a `terms` aggregation on the `name.raw` field (which is a not
analysed version of `name`, cf. mapping) and ordered by the value of nested
aggregation called `with_rating_avg`.

```
POST /wizards/wizard/_search
{
  "size": 0,
  "aggs": {
    "by_name_raw": {
      "terms": {
        "field": "name.raw",
        "order": {
          "with_rating_avg": "desc"
        }
      },
      "aggs": {
        "with_rating_avg": {
          "avg": {
            "field": "rating"
          }
        }
      }
    }
  }
}
```
```
{
  [...]
  "aggregations": {
    "by_name_raw": {
      "buckets": [
        {
          "key": "Anne Kabinsky",
          "doc_count": 1,
          "with_rating_avg": {
            "value": 5
          }
        },
        {
          "key": "John Smith",
          "doc_count": 1,
          "with_rating_avg": {
            "value": 4.5
          }
        },
        {
          "key": "Tom Johnson",
          "doc_count": 1,
          "with_rating_avg": {
            "value": 3.5
          }
        },
        {
          "key": "Anne Marceau",
          "doc_count": 1,
          "with_rating_avg": {
            "value": 3
          }
        },
        {
          "key": "Carol Smith",
          "doc_count": 1,
          "with_rating_avg": {
            "value": 2.5
          }
        }
      ]
    }
  }
}
```

Values used by aggregations can also be generated per document using `script`
clause. In the following example we use `range` aggregation to find number of
wizards that are between 18 and 32 years old.

```
POST /wizards/wizard/_search
{
  "size": 0,
  "aggs": {
    "by_age_range": {
      "range": {
        "script": "DateTime.now().year - doc[\"birthdate\"].date.year",
        "ranges": [
          {
            "from": 18,
            "to": 32
          }
        ]
      }
    }
  }
}
```
```
{
  [...]
  "aggregations": {
    "by_age_range": {
      "buckets": [
        {
          "from": 18,
          "to": 32,
          "doc_count": 3
        }
      ]
    }
  }
}
```

`geo_distance` aggregation returns number of documents within a distance range
from a specified origin

```
POST /wizards/wizard/_search
{
  "size": 0,
  "aggs": {
    "around_paris": {
      "geo_distance": {
        "field": "location",
        "origin": "44.19,-62.55",
        "unit": "km"
        "ranges": [
          {
            "from": 0,
            "to": 25
          }
        ]
      }
    }
  }
}
```
```
{
  [...]
  "aggregations": {
    "around_paris": {
      "buckets": [
        {
           "key": "*-25.0",
           "from": 0,
           "to": 25,
           "doc_count": 3
        }
       ]
    }
  }
}
```

Let’s combine `geo_distance` aggregation with `range` aggregation to find number
of wizards that live within the circle of 25 kilometres around Paris and fall
within three age groups.

```
POST /wizards/wizard/_search
{
  "size": 0,
  "aggs": {
    "around_paris": {
      "geo_distance": {
        "field": "location",
        "origin": "44.19,-62.55",
        "unit": "km",
        "ranges": [
          {
            "from": 0,
            "to": 25
          }
        ]
      },
      "aggs": {
        "by_age_range": {
          "range": {
            "script": "DateTime.now().year - doc[\"birthdate\"].date.year",
            "ranges": [
              { "from": 10, "to": 20 },
              { "from": 20, "to": 40 },
              { "from": 40, "to": 60 }
            ]
          }
        }
      }
    }
  }
}
```
```
{
  [...]
  "aggregations": {
    "around_paris": {
      "buckets": [
        {
          "key": "*-25.0",
          "from": 0,
          "to": 25,
          "doc_count": 3,
          "by_age_range": {
            "buckets": [
               {
                  "from": 10,
                  "to": 20,
                  "doc_count": 1
               },
               {
                  "from": 20,
                  "to": 40,
                  "doc_count": 2
               },
               {
                  "from": 40,
                  "to": 60,
                  "doc_count": 0
               }
            ]
          }
        }
      ]
    }
  }
}
```

`histogram` aggregation constructs fixed size buckets over the numeric values
(`interval`). `stats` aggregator is a multi-valued metrics aggregator that
calculate statistics on a given field. Let’s combine them to find number of
wizards who live within a circle of 50 kilometres around Paris and are
grouped based on their rate that change by 200 euros; finally for each group
let’s calculate statistics.

```
POST /wizards/wizard/_search
{
  "size": 0,
  "aggs": {
    "around_paris": {
      "geo_distance": {
        "field": "location",
        "origin": "44.19,-62.55",
        "unit": "km",
        "ranges": [
           {
              "from": 0,
              "to": 50
           }
        ]
      },
      "aggs": {
        "by_rate_histo": {
          "histogram": {
            "field": "rate",
            "interval": 200
          },
          "aggs": {
            "with_rating": {
              "stats": {
                "field": "rating"
              }
            }
          }
        }
      }
    }
  }
}
```
```
{
  [...]
  "aggregations": {
    "around_paris": {
      "buckets": [
        {
          "key": "*-50.0",
          "from": 0,
          "to": 50,
          "doc_count": 3,
          "by_rate_histo": {
            "buckets": [
              {
                "key": 0,
                "doc_count": 1,
                "with_rating": {
                  "count": 1,
                  "min": 5,
                  "max": 5,
                  "avg": 5,
                  "sum": 5
                }
              },
              {
                "key": 200,
                "doc_count": 2,
                "with_rating": {
                  "count": 5,
                  "min": 1,
                  "max": 5,
                  "avg": 3.2,
                  "sum": 16
                }
              }
            ]
          }
        }
      ]
    }
  }
}
```

[1]: http://elasticsearch.org/
[2]: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-facets.html
[3]: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-aggregations.html
[4]: https://github.com/bleskes/sense
[5]: https://gist.github.com/zaiste/faf11b74bab535f90bb9
