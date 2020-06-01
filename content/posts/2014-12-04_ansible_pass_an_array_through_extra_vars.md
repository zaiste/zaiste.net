
+++
date = 2014-12-04T00:00:00.000Z


title = "Ansible / Pass an array through extra-vars"
topics = [ "ansible" ]

+++

Let's imagine we want to provision a machine with Nginx server. `server_name`
allows to specify several domain names separated by a space. Here is a simple
Ansible script that reads an array of domains from `extra-vars` provided on the
command line and put them as a value of `server_name`.

```
---
- tasks:
    - template: src=nginx-vhost.conf dest=/etc/nginx/sites-available/foo.com
```

Here is `nginx-vhost.con`

```
server {
    listen 80;
    server_name {{ domains|join(' ') }};
    root /srv/www/boo.com/public
}
```

Put both files in the same directory and run it through `ansible-playbook` and
pass a proper JSON to `--extra-vars` parameter as below:

```
ansible-playbook -i hosts playbook.yml --extra-vars '{"domains": ["boo.com", "foo.com"]}'
```

In Ansible >= 1.3 `extra-vars` can be also loaded from a JSON or YAML file with
the `@` syntax:

```
--extra-vars "@some_file.json"
```

As a result you should have the following file generated under
`/etc/nginx/sites-available/foo.com`

```
server {¬
    listen 80;
    server_name boo.com foo.com;
    root /srv/www/boo.com/public
}
```

