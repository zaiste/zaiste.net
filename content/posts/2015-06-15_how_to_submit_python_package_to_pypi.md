
+++
date = 2015-06-15T00:00:00.000Z


title = "How to submit a Python package to PyPI"
topics = [ "python" ]

+++

[PyPI][1] (Python Package Index) is a repository of software for Python
programming language that provides a standard format for distributing Python
programs and libraries. [pip][2] is a command line tool that allows to interact
with PyPI i.e. install packages, search the repository etc.

This short tutorial provides only a bare minimum to get you started. For more
in-depth introduction about publishing Python packages, check official Python
documentation at [Distributing Python Modules][3].

## CREATE A PYTHON PACKAGE

Let's create a package called `zaiste` (you can check the full code of this
tutorial on Github). Python package needs `setup.py` file on its root level.

```
zaiste-py
├── zaiste.py
└── setup.py
```

`setup.py`:

```
from distutils.core import setup

setup(
    name = 'zaiste',
    version = '0.1.0',
    description = 'A Python package example',
    author = 'Zaiste',
    author_email = 'oh@zaiste.net',
    url = 'https://github.com/zaiste/zaiste-py',
    py_modules=['zaiste'],
    install_requires=[
        # list of this package dependencies
    ],
    entry_points='''
        [console_scripts]
        zaiste=zaiste:cli
    ''',
)
```

`zaiste.py`:

```
def cli():
    print 'Hello Zaiste'
```


* `install_requires` allows us to define a list of this package dependencies.
* `entry_points` is useful to define an entry method for a command line tool; it
means: create a command line command called `zaiste` that will execute the code
from `cli()` method in zaiste module.

If you're using markdown format in your README you also need setup.cfg with the following content:

```
[metadata]
description-file = README.md
It is more natural to use reStructuredText (REST)
```

## PUBLISH A PYTHON PACKAGE

We are now ready to publish our package.

Register on `PyPI`

    python setup.py register

Upload to PyPI

    python setup.py sdist upload

You can now install your package with `pip install`, in our case it's going to be:

    pip install zaiste

and then

    zaiste
    > Hello Zaiste

[1]: https://pypi.python.org/pypi
[2]: https://pip.pypa.io/en/stable/
[3]: https://docs.python.org/2/distutils/index.html
