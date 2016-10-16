---
created_at: 2015-08-22
kind: article
publish: true
title: "Python Package 101"
image: "python.jpg"
tags:
- python
---

In order to distribute a Python application, you need to create a Python package
by wrapping project directory with some additional files, specifing related
elements e.g. resources, dependencies and finally releasing it.

## Creating a Python Package

This is an example of a Pyhon package distribution file (named: `setup.py`).

```
from setuptools import setup

setup(
    name = 'zaiste',
    version = '0.1.0',
    description = 'A Python package example',
    author = 'Zaiste',
    long_description=open("README.txt").read(),
    author_email = 'oh@zaiste.net',
    url = 'https://github.com/zaiste/zaiste-py',
    packages=['zaiste'],
    include_package_data=True,
    install_requires=[
        # list of this package dependencies
    ],
    entry_points={
        'console_scripts': ['zaiste-cli=zaiste.cli:main'],
    }
)
```

In order to facilitate the tasks of distribution, Python distribution utilities
toolset `distutils` was created by the Python core team. It is, however,
preferable to use a 3rd party `setuptools` instead.

If you need to add extra non-Python files and directories e.g. static files or
templates, you must explicitly specify them in the manifest file (`MANIFEST.in`)
to be packaged along with adding `include_package_data=True` to the `setup()`
function.

```
include README.rst
include docs/*.md
recursive-include templates *
recursive-include static *
```

Additionally, you can use packages that are properly arranged using `setuptools`,
but aren’t published to PyPI; `dependency_links=` option is used for that:

```
setup(
    ...
    dependency_links=['http://github.com/zaiste/zaiste-py/tarball/master#egg=package-2.0']
    ...
)
```

You can now create a Python package for this project

```
python setup.py sdist
```

and install it locally

```
pip install .
```

The command above is similar to `python setup.py install` but:

- it automatically downloads all dependencies
- you can easily uninstall and update packages with a single command
- `pip` will automatically search the Python Package Index (PyPi)
- `pip` is bundled with Python (as of Python 2.7.9 / Python 3.4.0)

or install the package with a symlink (changes to the source files will be
immediately available to other users of the package)

```
pip install -e .
```

Python package (and module) names should be in lowercase, unique on PyPI, with
no hyphens (`-`) and prefereably no underscore (`_`) signs

```
zaiste/
    zaiste/
        __init__.py
    setup.py
```

## Adding tests

Create a `tests` directory inside your module

```
zaiste/
    zaiste/
        __init__.py
        tests/
            __init__.py
            test_zaiste.py
    setup.py
```

and use `unittest` to write simple unit tests

```
from unittest import TestCase

import zaiste

class TestZaiste(TestCase):
    def test_is_string(self):
        s = zaiste.cli()
        self.assertTrue(isinstance(s, basestring))
```

You can use [Nose][2] to easily run those tests

```
$ pip install nose
$ nosetests
```

Nose integrates with `setup.py`

```
setup(
    ...
    test_suite='nose.collector',
    tests_require=['nose'],
)
```

so you can just do

```
python setup.py test
```

## Adding Command Line Scripts

You can use `scripts`

```
setup(
    ...
    scripts=['bin/zaiste-cli'],
    ...
)
```

using the following script

```
#!/usr/bin/env python

import zaiste
print zaiste.cli()
```

and put the script inside `bin` directory

```
zaiste/
    zaiste/
        __init__.py
    setup.py
    bin/
        zaiste-cli
```

in order to run it as

```
$ zaiste-cli
```

Alternatively you can use `console_scripts` provided by `setuptools` so a Python
function can be directly registered as command-line script. It will generate a
standalone script *shim* which imports the module and calls the registered
function.

```
setup(
    ...
    entry_points = {
        'console_scripts': ['zaiste-cli=zaiste.cli:main'],
    }
)
```

with `cli.py` defined as:

```
import zaiste

def main():
    print zaiste.cli()
```

and put directly inside a module

```
zaiste/
    zaiste/
        __init__.py
        cli.py
    setup.py
```

This method of adding command-line scripts is preferable as it is very easily
testable:

```
from unittest import TestCase
from zaiste.cli import main

class TestConsole(TestCase):
    def test_basic(self):
        main()
```


[2]: https://nose.readthedocs.io/
