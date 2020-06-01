
+++
date = 2015-06-06T00:00:00.000Z


title = "Creating password protected gzip files from command line"
topics = [ "openssl" ]

+++

In order to create a password protected gzip file from the command line we can
use openssl (symetric encryption)

To encrypt

```
tar cz my_folder/ | openssl enc -aes-256-cbc -e > encrypted.tar.gz.enc
```

To decrypt and untar

```
openssl aes-256-cbc -d -in encrypted.tar.gz.enc | tar xz
```
