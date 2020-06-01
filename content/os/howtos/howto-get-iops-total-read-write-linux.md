
+++

+++
# How To Get IOPS (total read & write operations) In Linux

Use ```
undefined
``` from the ```
undefined
``` package:

```bash 
iostat -d sda | grep sda | awk '{ print $2; }'
```

