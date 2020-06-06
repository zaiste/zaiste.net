
+++

+++
# OpenResty

OpenResty turns the NGINX server into a web app server.

OpenResty gives us additional directives which let us script behaviour with the lua language:

+ `content_by_lua`
+ `init_by_lua`
+ `rewrite_by_lua`
+ `access_by_lua`

The `content_by_lua` directive allows to run arbitrary Lua code:

```nginx
location / {
	content_by_lua 'ngx.say("<p>hello, world</p>")';
}
```

For more complex logic there is `content_by_lua_file`.

```nginx
location /by_file {
    default_type text/html;
    lua_code_cache off;
    content_by_lua_file ./lua/hello_world.lua;
}
```

`lua_code_cache` disables the caches, so it's possible to live reload in development.

The `init_by_lua` directive allows to run initialization code during the nginx start up up. It is being used for importing and defining libraries or modules that are used in our request handlers.

```nginx
init_by_lua '
    cjson = require("cjson") -- global variable
'

location / {
    content_by_lua '
        local message = cjson.decode({hello="world"})
        ngx.say(message)
    ';
}
```

There is also `init_by_lua_file`.

`ngx.location.capture` allows to trigger an internal request.

```nginx
local res = ngx.location.capture("/some-path")
```

The `res` contains response's status, header, and body.

Pass arguments to requests:

```nginx
local options = {
    method = ngx.HTTP_POST,
    args = { maxsize = 1000 }
}
local res = ngx.location.capture("/some-path", options)
```

The ngx request object contains typical request attributes:

```nginx
local headers = ngx.req.get_headers()
local cookie = headers["Cookie"]
local etag = headers["Etag"]
local host = headers["Host"]

local body = ngx.req.read_body()
local method = ngx.req.get_method
local querystring_params = ngx.req.get_uri_args()
local post_params = ngx.req.get_post_args()
```

For the response, there is **NO** `ngx.res.body()` method. Use `ngx.print` or `ngx.say`. The latter appends the newline at the end `\n`.

```nginx
ngx.print("Hello world")
ngx.say("Hello world")
```

Send JSON response

```nginx
ngx.say(cjson.encode({a=1,b=2}))
```

