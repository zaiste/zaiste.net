---
created_at: 2014-05-07
kind: article
publish: true
title: "Ansible playground with Vagrant"
tags:
- ansible
- vagrant
- devops
---

[Vagrant][3] makes it very easy to play with Ansible locally. This article
provides essential information about that process to get you started in no time.

First, install Vagrant binary. On OSX, it can be done with [Homebrew Cask][4].
For other OS, check [Vagrant Downloads][1] and download a binary that fits your
case.

```
brew cask install vagrant
```

Let's start by generating `Vagrantfile`.

```
vagrant init
```

Since Vagrant 1.3, Ansible provisioner is built-in. Adjust `Vagrantfile` by
specifying a playbook file to use as an entry point.

```
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"

  config.vm.provision :ansible, :playbook => "playbook.yml"
end
```

You can check Vagrant's [Ansible Provisioner documentation][2] for details, e.g.
how to specify an inventory file or pass execution parameters.

Next, create `playbook.yml` in the same directory as `Vagrantfile`.

```
---
- hosts: all
  sudo: yes
  tasks:
    - name: install cURL
      apt: pkg=curl state=installed
```

Finally, run `vagrant up` to start and provision the box. Once you changed the
playbook and your box is still running, you can simply `vagrant provision` to
apply those changes.

[1]: http://www.vagrantup.com/downloads
[2]: http://docs.vagrantup.com/v2/provisioning/ansible.html
[3]: http://www.vagrantup.com/
[4]: http://caskroom.io/
