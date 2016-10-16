---
created_at: 2012-07-19 
kind: article
publish: true
title: "Command & Line - Google Services"
tags:
- cli
---

[GoogleCL](http://code.google.com/p/googlecl/) is a small wrapper for Google
services that makes them available on the command line. It currently 
supports Calendar, Docs, Contacts, Blogger, Finance, Picasa and YouTube. I 
only use it to manage calendar events though. 

Adding a new calendar event is simple as:

```
google calendar add "Lunch with Jim at noon tomorrow"
```

GoogleCL is a cross-platform Python application. It is available through
[pip](http://www.pip-installer.org/). 

```
pip install googlecl
```

