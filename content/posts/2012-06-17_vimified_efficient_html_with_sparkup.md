
+++
date = 2012-06-17T00:00:00.000Z


title = "Vimified? efficient HTML with sparkup"
topics = [ "vim" ]

+++

Last week I found a nifty [Vim](http://www.vim.org) plugin that lets write HTML code
faster and easier. It's called [sparkup](https://github.com/rstacruz/sparkup): the idea is
to use a shortcut language inspired by CSS which expands to valid HTML code while hitting `<C-e>`.
The language greatly reduces the amount of characters that need to be written in
order to create HTML tags.

Simple example:

```
#foo.bar.baz.cuuz<C-e>
```

will expand to

```
<div id="foo" class="bar baz cuuz"></div>
```

Here is a [short video](http://ascii.io/a/589) I've recorded with
[ascii.io](http://ascii.io) to show it looks in practice with examples taken
from the [sparkup README](https://github.com/rstacruz/sparkup/blob/master/README.md).

The plugin has been added to [vimified](https://github.com/zaiste/vimified) into
`html` package. Enjoy!
