
+++
date = 2014-06-12T00:00:00.000Z


title = "Heredoc in Ruby"
topics = [ "ruby" ]

+++

Ruby supports multiline strings through [« here doc » syntax][2]. It allows to specify a string as a block of text where newlines and indents are preserved. It is not widely known, but useful feature.

There are two types of « here doc » syntax in Ruby:

```
def display
  text = <<TEXT
  Lorem ipsum dolor sit amet,
     consectetur adipisicing elit,
TEXT # without dash
end

def display
  text = <<-TEXT
  Lorem ipsum dolor sit amet,
     consectetur adipisicing elit,
  TEXT # with dash
end
```

* using `<<` the block end marker is aligned with the most left column of textual area
* using `<<-` it is aligned with the indent level introduced by the « heredoc » block.

In both case the text inside is indented relatively to the first column. This is not what you may expect, especially when using the `<<-` syntax. In order to preserve the formatting and remove blank characters up to the column where `heredoc` starts, we will write a simple `unindent` method and then use it on the opening marker.

```
class String
  def unindent
    gsub(/^#{scan(/^\s*/).min_by{|l|l.length}}/, "")
  end
end

def display
  text = <<-TEXT.unindent
  Lorem ipsum dolor sit amet,
     consectetur adipisicing elit,
  TEXT # with dash
end
```

Note that in Rails there is a similiar function, implemented in `active_support/core_ext/string/strip.rb`:

```
class String
  def strip_heredoc
    indent = scan(/^[ \t]*(?=\S)/).min.try(:size) || 0
    gsub(/^[ \t]{#{indent}}/, '')
  end
end
```

« here doc » can be passed as a parameter

```
if True
  h1 = { name: "Foo", desc1: <<-desc1.unindent desc2: <<-desc2.unindent }
  Lorem ipsum dolor sit amet,
    consectetur adipisicing elit,

  <<-desc1
    Mauris vehicula tortor eros, sed imperdiet velit aliquet non.
      Nullam
         eget elit nibh.
  <<-desc2

  p1 = Person.new(name: <<-name.unindent)
   this is test
     and this is test again
  name

  p2 = Person.new(name: <<-name.unindent
   this is test
     and this is test again
  name
  )

  p3 = Person.new(name: "
   this is test
     and this is test again".unindent)
```



Variables are interpolated in « here docs » as within strings.

```
def display
  name = "Zaiste"
  text = <<-TEXT
  Lorem ipsum dolor #{name} amet,
     consectetur adipisicing elit,
  TEXT
end
```

In order to avoid interpolation in « here docs », enclose the opening marker with single quotes. It will make the content behave like a single-quoted string.

```
def display
  name = "Zaiste"
  text = <<-'TEXT'
  Lorem ipsum dolor #{name} amet,
     consectetur adipisicing elit,
  TEXT
end
```

You can also use backticks to execute a shell command:

```
puts <<-`command`
  date
command
```

Check [this gist][1] as a reference for this article.

[1]: https://gist.github.com/zaiste/2cc43abd00d459cef52c
[2]: http://en.wikipedia.org/wiki/Here_document
