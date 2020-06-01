
+++
date = 2015-07-10T00:00:00.000Z


title = "Logging requests and responses for Axis2 client"
topics = [ "axis2", "soap" ]

+++

To turn on [Axis2][1] client-side logging of SOAP messages, you need to pass to
the JVM the following options using `JAVA_OPTS` environment variable:

```
-Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.SimpleLog
-Dorg.apache.commons.logging.simplelog.showdatetime=true
-Dorg.apache.commons.logging.simplelog.log.httpclient.wire=debug
-Dorg.apache.commons.logging.simplelog.log.org.apache.commons.httpclient=debug
```

i.e.

```
export JAVA_OPTS=(from above)
java $JAVA_OPTS YourApp
```

[1]: https://axis.apache.org/
