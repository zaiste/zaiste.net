+++
title = "How to Clear journalctl Logs"
+++

## Clear the logs by time

Keep only the logs from the last 2 days:

```bash
journalctl --vacuum-time=2d
```

## Clear the logs by size

Keep only the logs under `100mb`:

```bash
journalctl --vacuum-size=100M
```

