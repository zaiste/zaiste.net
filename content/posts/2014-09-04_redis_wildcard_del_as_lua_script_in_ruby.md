
+++
date = 2014-09-04T00:00:00.000Z


title = "Redis wildcard DEL as Lua script in Ruby"
topics = [ "Redis", "Lua", "Ruby" ]

+++

In Redis, [KEYS][1] returns keys matching a pattern while [DEL][2] removes the
specified key. It is not possible with `DEL`to remove keys matching a pattern.

Redis 2.6 introduces an ability to atomically execute [Lua][3] scripts using
[EVAL][4]. This feature can be used to write a version of `DEL` that accepts
wildcard patterns. Below in Ruby flavour, it removes all keys starting with
`444:`.

```
require 'redis'

RedisConn = Redis.new
RedisConn.eval(<<-LUA, [], ["441:*"])
local keys = redis.call('keys', ARGV[1])
for i=1,#keys,5000 do
  redis.call('del', unpack(keys, i, math.min(i+4999, #keys)))
end
return keys
LUA
```


[1]: http://redis.io/commands/keys
[2]: http://redis.io/commands/del
[3]: http://www.lua.org/
[4]: http://redis.io/commands/eval
