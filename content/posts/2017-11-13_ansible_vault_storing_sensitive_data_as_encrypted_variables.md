
+++
date = 2017-11-13T00:00:00.000Z


title = "Ansible Vault: storing sensitive data as encrypted variables"
topics = [ "ansible", "devops" ]

+++

[Ansible's Vault](https://docs.ansible.com/ansible/2.4/vault.html) feature allows to store sensitive data, such as passwords or keys, encrypted in-place inside variable files. Vaults can be placed in a source code repository e.g. using Git.

Let's encrypt a file so it becomes a vault:

```
ansible-vault encrypt vars/staging.yml
```

We can now run a playbook as before. The only difference is a need to provide a password to decrypt this vault file. Since Ansible 2.4, the recommended way to provide a vault password is to use the `--vault-id` option.

```
ansible-playbook -i hosts playbook.yml --vault-id @prompt
```

`@prompt` means that the password will be prompted right after we run this Ansible playbook. Otherwise, it's the file name that stores the password e.g. `--vault-id a_password_file` for specifying `a_password_file` from the current directory.

Prior Ansible 2.4, there were two other options `--vault-password-file`  and `--ask-vault-pass` options, which are now deprecated.

If you want to change the content of the encrypted vault, use `edit` command:

```
ansible-vault edit vars/staging.yml
```

It will open a text editor defined via `$EDITOR` with a decrypted content of `vars/staging.yml`. Once modified the file will be automatically encrypted again.

In order to permanently decrypt a file, use `decrypt` command:

```
ansible-vault decrypt vars/staging.yml
```

You can also just view the content of an encrypted file by using `view` command:

```
ansible-vault view vars/staging.yml
```

In your playbook use `no_log: true` to hide log output as the encrypted content can be visible with `-vvvv` in the deployment logs or in error messages.

There's also `encrypt_string` command which allows to inline encrypted values by injecting them into YAML files with `!vault` tag. Here's how to encrypt a string read from `stdin` and name it `db_password`:

```bash
ansible-vault encrypt_string --vault-id a_password_file --stdin-name 'db_password'
```

```bash
db_password: !vault |
    $ANSIBLE_VAULT;1.1;AES256
    623133653966623430613934643361633837643737646
    613433366535396636353433363266653533376166613
    633962653339663861663736326265393261663539653
    3438626666666137650a3536386434356666336339643
    6564
```
