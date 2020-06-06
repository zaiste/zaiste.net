+++
date = 2014-08-08T00:00:00.000Z
title = "Mashing data at CLI with Datamash"
[taxonomies]
topics = [ "CLI" ]
+++

[datamash][1] is a tool that allows to group, count elements and perform a
simple statistical data analysis right from the command line.

## Installing

On OSX

```
brew install datamash
```

On Debian/Ubuntu

```
wget http://files.housegordon.org/datamash/bin/datamash_1.0.6-1_amd64.deb
```
```
sudo dpkg -i datamash_1.0.6-1_amd64.deb
```

On Fedora/RedHat/CentOS

```
wget http://files.housegordon.org/datamash/bin/datamash-1.0.6-1.el6.x86_64.rpm
```
```
sudo rpm -i datamash-1.0.6-1.el6.x86_64.rpm
```

## Basic examples

Let’s start with simple examples to get some intuition for how the tool works.

### Sum of all numbers from 1 to 20

```
seq 20 | datamash sum 1
210
```

### Count, sum and get the the mean of even numbers from 1 to 20

```
seq 20 | paste - - | datamash sum 2 count 2 mean 2
110  10   11
```

### Sum of the numbers divisible by 3 between 1 to 20

```
seq 18 | paste - - | datamash sum 3
63
```

In this example I had to change 20 to 18 so `datamash` could calculate the sum
properly. The reason « why » is left as an exercise for the reader.

### Transpose the matrix

```
seq 18 | paste - - - | datamash transpose
1  4  7  10  13  16
2  5  8  11  14  17
3  6  9  12  15  18
```

### Reverse the matrix

```
seq 18 | paste - - - | datamash reverse
3   2   1
6   5   4
9   8   7
12  11  10
15  14  13
18  17  16
```

## Use case: A mobile ad campaign

Let’s image we just got [a CSV file][3] that summarises our advertising campaign on
mobile platforms in the last few days. The file has four columns:

* `id`
* `device_type`, either `iPhone` or `Android`
* `clicks` number of clicks for given device type and on given date
* `created_at` a date on which the event was registered

```
head mobile-ad-campaign.csv
id,device_type,clicks,created_at
1,Android,620,2014-08-12
2,Android,886,2014-08-11
3,iPhone,5,2014-08-13
4,Android,644,2014-08-11
```

There should be 1000 records in that file. We can quickly count lines using `wc`
command.

```
wc -l mobile-ad-campaign.csv
    1000 mobile-ad-campaign.csv
```

Also we have been told that the line 17 seems broken. Let’s check that.

```
sed 1d mobile-ad-campaign.csv | sed -n 17,17p
17,Andr0id,308,2014-08-12
```

Indeed, there is `Andr0id` written with `0` instead of `o`. Once corrected, we
are now ready to perform a simple, ad-hoc analysis of the data.

### Total number of clicks

```
datamash -t, -H sum 3 < mobile-ad-campaign.csv
sum(clicks)
500932
```

* `-t,` specifies `,` as a separator instead of default `tab` character.
* `-H` removes the headers

### Number of clicks per device

```
datamash -t, -H -s -g 2 sum 3 < mobile-ad-campaign.csv
GroupBy(device_type),sum(clicks)
Android,259455
iPhone,241477
```

* `-g 2` specifies the field on which we will group, in this case it’s the 2nd field
i.e. the device type.

### Number of clicks per date and the mean per date

```
datamash -t, -H -s -g 4 sum 3 mean 3 < mobile-ad-campaign.csv
GroupBy(created_at),sum(clicks),mean(clicks)
2014-08-10,119952,493.62962962963
2014-08-11,118397,503.8170212766
2014-08-12,115438,493.32478632479
2014-08-13,147145,512.70034843206
```

### Top 3 days with the most of the clicks

```
datamash -t, -H -s -g 4 sum 3 < mobile-ad-campaign.csv  | sed 1d | sort -n -t, -k2 -r | head -n 3
2014-08-13,147145
2014-08-10,119952
2014-08-11,118397
```

* `sed 1d` removes the header
* `sort` with `-n` compares strings using numerical value `-k2` specifies the field, in this case it is the sum of clicks per date; with `-r` we reverse the elements to enforce descending order
* finally `head -n 3` displays only three first elements.

## Summary

`datamash` is a simple tool that quickly allows to perform a preliminary data
analysis. It is easy to get started with and it works well for basic cases of
data analysis.

Additionally, parsing [CSV][4] files may be tricky and a caution is needed when
dealing with them, i.e. if a field delimiter may be also present within that
field (e.g. `,` character), most \*nix tools (`cut`, `sort`, etc.) won’t be able
to handle that situation correctly. [TSV][2] format is often better because tab
stops are infrequent in texts (`datamash` supports TSV by default).


[1]: http://www.gnu.org/software/datamash/
[2]: http://en.wikipedia.org/wiki/Tab-separated_values
[3]: https://gist.github.com/zaiste/dd41ae4c5ee2a17a2585
[4]: http://en.wikipedia.org/wiki/Comma-separated_values
