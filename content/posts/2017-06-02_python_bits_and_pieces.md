
+++
date = 2017-06-02T00:00:00.000Z


title = "Python Bits and Pieces"
topics = [ "python" ]

+++

## Install Python 3

On macOS:

```
brew install python3
```

Ubuntu 16.04, Debian 8, and other versions of Debian Linux ship with both Python 3 and Python 2 pre-installed.

```
apt-get install build-essential libssl-dev libffi-dev python-dev
apt-get install -y python3-pip
apt-get install -y python3-venv
```

## Create virtual environment

Virtual environments provide an isolated space for Python projects, ensuring that each of them have its own, isolated set of dependencies.

```
python3 -m venv ~/.venv/NAME
source ~/.venv/NAME/bin/activate
```

Inside virtual environments you can use `python` command instead of `python3` and `pip` command instead of `pip3`.

## Freeze requirements

```
pip freeze > requirements.txt
```


## Print to `stderr`

```python
import sys
print('your error message', file=sys.stderr)
```

## Print with formatting

```python
print "Who lives in a Pineapple under the sea? \n{name}.".format(name=name)
print "my {0} string: {1}".format("cool", "Hello there!")
```

`%`-syntax is deprecated in Python 3.

## Join

```python
" ".join(["aaa", "bbb", "ccc"])
" ".join(str(item) for item in my_list)
```

## Filesystem

```python
import os
>>> filepath
'/a/path/to/my/file.txt'
>>> os.path.dirname(filepath)
'/a/path/to/my'
```

```python
import glob
>>> glob.glob('./*.txt')
['./outline.txt', './pip-log.txt', './test.txt', './testingvim.txt']
```

```python
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.txt'):
            print file
```

```python
import glob
for f in glob.iglob("/mydir/*/*.txt"):
    print f
```

## Read multiple YAML files

```python
import yaml
import glob

configs = map(lambda x: yaml.load_all(open(x)), glob.glob("*.yaml"))

for config in configs:
     for item in config:
         print item
```

## Matrices

```python
results = [i * j for i in range(1, 4) for j in range(1, 5)]

from itertools import product
results = [i * j for i, j in product(range(1, 4), range(1, 5))]
```

## Transpose Matrix

```python
matrix = []
for i in range(1, 4):
    row = []
    for j in range(1, 5):
        row.append(i * j)
    matrix.append(row)

matrix = [[i * j for j in range(1, 5)] for i in range(1, 4)]

transposed = [list(row) for row in zip(*matrix)]

transposed = list(map(list, zip(*matrix)))
```

## Dictionaries

Extract elements from a `dict`:

```python
def extract(dictionary, keys):
     return dict((k, dictionary[k]) for k in keys if k in dictionary)
```

Extract elements from a `dict` using `dict`-comprehensions

```python
{k: dictionary[k] for k in dictionary if k not in keys}
```

Remove all keys that begin with a letter `s`:

```python
for k in dic.keys():
  if k.startswith('s_'):
    dic.pop(k)
```

```python
for k in dic.keys():
  if k.startswith('s_'):
    del dic[k]
```

`del` is slightly faster.


using `dict`-comprehension in Python 3

```python
{k, v: for k, v in dic.items() if not k.startswith("s_")}
```

in Python 2

```python
dict((k, v) for k, v in dic.items() if not k.startswith("s_"))
```

Remove several keys

```python
>>> a
{'a': 1, 'c': 3, 'b': 2, 'd': 4}
>>> keys = ["b", "c"]
>>> print {key: a[key] for key in a if key not in keys}
{'a': 1, 'd': 4}
>>>
```

Python convention is to use list comprehensions (or generator expressions) to achieve the same result as a call to map, particularly if you're using a lambda expression.

## Cartesian product

```python
from operator import add
reduce(add, map(lambda i: map(lambda j: (i, j), lst), lst))
```

```python
from itertools import product
list(product(lst, lst))
```

`itertools` contains functions that help doing functional-style lazy-evaluation programming in Python.

`itertools.imap()` is just like `map()` but it stops as soon as the shortest iterable stops.

```
itertools.imap(maptest, foos, itertools.repeat(bars))
```

## Flash messages in Flask


```python
flash('You were successfully logged in')
return redirect(url_for('index'))
```

```html
{% with messages = get_flashed_messages() %}
  {% if messages %}
    <ul class=flashes>
    {% for message in messages %}
      <li>{{ message }}</li>
    {% endfor %}
    </ul>
  {% endif %}
{% endwith %}
```

## Invoke an RPC method

```python
$ python -c 'import xmlrpclib; print xmlrpclib.Server("http://host:8080").methodName(param,param2)'
```

## Time Python invocations

```
$ python -m timeit -s "import json" "json.dumps({'a':'a'})"
100000 loops, best of 3: 5.98 usec per loop
```

## Get random element from array

```
arr = [ ... ]
el = arr[int(math.floor(random.random() * len(arr)))]
```

## Run SMTP, HTTP or CGI server

```
$ python -m smtpd -n -c DebuggingServer localhost:25
$ python -m SimpleHTTPServer 8080
$ python -m CGIHTTPServer 9080
```
