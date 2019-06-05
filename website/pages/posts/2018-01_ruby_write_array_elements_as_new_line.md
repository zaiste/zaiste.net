---
created_at: 2018-01-17
kind: article
publish: true
title: "Ruby: Write Array elements as new line"
tags:
- nodejs
sitemap:
  priority: 0.8
abstract: >
  Use `puts` with an array argument
---

Use `puts` with an array argument to write each elements on a new line:

```rb
arr = %w[a b c]

File.open("array.txt", "w+") do |f|
  f.puts(a)
end
```