
+++
date = 2017-05-20T00:00:00.000Z


title = "Scrapping book cover images with Scrapy and Python 3"
topics = [ "python", "scrapping" ]

+++

Let's start by creating a virtual environment:

```
python3 -m venv ~/.venv/bookspider
source ~/.venv/bookspider/bin/activate
```

Now we can install [scrapy](https://scrapy.org/)

```
pip install scrapy
```

Let's generate the initial directory structure

```
scrapy startproject bookspider
```

`items.py`  allows us to define a data object model for the pages crawled by the spider. This class encapsulates each piece of data being scraped.

```python
import scrapy

class Book(scrapy.Item):
  title = scrapy.Field()
  description = scrapy.Field()
  file_urls = scrapy.Field()
  files = scrapy.Field()
```

`file_urls`  & `files` are special fields which must be explicitly defined to scrape binary files (images, PDFs, MP3s, etc).

Create a spider inside `spiders/` directory. It's a class that inherits from `scrapy.Spider` and must have `name` and `start_urls` fields defined.

```python
import scrapy
from speck.items import BookItem

class BookSpider(scrapy.Spider):
  start_urls = [
    'http://books.toscrape.com/catalogue/category/books/romance_8/page-1.html',
    'http://books.toscrape.com/catalogue/category/books/romance_8/page-2.html'
  ]
  name = 'book'

  def parse(self, response):
    for book in response.css('li article.product_pod'):
      href = book.css('a::attr(href)').extract_first()
      full_url = response.urljoin(href)

      yield scrapy.Request(full_url, callback=self.parse_book)

  def parse_book(self, response):
    title = response.css('h1::text').extract_first()
    description = response.css('.product_page > p::text').extract()
    src = response.css('.product_page .thumbnail img::attr(src)').extract_first()
    cover = response.urljoin(src)

    yield BookItem(title=title, description=description, file_urls=[cover])
```

`start_urls` is a list of the seed URLs the spider will crawl first.  We are targeting Scrapy playground available at `books.toscrape.com` which provides a dummy book store.

Every  spider must have at least a `parse()`  method that handles the URLs defined in `start_urls` . This method can either yield other requests which will trigger other pages to be crawled either return the values.

`scrapy` allows to traverse the DOM using both CSS and XPath selectors.

The last thing is to enable the item pipelines in `settings.py` so that Scrapy automatically downloads each files put into `file_urls`

```python
ITEM_PIPELINES = {
  'scrapy.pipelines.files.FilesPipeline': 1
}
FILES_STORE = 'book_cover_images'
```

Additionally we must also define `FILES_STORE` setting i.e. the path to the output directory where the download images will be stored.

Finally, let's run the scrapper

```
scrapy crawl book -o book.jl
```



