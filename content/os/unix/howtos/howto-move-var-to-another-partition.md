+++
title = "How to Move /var to Another Partition"
+++

## Method 1: By Modifying the fstab

1.  Switch to single user mode.
2. Make sure any process writing to `/var` is stoped using `lsof | grep /var`.
3.  Create a directory on another partition
```bash
mkdir -p /home/var
```
4. Move the `/var` content to `/home/var`

```bash
rsync -va /var /home/var
```

1. Backup the `/var` content under `/var.old`

```bash
mv /var /var.old
```

1. Create an empty `/var` directory

```bash
mkdir /var
```

1. Bind the new directory with `/home/var` using `mount`

```bash
mount -o bind /home/var /var
```

1. Update the `/etc/fstab`

```bash
 /home/var /var        none    bind
```

## Method 2: Using Symbolic Links

```bash
mkdir /home/var
mv /var/* /home/var
mv /var /var.old
ln -s /home/var /var
```

