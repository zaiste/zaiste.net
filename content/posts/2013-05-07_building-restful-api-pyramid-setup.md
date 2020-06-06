
+++
date = 2013-05-07T00:00:00.000Z
title = "Building a RESTful API with Pyramid - Setup"
aliases = [
    "building_a_restful_api_with_pyramid_setup"
]
[taxonomies]
topics = [ "Python", "API", "REST" ]
+++

Last month, I had a pleasure to attend a [San Francisco Python Meetup][3] where Roy Hyunjin Han gave an introduction to [Pyramid framework][4], entitled « [Learn tips and tricks for developing web applications using Pyramid][5] ». His talk was well prepared, but he focused on too many different things at once - the talk might have been difficult to understand.

After the talk some people asked why and when to choose Pyramid over other Python frameworks. Unfortunately, Roy wasn't able to provide a good answer to that. His presentation, however, gave me an idea to write a series of blog posts about Pyramid, based on my own experience. In the next few weeks I'll be building a RESTful API with Pyramid. Hopefully, it will provide good arguments in favour of Pyramid framework.

I plan to publish six articles in this series:

1. [Building a RESTful API with Pyramid - Setup][6] (this article)
2. Building a RESTful API with Pyramid - Resource and Traversal
3. Building a RESTful API with Pyramid - Generic Resources
4. Building a RESTful API with Pyramid - Data Validation
5. Building a RESTful API with Pyramid - Towards Production API
6. Building a RESTful API with Pyramid - Authentication and ACL

## Introduction

There are two major features that make Pyramid a unique web framework in my opinion. The first one is its design: minimal, unobtrusive and agnostic - which makes it perfect for medium to large-scale applications. If you take any framework that strongly favours convention over configuration like Django or Rails, in many cases, for large applications, you may end up rewriting the framework from ground up. You try to bend to your needs, but it is not meant to be used in that way. At that level, the framework hinders further development while initially it was meant to boost it. Pyramid has a stepper learning curve, but it is more efficient to use in such situation.

Second great feature of Pyramid is traversal: a routing mechanism in many situations far superior than commonly used URL dispatch. Traversal let you think of routes as of tree structures. This abstraction provides more control over routes, which is especially useful for implementing Access Control Lists (ACL). Nested routes can easily inherit access rights from their parents. It may result in simpler and easier to maintain code compared to traditional URL dispatch approach. Additionally, it really shines when used in conjunction with document-oriented databases such as MongoDB. Routes abstraction may map directly to underlaying data structures.

On top of that Pyramid is at the moment the fastest web framwork in Python.

In this series, I'll be building an dummy API from scratch for anyone without any prior knowledge about Pyramid. The application will be providing basic information about cities such as its population, region or density. My goal is to show the situations in which Pyramid may be a more adapted solution than other frameworks.

## Setup

I assume Python is installed along with `pip` and `virtualenv`. If not, check out my [Python 101][1] post. `cityz` will be name of the project and the code will be [available on Github][7].

Let's begin by creating a virtual environment for the new project:

```
λ mkvirtualenv cityz
New python executable in cityz/bin/python
Installing setuptools............done.
Installing pip............…done.

(cityz) λ pip install pyramid
Downloading/unpacking pyramid
...
[cut]
```

## Minimal Viable Example

Here's the most basic Pyramid application adapted from [the official Pyramid tutorial][2].

```
from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response


def list_cities(request):
    return Response('List of cities\n')

def get_city(request):
    return Response('A city named %(name)s\n' % request.matchdict)

if __name__ == '__main__':
    config = Configurator()

    config.add_route('cities', '/cities')
    config.add_route('city', '/cities/{name}')

    config.add_view(list_cities, route_name='cities')
    config.add_view(get_city, route_name='city')

    app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 6543, app)
    server.serve_forever()
```

Run it with `python`

```
(cityz) λ python app.py
```

Make a request using `curl` to check if it works

```
(cityz) λ curl localhost:6543/cities
List of cities
(cityz) λ curl localhost:6543/cities/Paris
A city named Paris
```

