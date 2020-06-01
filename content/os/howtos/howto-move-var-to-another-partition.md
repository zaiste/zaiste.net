
+++

+++
# How to Move /var to Another Partition

## Method 1: By Modifying the fstab

1.  Switch to single user mode.
2.  Make sure any process writing to 

    ```
    undefined
    ```

     is stoped using 

    ```
    undefined
    ```

    .
3.  Create a directory on another partition

```bash 
mkdir -p /home/var
```

1.  Move the 

    ```
    undefined
    ```

     content to 

    ```
    undefined
    ```

```bash 
rsync -va /var /home/var
```

1.  Backup the 

    ```
    undefined
    ```

     content under 

    ```
    undefined
    ```

```bash 
mv /var /var.old
```

1.  Create an empty 

    ```
    undefined
    ```

     directory

```bash 
mkdir /var
```

1.  Bind the new directory with 

    ```
    undefined
    ```

     using 

    ```
    undefined
    ```

```bash 
mount -o bind /home/var /var
```

1.  Update the 

    ```
    undefined
    ```

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

