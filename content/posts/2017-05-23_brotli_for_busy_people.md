
+++
date = 2017-05-23T00:00:00.000Z


title = "Brotli for Busy People"
topics = [ "compression", "nginx" ]

+++

[Brotli](https://github.com/google/brotli) is a generic-purpose lossless compression algorithman developed by Jyrki Alakuijala and Zoltán Szabadka. It is based on a modern variant of the LZ77 algorithm, Huffman coding and 2nd order context modeling. It is similar in speed with deflate but offers more dense compression. The specification of the Brotli Compressed Data Format is defined in [RFC 7932](https://tools.ietf.org/html/rfc7932)

​​Brotli provides a better compression density than gzip which leads to reduced bandwidth consumption with the content loading faster.

By default  `brotli` command is turned up to max, but the level 4 is both significantly smaller and compresses faster than gzip.

Major browsers support Brotli:
* Chrome has supported Brotli since version 49.
* Microsoft Edge will support Brotli starting from its next version, 15.
* Firefox implemented Brotli in version 44.
* Opera has supported Brotli since version 36.

For static assets, it's the best ot use level 11. For dynamic content, the leve 4 is good enough, which still produces smaller responses but takes less time to compress than gzip (or brotli on a higher setting).

JavaScript, HTML or SVG files shoud use `Accept-Encoding: br` in the request headers and `Content-Encoding: br` in the response headers.

Binary files such as JPEG, PNG or MP4, are already compressed with format-specific compression which outperforms the compression of gzip or brotli. There's no point in compressing such files - they may even get bigger rather than smaller.

```
text/plain
text/css
application/javascript
application/json
application/xml+rss
image/svg+xml
```