## From Scaffold

Pyramid provides scaffolds (or simply app templates) that make project generation more convenient. We will use `starter` scaffold with some manual adjustements.

Generate a project using the `starter` scaffold.

```
(cityz) λ pcreate -s starter cityz
Creating directory /Users/zaiste/code/cityz
...
[cut]
```

Generated project directory structure:

```
(cityz) λ cd cityz
(cityz) λ tree
.
├── CHANGES.txt
├── MANIFEST.in
├── README.txt
├── development.ini
├── cityz
│   ├── __init__.py
│   ├── static
│   │   ├── favicon.ico
│   │   ├── footerbg.png
│   │   ├── headerbg.png
│   │   ├── ie6.css
│   │   ├── middlebg.png
│   │   ├── pylons.css
│   │   ├── pyramid-small.png
│   │   ├── pyramid.png
│   │   └── transparent.gif
│   ├── templates
│   │   └── mytemplate.pt
│   ├── tests.py
│   └── views.py
├── production.ini
├── setup.cfg
└── setup.py

3 directories, 20 files
```

Register the project as a development egg in your virtual environment.

```
(cityz) λ python setup.py develop
running develop
running egg_info
creating cityz.egg-info
...
[cut]
```

Finally, start the application.

```
(cityz) λ pserve --reload development.ini
```

Verify if it's working

```
(cityz) λ curl -I localhost:6543
HTTP/1.1 200 OK
Content-Length: 56026
Content-Type: text/html; charset=UTF-8
Date: Thu, 11 Jan 2013 22:06:07 GMT
Server: waitress
```

If you open `localhost:6543` in your browser, you will see a *Debug Toolbar* that greatly helps while developing classic web applications. It's not that useful, however, for an API application.


## Basic API

As we develop an API application, we won't be using any template engine - simply remove `static` and `templates` directories.

```
(cityz) λ rm -rf static/
(cityz) λ rm -rf templates/
```

Our API will be responding only in JSON format. Inside `cityz/views.py`, add a `CITIES` dictionary along with two *view methods* for retrieving cities: as a list and as a single city by name - both decorated with `@view_config`. Note the JSON renderer in that decorator.

```
CITIES = {
    'paris': {
        'name': 'Paris',
        'population': '2,234,105'
    },
    'sf': {
        'name': 'San Francisco',
        'population': '812,826'
    }
}

@view_config(route_name='city', renderer='json')
def get_city(request):
    name = request.matchdict['name']
    return CITIES[name]

@view_config(route_name='cities', renderer='json')
def list_cities(request):
    return CITIES
```

Inside `cityz/__init__.py` add two routes that correspond to these views.

```
def main(global_config, **settings):
    ...
    config.add_route('cities', '/cities')¬
    config.add_route('city', '/cities/{name}')
    ...
```

Let's run the server and test it:

```
λ curl localhost:6543/cities/sf
{"name": "San Francisco", "population": "812,826"}
λ curl localhost:6543/cities/paris
{"name": "Paris", "population": "2,234,105"}
λ curl localhost:6543/cities
{"paris": {"name": "Paris", "population": "2,234,105"}, "sf": {"name": "San Francisco", "population": "812,826"}}
```

## Summary

In the first article we focused on setting up basic Pyramid API-like application. We have generated that application using a scaffold. It has only two routes and responds in JSON format. In the next article, we will add a persistence layer based on MongoDB along with basic routing mechanism based on traversal.


[1]: http://zaiste.net/2013/05/python_development_101/
[2]: http://docs.pylonsproject.org/projects/pyramid/en/1.4-branch/narr/firstapp.html
[3]: http://www.meetup.com/sfpython/
[4]: http://docs.pylonsproject.org/en/latest/docs/pyramid.html
[5]: http://marakana.com/s/post/1443/developing_web_apps_with_the_python_pyramid_framework_video
[6]: /2013/05/building_a_restful_api_with_pyramid_setup/
[7]: http://github.com/zaiste/cityz
