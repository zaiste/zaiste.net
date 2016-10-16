---
created_at: 2015-02-27 
kind: article
publish: true
title: "Social Meta Tags for Facebook and Twitter"
tags:
- seo 
---

Social Meta Tags allow to optimize content sharing on Facebook and Twitter. They define how titles, descriptions, images etc. appear in these social streams, thus improving your reach by helping content to spread more easily. 

Facebook uses [Open Graph protocol][1] which enables any web page to become a rich object in a social graph. Twitter uses a custom format called [Twitter Cards][2], but if Twitter robots cannot find any, Twitter uses Open Graph tags instead.

```
<title>Page Title <= 60-70 characters</title>
<meta name="description" content="Page description < 155 characters." />

<!-- Twitter Card data -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@publisher_handle">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description < 200 characters">
<meta name="twitter:creator" content="@author_handle">
<meta name="twitter:image" content="http://example.com/twitter.jpg">

<!-- Facebook's Open Graph data -->
<meta property="og:title" content="Title Here <= 88 characters" />
<meta property="og:type" content="article" />
<meta property="og:url" content="http://example.com/" />
<meta property="og:image" content="http://example.com/facebook.jpg" />
<meta property="og:description" content="Description Here" /> 
<meta property="og:site_name" content="Site Name" />
<meta property="fb:admins" content="Facebook numeric ID" />
```

`og:type` is mainly `website` or `article`, sometimes `video`, `book` or `music`.

Twitter Summary card images must be at least 120x120px. Facebook recommends large images i.e. 1200x630px as they offer more flexibility. 

Both, Twitter and Facebook provide tools to test if this meta data have been inserted correctly i.e. [Facebook Open Graph Object Debugger][3] and [Twitter Card Validator][4]. 

Facebook debugger not only returns errors and suggestions for Open Graph tags, but also refreshes the Facebook cache on your links after adjustments to the content. Be sure to check [Facebook's Sharing Best Practices][5] for more.

To fully benefit from Twitter Cards, you need to request an approval for your page from Twitter using Card Validator.


[1]: http://ogp.me/
[2]: https://dev.twitter.com/cards/overview
[3]: https://developers.facebook.com/tools/debug/
[4]: https://cards-dev.twitter.com/validator
[5]: https://developers.facebook.com/docs/sharing/best-practices