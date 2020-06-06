
+++
date = 2012-09-10T00:00:00.000Z
title = "Command Line - Resizing Images"
aliases = [
  "command_line_resizing_images"
]
[taxonomies]
topics = [ "CLI" ]
+++

If you're looking for an efficient way to resize images, especially
in a batch mode, the command line approach may be the answer.

OS X
----

OS X comes with a tool called [`sips`][1], which stands for Scriptable Image
Processing System. `sips` modifies images *in-place*, i.e. files passed in as
arguments are altered; adding `--out [filename]` makes `sips` operate on a copy.

The two common parameters for `sips` are `-z` and `-Z`.

* `-z [height] [width]` - it resizes the image according to specified dimensions,
which may alter the aspect ratio of the image.
* `-Z [heightwidth]` - it defines the maximum dimensions for both height and
width, which keeps the aspect ratio of the image.

```
λ sips -z 768 1024 example.png
```

```
λ sips -Z 1024 example.png
```

```
λ sips -z 768 1024 *.png
```

It is also very easy to convert files from one format ot another, using `-s`
parameter.

```
λ sips -s format jpeg test.png --out test.jpg
```


Linux
-----

On Linux we can use `mogrify` from the [ImageMagick][2] toolbox to get the same
functionality as with `sips`.

The most basic command would be resizing an image to specified dimensions,
keeping the aspect ratio.

```
mogrify -resize 1024x768 example.png
```

If we need to resize to exact size, a `!` sign must be added to the specified
dimensions.

```
mogrify -resize 1024x768! example.png
```

Batch processing is also possible.

```
mogrify -resize 50% *.jpg
```

As well as converting from one format to another.

```
mogrify -format jpg *.png
```


Summary
-------

Resizing and converting formats are probably the most common tasks when it comes
to image manipulation.  Both `sips` and `mogrify` provide more ways to transform
images than covered in this short post. Feel free to check their docs to learn
more.

[1]: https://developer.apple.com/library/mac/#documentation/Darwin/Reference/ManPages/man1/sips.1.html
[2]: http://www.imagemagick.org/
