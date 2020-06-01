
+++

+++
# MTR

[MTR](http://www.bitwizard.nl/mtr/) combines the functionality of the 'traceroute' and 'ping' programs in a single network diagnostic tool. It is a tool which enables to diagnose and identify networking errors along with network status reports.

MTR uses the Internet Control Message Protocol (ICMP) to to test traffic between two points on the Internet.

MTR may not detect errors from one direction when there is still packet loss from the opposite direction.

Hops are the Internet nodes that packets pass through to get to their destination.

## Generate a MTR Report

```bash 
mtr -rw <destination>
```

Run faster interval:

```bash 
mtr -rwc 50 -i 0.2 -rw <destination>
```

-   ```
    undefined
    ```

     - generate the report
-   ```
    undefined
    ```

     - use the long-version of the hostname
-   ```
    undefined
    ```

     - set how many packets are sent and recorded in the report
-   ```
    undefined
    ```

     - run the report at a faster rate to reveal packet loss that can occur only during network congestion

## Read a MTR Report

Each numbered line in the MTR report is a hop.

-   ```
    undefined
    ```

     - the percentage of packet loss at each hop
-   ```
    undefined
    ```

     - the number of packets sent.

