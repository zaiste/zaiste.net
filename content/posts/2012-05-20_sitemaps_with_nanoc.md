
+++
date = 2012-05-20T00:00:00.000Z


title = "Sitemaps with nanoc"
topics = [ "nanoc" ]

+++

Using [Sitemaps](http://www.sitemaps.org/) on your website might be quite beneficial for your [SEO](http://en.wikipedia.org/wiki/Search_engine_optimization), especially if you want to get quickly indexed by major search engines. According to [Wikipedia](http://en.wikipedia.org/wiki/Google_Sitemaps):

> The Sitemaps protocol allows a webmaster to inform search engines about URLs on a website that are available for crawling. A Sitemap is an XML file that lists the URLs for a site. It allows webmasters to include additional information about each URL: when it was last updated, how often it changes, and how important it is in relation to other URLs in the site. This allows search engines to crawl the site more intelligently. Sitemaps are a URL inclusion protocol and complement robots.txt, a URL exclusion protocol.

Let’s have a look how to generate Sitemaps with [nanoc](http://nanoc.stoneship.org/). We start by adding the following line to `lib/defaults.rb`

```
include Nanoc3::Helpers::XMLSitemap
````

Next, we have to set up a base url for our website, by adding the following line to `config.yaml`

```
base_url: http://mywebsite.com
```

Now we can create a sitemap page with the following content:

```
= xml_sitemap
```

In this example I’m using [HAML](http://haml.info/) as a template language.

Last step is to adjust `Rules` file to handle the sitemap file accordingly

``` ruby
compile 'sitemap' do
  filter :haml
end

route 'sitemap' do
  item.identifier.chop + '.xml'
end
```

Once compiled and deployed, Sitemaps can be accessed at `/sitemap.xml` of your website.
