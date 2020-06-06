+++
date = 2012-04-30T00:00:00.000Z
title = "Installing python 2.7 on osx with homebrew"
aliases = [
    "installing_python_27_on_osx_with_homebrew"
]
[taxonomies]
topics = [ "Python", "MacOS" ]
+++

Installing [Python](http://www.python.org/) with [Homebrew](http://mxcl.github.com/homebrew/) may have some quirks. Keep reading to see how to do it the right way.

Let's start by updating Homebrew repository

    brew update

then we install Python (2.7 in my case)

    brew install python

Now, we should switch to PIP as advised via [this poster](http://s3.pixane.com/pip_distribute.png)

Unfortunately, Homebrew installer puts `easy_install` package in the following directory

    /usr/local/share/python/easy_install

Presumably, you have only `/usr/local/bin` in your `PATH`. In such case executing `easy_install` will take the Python binary that is bundled with OSX. We must change it to keep things fine and dandy on your system.

Let’s add `/usr/local/share/python/easy_install` to the PATH. Next, check if it’s pointing to the valid file with `which` command

    which easy_install # => /usr/local/share/python/easy_install

Now, we can finally install `PIP`.

    easy_install pip

Let’s try and install a package, e.g. [psutil](http://code.google.com/p/psutil/)

    pip install psutil

and import it inside Python REPL.

    $ python
    >>> import psutil
    >>>

It works!
