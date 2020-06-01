
+++
date = 2014-12-01T00:00:00.000Z


title = "Using Redis in Go"
topics = [ "Redis", "Go" ]

+++

Install [redigo][1], one of recommended Go clients for the Redis database (its
[API Reference][2]).

```
go get github.com/garyburd/redigo/redis
```

Open the connection to Redis instance

```
c, err := redis.Dial("tcp", ":6379")
if err != nil {
    panic(err)
}
defer c.Close()
```

Set values

```
c.Do("SET", "foo", "This is foo")
c.Do("HSET", "bar", "1", "First bar")
```

Read values

```
val1, err := redis.String(c.Do("GET", "foo"))
if err != nil {
    fmt.Println("key not found")
}

val2, err := redis.String(c.Do("HGET", "bar", "1"))
if err != nil {
    fmt.Println("key not found")
}
```

The snippet is available [here][4]. Don't forget to have a Redis instance running
on port `6379`.

[1]: http://github.com/garyburd/redigo
[2]: http://godoc.org/github.com/garyburd/redigo/redis
[4]: https://gist.github.com/zaiste/47edd23368f63f8bd1c0

