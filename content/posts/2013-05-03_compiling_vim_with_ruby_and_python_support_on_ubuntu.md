
+++
date = 2013-05-03T00:00:00.000Z


title = "Compiling Vim with Python and Ruby support on Ubuntu"
topics = [ "protip", "vim", "ruby", "python", "ubuntu" ]

+++

Check if Vim is compiled with Python or Ruby:

```
λ vim --version | ack '(python|ruby)'
```

Remove Vim version installed with `apt-get` if present:

```
λ sudo apt-get remove vim-common vim-runtime
```

Install dependencies needed to compile Vim:

```
λ sudo apt-get build-dep vim
```

Install [Mercurial][1]:

```
λ sudo apt-get install mercurial
```

Clone Vim repository, compile it and install the new version:

```
λ hg clone https://vim.googlecode.com/hg/ vim
λ cd vim
λ ./configure --enable-pythoninterp --enable-rubyinterp
λ make
λ sudo make install
```

[1]: http://mercurial.selenic.com/
