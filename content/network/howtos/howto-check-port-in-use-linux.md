+++
title = "How to Check If a Port is In Use on Linux"
+++

## Method 1: Use `lsof`

```bash
sudo lsof -i -P -n
sudo lsof -i -P -n | grep LISTEN
```

```bash
sudo lsof -i:<portnumber>
```

## Method 2: Use `netstat`

```bash
netstat -tulpn | grep LISTEN
```

```bash
sudo ss -tulw
sudo ss -tulwn
```

+ `-t` - show TCP sockets
+ `-u` - show UDP sockets
+ `-l` - show listening sockets
+ `-p` : show process name that opened sockets
+ `-n` : do not use DNS



## Method 3: Use `nmap`

```bash
sudo nmap -sTU -O
```

