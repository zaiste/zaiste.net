
+++
date = 2017-05-02T00:00:00.000Z
title = "PostgreSQL DISTINCT ON"
aliases = [
  "postgresql_distinct_on"
]
[taxonomies]
topics = [ "PostgreSQL" ]
+++

`DISTINCT` clause eliminates duplicate rows from the results retrieved by `SELECT` statement. It keeps one row for each group of duplicates. This one row is unpredictable unless `ORDER BY` is used to ensure that the desired row appears first

```sql
SELECT DISTINCT department FROM employees;
```

`DISTINCT` can be also used on multiple columns at once; in that case it will evaluate the duplicates based on the combination of values of those columns.

`DISTINCT` behavior can be simulated by `GROUP BY` clause.

```sql
SELECT department FROM employees GROUP BY department;
```

Let's imagine we have a two separate tables: `users` and `logins`. We will use `DISTINCT ON` to find the information about the most recent login by each user.

```sql
CREATE TABLE users (
	username text not null,
	email text not null,
  CONSTRAINT users_pk PRIMARY KEY (username)
);
```

```sql
INSERT INTO users (username, email) VALUES
 ('Zosia', 'zosia@example.com'),
 ('Jasiu', 'jasiu@example.com'),
 ('Krysia', 'krysia@example.com');
```

```sql
CREATE TABLE logins (
  username text not null,
	browser text not null,
	logged_at timestamp not null,
  CONSTRAINT logins_pk PRIMARY KEY (username, logged_at),
  CONSTRAINT logins_fk_username FOREIGN KEY (username) REFERENCES users(username)
);
```

```sql
INSERT INTO logins (username, browser, logged_at) VALUES
  ('Zosia', 'Safari', '2000-01-01 11:10:01'),
  ('Zosia', 'Chrome', '2000-01-02 11:10:01'),
  ('Zosia', 'Safari', '2000-01-03 11:10:01'),
  ('Jasiu', 'Firefox', '2000-02-01 11:10:01'),
  ('Jasiu', 'Chrome', '2000-02-02 11:10:01'),
  ('Jasiu', 'Chrome', '2000-02-03 11:10:01'),
  ('Krysia', 'Opera', '2000-03-01 11:10:01'),
  ('Krysia', 'Safari', '2000-03-02 11:10:01'),
  ('Krysia', 'Opera', '2000-03-03 11:10:01');
```

Here's our query which joins those two tables and prints the most recent login. `DISTINCT ON` requires that its expression (i.e. `u.username` in our example) must match the first expression used in `ORDER BY` clause.

```sql
SELECT DISTINCT ON (u.username) u.username, u.email, l.browser, l.logged_at
FROM users u
JOIN logins l ON l.username = u.username
ORDER BY u.username, logged_at DESC
```

Here's the result:

```
 username │       email        │ browser │      logged_at
──────────┼────────────────────┼─────────┼─────────────────────
 Jasiu    │ jasiu@example.com  │ Chrome  │ 2000-02-03 11:10:01
 Krysia   │ krysia@example.com │ Opera   │ 2000-03-03 11:10:01
 Zosia    │ zosia@example.com  │ Safari  │ 2000-01-03 11:10:01
```

Let's consider another example: /find the employee with the highest salary in each department/. The naive solution could look as the following:

```sql
SELECT  * FROM employees WHERE
  (department, salary) IN (
    SELECT department, MAX(salary) FROM employees
    GROUP BY department
  )
ORDER BY department;
```

We could also use `PARTITION` to achieve the same effect.

```sql
WITH ranked_employees AS (
  SELECT ROW_NUMBER() OVER (
    PARTITION BY department ORDER BY salary DESC
  ) AS rn, * FROM employees
)
SELECT * FROM ranked_employees
WHERE rn = 1
ORDER BY department;
```

PostgreSQL's `DISTINCT ON` clause, however, greatly simplifies that query.

```sql
SELECT DISTINCT ON (department) * FROM employees
ORDER BY department, salary DESC;
```
