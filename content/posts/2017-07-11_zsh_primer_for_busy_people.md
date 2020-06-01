
+++
date = 2017-07-11T00:00:00.000Z


title = "Zsh Primer for Busy People"
topics = [ "zsh", "cli" ]

+++

Check `zshall` for comprehensive description of Zsh features. Here's a [Zsh guide](http://zsh.sourceforge.net/Guide/zshguide.pdf).

Zsh has five data types: integer, float, scalar (a string), array and hash. Types are handled automatically with the exception of hashes which requires to declare a variable as a hash table using built-in `typeset -A <variable name>`.

`typeset -Z 3` makes a variable at least three characters long padded with zeros if necessary.

```
typeset -Z 3 name
name=7
print $name

007
```

`typeset -r` make a variable readonly.

```
typeset -r name
name=Bond

 zsh: read-only variable: name
```

`typeset -U` create a unique set out of a list

```
typeset -U unique_set
unique_set=(1 1 1 2 2 3 3 1 2 3 3 5 4 4 4 5)
print $unique_set

1 2 3 5 4
```

* `!!` -> the previous command
* `!str` -> the most recent command starting with `str`
* `!?str[?]` -> the most recent  command containing `str`

## Quickies

Extract command's part

```
echo This is a very long command with many options and arguments
!:4-5

very long command
```

Replace command's part 1

```
echo This is a very long command with many options and arguments
!!:s/echo/cat

cat This is a very long command with many options and arguments
```

Replace command's part 2

```
less file.txt
^less^vim
vim file.txt
```

Check if variable exists

```
(( $+var )) && print “\tvar exists”
(( $+var )) || print “\tno, it doesn’t exist”
```

Convert GIFs to JPGs

```
for i in **/*.gif; convert $i $i:r.jpg
```

Convert PDFs to PNGs

```
for i in *.pdf; sips -s format png --rotate 270 --resampleHeight 1140 $i --out $i:r.png
```

Check the entire filesystem to see if any executable files have been modified since yesterday

```
print -l /**/*(*.m-1)
```

Remove spaces in the file name

```
for i in *.pdf; mv $i $i:gs/\ //
```

Create files with range

```
touch file-99{01..05}.tmp
```

## Array

Assign content of `/usr/bin` to `list`

```
list=(/usr/bin/*)
```

In zsh, arrays are indexed from 1 (instead of 0).  Use a `$#` before the array name to get its size.

```
print $#list
```

## Modifiers

Read about Zsh modifiers at `man zshexpn`.

### Flags

```
str="hello, world!"
print -l ${(U)str} ${str:u} $str

HELLO, WORLD
HELLO, WORLD
hello, world
```

### Files

Find files that changed today

```
ls *(m0)
```

Find `Rakefile` anywhere under current directory

```
ls **/Rakefile
```

List files bigger that 64mb

```
ls **/*(Lm+20)
```

### List transformation

```
list=(
  /usr/bin/perl
  /var/log/wtmp
  /etc/inetd.conf
)
```

`-t` -> similar to `basename`, it removes all leading pathname components, leaving the tail

```
print ${list:t}
perl wtmp inent.conf
```

`-h` -> similar to `dirname`, it removes a trailing pathname component, leaving the head

```
print ${list:h}
/usr/bin /var/log /etc
```

Text search through elements of `list`, similar to `grep`

```
print ${(M)list:#/etc*}
/etc/inted.conf
```

Inverted `grep`:

```
print ${list:#/etc*}
/usr/bin/perl /var/log/wtmp
```

Combine modifiers

```
list=(/usr/bin/*)
print -l ${${(UM)list:#*ssh*}:t}

SSH
SSH-ADD
SSH-AGENT
SSH-KEYGEN
SSH-KEYSCAN
```

Arrays can have both positive and negative numbers used as indexes. Positive numbers count forward from the start of the array; negative numbers count backward from the end of the array.

Retrieve sub-list

```
print $list[10,17]
```



## Hash

Declare a hash and assign key-value pairs to it

```
typeset -A hash
hash=(key value alice macos bob win10 jenny freebsd)
```

```
print $hash

win10 freebsd value macos
```

```
print $hash[jenny]

freebsd
```

Add new element

```
hash[mike]=winxp
```

```
print $hash

win10 winxp freebsd value macos
```

Remove element

```
unset hash[mike]
```

## Scripting

Bourne shell scripts are usually difficult to write in a portable way, because they often rely on external programs to do data transformation, zsh on the other hand has the capabilities of many traditional Unix programs built into it. In order to keep Zsh scripts as portable as possible you should always use its built-in features.

## ZMV

`zmv` moves (or renames) files based on the pattern.  Its manual is in the `zshcontrib` man page. `zmv` must be loaded with `autoload zmv` to be available.

Use `-n` to perform a dry run with `zmv`.

```
zmv '* *' '$f:gs/ /_’
```
```
zmv '*.(*).(*).([0-9][0-9])*.mkv' '$1_$2-$3.mkv'
```


```
i=0; zmv -n '*' 'file_${(l:3::0:)$((++i))}'

mv -- '2013-04-28 15.55.50.jpg' file_001
mv -- '2013-11-20 10.56.35.jpg' file_002
mv -- '2014-04-23 11.14.18.jpg' file_003
```
