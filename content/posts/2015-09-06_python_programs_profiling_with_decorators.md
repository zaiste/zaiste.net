
+++
date = 2015-09-06T00:00:00.000Z


title = "Python programs profiling with decorators"
topics = [ "python", "profiling" ]

+++

[time.time][1] measures overall execution time of a command. It includes time
spent by other processes, i.e. it is the time that user notices, so it is not
optimal to compare algorithmic efficiency.

```
import time

start = time.time()

# Code to be profiled goes here

end = time.time()
print('{:.2f}'.format(end - start))
```

[psutil][2]

psutil is a python library that provides an interface for retrieving information
on running processes. It provides convenient, fast and cross-platform functions
to access the memory usage of a Python module:

psutil (python system and process utilities) is a cross-platform library for
retrieving information on running processes and system utilization (CPU, memory,
disks, network) in Python. It is useful mainly for system monitoring, profiling
and limiting process resources and management of running processes. It
implements many functionalities offered by command line tools such as: ps, top,
lsof, netstat, ifconfig, who, df, kill, free, nice, ionice, iostat, iotop,
uptime, pidof, tty, taskset, pmap.

psutil.cpu_percent()
Return a float representing the current system-wide CPU utilization as
a percentage.

psutil.cpu_count(logical=True)[source]
Return the number of logical CPUs in the system (same as os.cpu_count() in
Python 3.4).

psutil.virtual_memory()[source]
Return statistics about system memory usage
total: total physical memory.
available: the memory that can be given instantly to processes without the
system going into swap.

values = psutil.virtual_memory()

display in MB format

total = values.total >> 20
display in GB format

total = values.total >> 30

RSS (Resident Set Size), which is what most people usually rely on, is
misleading because it includes both the memory which is unique to the process
and the memory shared with other processes.

What would be more interesting in terms of profiling is the memory which would
be freed if the process was terminated right now. In the Linux world this is
called USS (Unique Set Size), and this is the major feature which was introduced
in psutil 4.0.0 (not only for Linux but also for Windows and OSX).

The USS (Unique Set Size) is the memory which is unique to a process and which
would be freed if the process was terminated right now.

http://grodola.blogspot.com/2016/11/psutil-500-is-around-twice-as-fast.html


import time
import functools
import os
import psutil

examples = []

def example(fn):
    @functools.wraps(fn)
    def wrapped():
        try:
            print('Running: {}'.format(fn.__name__))

            start = time.time()

            fn()

            end = time.time()
            print('{:.2f}'.format(end - start))

            process = psutil.Process(os.getpid())
            print('{:.2f} MB\n'.format(process.memory_info().rss / 1024 / 1024))
        except KeyboardInterrupt:
            print('Skipping...')

    examples.append(wrapped)
    return wrapped


[2]: https://pythonhosted.org/psutil/
