---
created_at: 2013-05-01
kind: article
publish: true
title: "Python Development 101"
tags:
- python
- 101
---

This article explains in a nutshell how to get start with developing applications
in Python. It gives a brief overview of the language and its ecosystem along with
a practical, hands-on tutorial.

## Language

Python is a dynamic, strongly typed programming language. *Dynamic* means that
type checking is performed at run-time. *Strongly typed*, in context of Python,
means that there is very little implicit type conversion. In particular,
expressions such as `'1' + 1` or `[1] - 1` will raise `TypeError` exception;
equality operator is also strict e.g. `{} == []` or `"" == {}` will evaluate to
`False`.

Everything is an
object, including data types. `None` is a value used to denote the absence of value
and it is also an object. For more information, check [Python on Wikipedia][1]

Python comes with an interactive programming environment (REPL), but
[IPython][2] (an enhanced Interactive Python) is much better alternative.

```
λ pip install IPython
λ ipython
```

`help(object)` provides a documentation for each object (including functions
which are objects as well).

For string interpolation a `.format()` based syntax is recommended, instead of
old, printf-style formatting.

```
# Recommended
"Simple {} and a float {:.2f}, large number {:,}".format('phrase', 34.2234, 1000000)

# Deprecated
"Simple %s and a float %.2f, large number %d" % ('phrase', 34.2234, 1000000)

=> 'Simple phrase and a float 34.22, large number 1,000,000'
```

Instead of using `if` statement to check if an action is valid, it is more
*pythonic* to use exception-based flow and wrap a given block of code in
`try/except` statement.

List comprehensions should be prefered over `map` and `filter` functions.

Some of Python 3 improvements can be enabled in Python 2 by adding the following
`import` at the top of your files:

```
from __future__ import absolute_import, division, print_function,
unicode_literals
```

Be sure to check [Code like a Pythonista: Idiomatic Python][12] and
[Filesystem structure of a Python project][13].


## Ecosystem

[PyPI][3] (Python Package Index) is a software repository of third-party,
open-source libraries. It is similar to RubyGems for Ruby, NPM for Node.js or
CPAN for Perl.

[pip][4] is tool for installing packages from the PyPI. `ease_install` is `pip`
predecessor. It is a common practice to use `pip` instead of `easy_install`
because it provides better package management: not only installing, but also
uninstalling packages, resolving dependencies for a package and specifying
project's dependencies with `requirements.txt`. Unlike Ruby's `bundler`, `pip`
cannot manage different versions of the same library: installing globally
overrides its previous version.

To counter last problem, Python uses virtual environments. [virtualenv][5] is a
tool which isolates dependencies for each project by creating a special
directory only with packages needed by the project and in specific versions.
This way it is easier to work on more than one project at a time without
introducing conflicts in their dependencies. Each virtual environment provides
a copy of Python and pip binaries. Python 3.3 supports virtual environments out
of the box: it is accessible with `pyenv` command.

## Global Setup

Install Python, on OSX with:

```
λ brew install python
```

on Ubuntu with:

```
λ apt-get install python python-pip python-dev
```

**Note** these commands install `pip` globally which is [not recommended][10],
but I find it easier.

Install `virtualenv`:

```
λ pip install virtualenv
```

## Per-Project Setup

Create a project directory:

```
λ mkdir morelia
λ cd morelia
```

Activate a virtual environment for newly created project. A common convention
is to call this directory `env` or `venv`:

```
λ virtualenv venv
New python executable in venv/bin/python
Installing setuptools............done.
Installing pip............…done.
```

Code is located at `/path/to/morelia` and its environment at
`/path/to/morelia/venv`. `venv` shouldn't be committed to the repository. Add
it to your `.gitignore` or `.hgignore`. Let's list virtual environment directory:

```
λ ls venv
bin include lib
```

`bin/` contains a local copy of Python binary along with `pip`.

Activate the environment:

```
λ source venv/bin/activate
```

Check if Python and pip binaries are correctly referenced:

```
λ which python
/path/to/morelia/venv/bin/python
λ which pip
/path/to/morelia/venv/bin/pip
```

