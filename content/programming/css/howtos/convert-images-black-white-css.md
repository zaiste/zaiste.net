+++
title = "Convert images to black & white with CSS"
[taxonomies]
topics = [ "CSS" ]
+++

```css
.grayscale {
	filter: grayscale(100%);
}
```

and then

```html
<img src="your-image.jpg" alt="Image" class="grayscale">
```