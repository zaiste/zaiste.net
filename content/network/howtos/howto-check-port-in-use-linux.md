
+++

+++
# How to Check If a Port is In Use on Linux

## Method 1: Use ```
undefined
```

```bash 
sudo lsof -i -P -n
sudo lsof -i -P -n | grep LISTEN
```

```bash 
sudo lsof -i:<portnumber>
```

## Method 2: Use ```
undefined
```

```bash 
netstat -tulpn | grep LISTEN
```

```bash 
sudo ss -tulw
sudo ss -tulwn
```

-   ```
    undefined
    ```

     - show TCP sockets
-   ```
    undefined
    ```

     - show UDP sockets
-   ```
    undefined
    ```

     - show listening sockets
-   ```
    undefined
    ```

     : show process name that opened sockets
-   ```
    undefined
    ```

     : do not use DNS

## Method 3: Use ```
undefined
```

```bash 
sudo nmap -sTU -O
```