**Note** Python 3.3 comes with [virtualenv by default][8]. You can create
a virtual environment in current directory by executing:

```
λ pyvenv venv
```

Install a package from PyPI to this project virtual environment:

```
λ pip install pyramid
```

Or install a package in a specific version:

```
λ pip install pyramid==1.0
```

Other useful, self-explanatory commands:

```
λ pip show --files pyramid
λ pip list --outdated
λ pip install --upgrade pyramid
λ pip uninstall pyramid
```

Each project may have a `requirements.txt` that specifies project
dependencies. They can be installed via

```
λ pip install -r requirements.txt
```

More about [requirement files][11].

## Extras

### virtualenvwrapper

[virtualenvwrapper][6] is a virtualenv extension which helps organise virtual environments: instead of putting each of them inside project directory, it organises them all in one place and it adds wrappers to make management easier along with hook actions.

Install `virtualenvwrapper` with `pip`:

```
λ pip install virtualenvwrapper
```

I like keeping virtual environments in `~/.virtualenvs` which is default location. If you prefer a different one, it can be configured via WORKON_HOME shell variable.

Add one of following lines to your `.zshrc` or `.bashrc` depending on your OS.

```
source '/usr/local/share/python/virtualenvwrapper.sh'  # OSX, Python installed with Homebrew
```
```
source /usr/local/bin/virtualenvwrapper.sh  # Ubuntu, Python installed with apt-get
```

Additionally, set the `VIRTUALENVWRAPPER_VIRTUALENV_ARGS` to `--no-site-packages` to ensure that all new environments are isolated from the system site-packages directory.

Create a virtual environment:

```
λ mkvirtualenv morelia
New python executable in morelia/bin/python
Installing setuptools............done.
Installing pip...............done.
(morelia) λ
```
It automatically activates this virtual environment as well.

Deactivate current virtual environment:

```
(morelia) λ deactivate
λ
```

Choose from existing virtual environments:

```
λ workon
morelia
test
λ workon morelia
(morelia) λ
```

Check [this short screencast][7] that goes through almost all `virtualenvwrapper` features. If you use `oh-my-zsh`, there is a nifty `virtualenvwrapper` plugin that adds virtual environment names completion.

### Python 3 Installation

On OSX, using Hombrew:

```
λ brew install python3
```

On any modern OS, from source:

```
curl -O http://python.org/ftp/python/3.3.0/Python-3.3.0.tar.bz2
tar jxf ./Python-3.3.0.tar.bz2
cd ./Python-3.3.0
./configure --prefix=/opt/python3.3
make && sudo make install
```

On any modern OS, using [pythonz][9], a Python installation manager which automates the process of building and installing Python versions, similar to Ruby's `rvm` or `rbenv` + `ruby-build`. It supports CPython, Stackless, PyPy and Jython.

Install `pythonz`:

```
λ curl -kL https://raw.github.com/saghul/pythonz/master/pythonz-install | bash
```

Add this line to your `.bashrc` or `.zshrc`:

```
[[ -s $HOME/.pythonz/etc/bashrc ]] && source $HOME/.pythonz/etc/bashrc
```

Start new terminal and install desired Python version:

```
λ pythonz install 3.3.1
```

For more information about available commands, check `pythonz` help

```
λ pythonz help
```

[1]: http://en.wikipedia.org/wiki/Python_(programming_language)
[2]: http://ipython.org/
[3]: https://pypi.python.org/pypi
[4]: http://www.pip-installer.org/
[5]: http://www.virtualenv.org/
[6]: http://virtualenvwrapper.readthedocs.org/
[7]: https://vimeo.com/5894881
[8]: http://docs.python.org/3/library/venv.html#module-venv
[9]: https://github.com/saghul/pythonz
[10]: http://www.pip-installer.org/en/latest/installing.html#installing-globally
[11]: http://www.pip-installer.org/en/latest/cookbook.html#requirements-files
[12]: http://python.net/~goodger/projects/pycon/2007/idiomatic/handout.html
[13]: http://as.ynchrono.us/2007/12/filesystem-structure-of-python-project_21.html

