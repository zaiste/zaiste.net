---
created_at: 2014-03-03
kind: article
publish: true
title: "Nifty SSH Trick: Named Servers"
tags:
- ssh
- cli
---

Let’s suppose you need to use a different SSH key-pair per Git repository e.g. Github’s deploy key that is stored on the server and grants access to a single repository.  Using named servers you can easily automate the process of managing multiple keys.

We will be using a single server to store all SSH keys, i.e. anyone with access to this server has access to a particular repository. Let’s call it « Github Proxy ».

Start by generating a new key pair. I use application name followed by server name to easily identify a particular key.

    ssh-keygen -t rsa -C “acme@boo”

When asked about the key name, use the application name

    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/you/.ssh/id_rsa): acme

Adjust `.ssh/config` and define your named server

    Host acme
      Hostname github.com
      User git
      IdentityFile ~/.ssh/acme

Next, assign your public key, in our case `acme.pub`, to your Github repository.

Let’s assume our organisation name on Github is `acmecorp` and our application is `acmecorp/acme`. Go to `Settings -> Deploy Keys`, click `Add deploy key` and paste the content of `acme.pub` there.

Finally, log in to your Github Proxy server and check if you can clone the repository. Notice we are using our defined name with `git clone`.

    git clone acme:acmecorp/acme.git

With such setup we introduced a level of indirection: users of Github Proxy don't have to change anything in their local settings - as long as they have access to that server, they can access code repositories on Github.

Quite nifty!
