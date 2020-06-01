
+++

+++
# GitHub

## Get Raw `README`

```bash
http https://api.github.com/repos/<username>/<project>/readme Accept:application/vnd.github.v3.raw
```

## Search Repositories

```bash
curl -G https://api.github.com/search/repositories --data-urlencode "sort=stars" --data-urlencode "order=desc" --data-urlencode "q=language:java"  --data-urlencode "q=created:>`date -v-7d '+%Y-%m-%d'`"
```

```bash
http GET https://api.github.com/search/repositories sort==stars order==desc q==tetris -pH
```

```bash
http GET https://api.github.com/search/repositories sort==stars order==desc q=="tetris created:>`date -v-7d '+%Y-%m-%d'`"
```

