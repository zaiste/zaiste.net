---
created_at: 2012-05-12 
kind: article
publish: true
title: "Pentadactyl - Experience the Web in a Vim mode"
---


[Pentadactyl](http://5digits.org/pentadactyl/) is a plugin that provides [Vim](http://www.vim.org/) mode for [Firefox](http://www.mozilla.org/en-US/firefox/). If you happen to be a Vim user, after having installed it, you will feel like at home, wondering how you could have lived without it. It extremely improves the way you interact with a web browser: it is faster and powerful approach to surfing.

In this article I will only provide you with very basics so you could easily get started your adventure with Pentadactyl. Feel free to dig in if you need more information; Pendatactyl features are quite amazing.


Interacting with Websites
-------------------------

`t`  open arg in a new tab

`o` open arg in the current tab

`s` search the web and open in the current tab

`S` search the web and open in a new tab 

`R` reload the page 

`zi/zm/zo/zr` - zoom in/more/out/reduce

`g<C-g>` show page details

`gf` view page source 


Moving Around
--------------

`j/k` scroll one line down/up

`gg/G` - scroll to top/bottom

`<C-d>/<C-u>` scroll down/up by a half of page

`<C-f>/<C-b>` scroll down/up by an entire page

`<C-o>/<C-i>` jump to older/newer

`p/P` open clipboard content in current/new tab

`H/L` go back/fowrard in browser history 

URL Manipulation
----------------

`<C-x>` decrements by 1 last number in URL if such exist

`<C-a>` increments by 1 last number in URL if such exist

`gu` go one level up with the URL

    (start) http://www.example.com/dir1/dir2/file.htm
    (end)   http://www.example.com/dir1/dir2/

`gU` go to the page root URL

    (start) http://www.example.com/dir1/dir2/file.htm
    (end)   http://www.example.com/.

`y` current URL to clipboard

Tabs
----

`B` list tabs

`b` go to specific buffer

`d` close tab

`u` restore tab

`<C-^>` prevously selected tab

By the way, in addition to all that great ftuff mentioned above, Pentadactyl would be a perfect fit for any Brogrammer. 
