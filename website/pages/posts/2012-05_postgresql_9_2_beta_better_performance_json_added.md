---
created_at: 2012-05-18 
kind: article
publish: true
title: "PostgreSQL 9.2 Beta - Better Performance, JSON added"
tags:
- postgresql
---

PostgreSQL Global Development Group announced [the beta release of PostgreSQL 9.2](http://www.postgresql.org/about/news/1395/). Improvements include:

 * better horizontal and vertical scalability
 * index-only scanning - searches avoid reading the underlaying tables
 * data writing speed-up with group commit feature
 * reductions in CPU power consumption
 * horizontal scalability includes support for cascading replication
 * support for JSON data type which allows to create hybird document-relational database
 * new number range types: `INT4RANGE`, `INT8RANGE`, `NUMRANGE`
 * new date/timestamp range types: `TSRANGE`, `TSTZRANGE`, `DATERANGE`

This *beta* release is not advised to be used in production. The final version of PostgreSQL 9.2 is [scheduled](http://www.postgresql.org/developer/roadmap/) for the third quarter of this year.
