+++
title = "How To Get IOPS (total read & write operations) In Linux"
+++

Use `iostat` from the `sysstat` package:

```bash
iostat -d sda | grep sda | awk '{ print $2; }'
```

