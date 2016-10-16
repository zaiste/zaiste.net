---
created_at: 2013-01-07
kind: article
publish: true
title: "Async Python - Short Gevent Introduction"
tags:
- python
- async
- gevent
---

Python provides a variety of methods to handle asynchronous programming. One of them is a [Gevent][1], a concurrency library which provides *greenlets* a thread-like abstraction. Greenlets wrap up an event loop and allow an asynchronous code execution.

## What is Greenlet?

A greenlet is implemented as a [coroutine][2] and it represents a task scheduled to run cooperatively inside of the OS process. Some people favour greenlets over nesting callback, arguing that linear code composition is simpler to understand. Also, because of [GIL][3], threads in Python don't provide a real concurrency

Only one greenlet can run at any given time. We talk about a *context switch*, when execution flow changes from one greenlet to another. In other words, a greenlet only « yields » to another greenlet only if a blocking function is reached e.g. `gevent.sleep()` - this is known as [cooperative multitasking][4]. Traditional threads may yield to other threads at any time, whenever OS decides to switch the context - it is called [preemptive multitasking][5].

## Greenlets over threads

Greenlets are also « cheaper » to create than threads; it makes them more adapted in situations when it is necessary to handle large number of persistent TCP connections, e.g. a server that pushes data to many clients. In that scenario spawning a lightweight greenlet per connection is more efficient than forking a thread. It also seems wasteful to allocate a thread pool of certain size beforehand in that case.

## Gevent Monkey

Gevent also provides « monkey-patched » versions of modules that act in a cooperative way for most of the blocking system calls in the standard library (including those in `socket`, `ssl`, `threading` and `select` modules). By invoking `monkey.patch_all()` we make sure that all these modules will become compatible with Gevent at runtime.

## Example

Following code adapted from [gevent examples][6] asynchronously executes `print_head` on URLs from given list.

```
import gevent
import urllib2

from gevent import monkey
monkey.patch_all()

urls = ['http://www.google.com', 'http://www.example.com', 'http://www.python.org']

def print_head(url):
    print 'Starting %s' % url
    data = urllib2.urlopen(url).read()

    print '%s: %s bytes: %r' % (url, len(data), data[:50])

jobs = [gevent.spawn(print_head, url) for url in urls]
gevent.joinall(jobs, timeout=2)
```

[1]: http://www.gevent.org/
[2]: http://en.wikipedia.org/wiki/Coroutine
[3]: http://en.wikipedia.org/wiki/Global_Interpreter_Lock
[4]: http://en.wikipedia.org/wiki/Computer_multitasking#Cooperative_multitasking.2Ftime-sharing
[5]: http://en.wikipedia.org/wiki/Computer_multitasking#Preemptive_multitasking.2Ftime-sharing
[6]: https://github.com/SiteSupport/gevent/blob/master/examples/concurrent_download.py
