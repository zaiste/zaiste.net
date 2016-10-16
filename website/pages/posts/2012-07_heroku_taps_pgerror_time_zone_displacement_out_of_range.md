---
created_at: 2012-07-21 
kind: article
publish: true
title: "Heroku Taps - PGError time zone displacement out of range"
tags:
- heroku
- postgresql
---

While using `heroku db:push` command with `ruby 1.9.3` you may encounter the 
following error:

```
schema_migrat: 100% |==========================================| Time: 00:00:00
places:          0% |                                          | ETA: --:--:--
Saving session to push_201207251537.dat..
!!! Caught Server ExceptionHTTP
CODE: 500
Taps Server Error: PGError: ERROR:  time zone displacement out of range: 
  "2012-03-27 12:00:00.000000+5894433600"
```

The solution is to switch locally to `ruby 1.9.2` before pushing the database 
with `heroku db:push`. Once it's completed, you can switch back to `ruby 1.9.3`.

Check this [issue on GitHub](https://github.com/ricardochimal/taps/issues/93)
for more details.
