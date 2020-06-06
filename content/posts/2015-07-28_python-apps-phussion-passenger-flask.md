
+++
date = 2015-07-28T00:00:00.000Z
title = "Python apps with Phusion Passenger: Flask example"
aliases = [
    "python_apps_with_phussion_passenger_flask_example"
]
[taxonomies]
topics = [ "Python", "Flask" ]
+++

Running Python application with Phusion Passenger may be tricky. This article
shows how to deploy a simple Flask to be run by Passenger with a properly set
virtual environment.

Let's create a simple Flask application as `web.py`

```
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return 'Hello World in Flask'

if __name__ == "__main__":
    app.run()
```

Check if it works

```
$ python web.py
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

In a separate window

```
$ curl localhost:5000
Hello World in Flask
```

Create `python_wsgi.py` in the root of your project.

```
import sys, os
from web import app as application

HOME = os.environ.get('HOME')

VENV = HOME + '/.venv/app-virtual-env'
PYTHON_BIN = VENV + '/bin/python3'

if sys.executable != PYTHON_BIN:
    os.execl(PYTHON_BIN, PYTHON_BIN, *sys.argv)

sys.path.insert(0, '{v}/lib/python3.5/site-packages'.format(v=VENV))
```

Virtual environments are stored in `$HOME/.venv` with `app-virtual-env` specified
as the one to be used by Phussion Passenger while running this application.

Create `public/` directory in the root of your application and adjust the Nginx
configuration with proper values for `server_name` and `root`.

```
server {
  listen 80;
  server_name app.example.com;

  root /path/to/your/app/public;

  passenger_enabled on;
}
```
