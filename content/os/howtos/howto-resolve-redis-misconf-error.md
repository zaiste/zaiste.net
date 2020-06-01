
+++

+++
# How To Resolve Redis' ```
undefined
``` Error

Here's the error:

    MISCONF Redis is configured to save RDB snapshots, but is currently not able to
    persist on disk. Commands that may modify the data set are disabled. Please
    check Redis logs for details about the error.

It means that Redis is not able to save data on the disk. This error occurs because of BGSAVE being failed. During BGSAVE, Redis forks a child process to save the data on disk.

Redis doesn't need as much memory as the OS thinks it does to write to disk, so may pre-emptively fail the fork.

Set ```
undefined
``` to ```
undefined
``` in the ```
undefined
```:

```bash 
vm.overcommit_memory=1
```

And then, restart the ```
undefined
``` process:

```bash 
sudo sysctl -p /etc/sysctl.conf
```

**Important**: Setting the ```
undefined
``` option to ```
undefined
``` in Redis **doesn't**solve the problem, it just ignores it.

