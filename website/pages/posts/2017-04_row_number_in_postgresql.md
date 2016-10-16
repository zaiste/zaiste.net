---
created_at: 2017-04-21
kind: article
publish: true
title: "ROW_NUMBER in PostgreSQL"
tags:
- postgresql
---

`ROW_NUMBER` is a window function that assigns an unique integer value (which starts with one and increments by one) to each row in a result set.

```
ROW_NUMBER() OVER(
    [PARTITION BY column_1, column_2,…]
    [ORDER BY column_3,column_4,…]
)
```

`ROW_NUMBER()` operates on a set of rows called *a window*. `PARTITION BY` clause splits this window into smaller subsets (i.e. partitions); if omitted, `ROW_NUMBER()` will treat the entire window as a single partition.  `ORDER BY` inside `OVER` determines the order in which the numbers are assigned.

While using `DISTINCT` in conjugtion with `ROW_NUMBER`, it's important to remember that `ROW_NUMBER()` operates on the result set before the `DISTINCT` is applied, i.e. instead of this query

```
SELECT DISTINCT salary, ROW_NUMBER () OVER (ORDER BY salary)
FROM employees ORDER BY salary;
```

use this query

```
WITH salaries AS (
  SELECT DISTINCT salary FROM employees
) SELECT salary, ROW_NUMBER () OVER (ORDER BY salary)
FROM salaries;
```

`ROW_NUMBER()` can be used for pagination.

```
SELECT * FROM (
  SELECT *, ROW_NUMBER () OVER (ORDER BY name)
  FROM employees
) x WHERE ROW_NUMBER BETWEEN 7 AND 13;
```



