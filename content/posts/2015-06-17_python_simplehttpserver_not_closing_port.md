
+++
date = 2015-06-17T00:00:00.000Z


title = "Python's SimpleHTTPServer not closing the port"
topics = [ "python" ]

+++


[SimpleHTTPServer][1] is a useful Python module that allows to start an HTTP
server from the current directory. It can be used both on command line:

    python -m SimpleHTTPServer

or from within the code:

```
import SimpleHTTPServer
import SocketServer

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
```

The code above starts the server and binds to `PORT` number. It can be stopped
with `CTRL-C`. Sometimes `SimpleHTTPServer` does not release the port it listened
on, i.e. it throws *Address already in use* when run again. It can be fixed with
`allow_reuse_address` option set to `True`.

```
...
Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
SocketServer.TCPServer.allow_reuse_address=True
httpd = SocketServer.TCPServer(("", PORT), Handler)
...
```

[1]: https://docs.python.org/2/library/simplehttpserver.html
