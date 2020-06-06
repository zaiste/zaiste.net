+++
date = 2015-08-06T00:00:00.000Z
title = "Automatically install Ansible Galaxy roles with requirements.yml"
image = "zaiste-net-ansible.jpg"
aliases = [
  "automatically_install_ansible_galaxy_roles_with_requirements_yml"
]
[taxonomies]
topics = [ "Ansible", "DevOps" ]
+++

Use `requirements.yml` to automatically download from Ansible Galaxy all roles
required by your playbook, e.g.

```
- src: zaiste.essentials
- src: zaiste.nginx
- src: williamyeh.oracle-java
- src: zaiste.security
```

Save and install with:

    ansible-galaxy install -r requirements.yml

`requirements.yml` is a list of playbook requirements with optional `name` and
`version`.

- install a role from Ansible Galaxy

```
- src: zaiste.nginx
```

- install a role directly from Github

```
- name: essentials
  src: https://github.com/zaiste/ansible-essentials
```

- install a role directly from Github using a specific branch

```
- name: essentials
  src: https://github.com/zaiste/ansible-essentials
  version: origin/master
```

- install a role directly from Github using a specific tag

```
- name: essentials
  src: https://github.com/zaiste/ansible-essentials
  version: 0.0.3
```

- install a role directly from Github using a specific commit SHA1

```
- name: essentials
  src: https://github.com/zaiste/ansible-essentials
  version: <sha1>
```
