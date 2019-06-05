---
created_at: 2018-01-02
kind: article
publish: true
title: "Rails: Reload Page with Params Entry on Checkbox Click"
tags:
- rails
sitemap:
  priority: 0.8
abstract: >
  Use `check_box_tag :custom_filter, true, params[:custom_filter], onchange: 'this.form.submit();'`
---

The following snippet will reload the page once the checkbox is clicked with a new parameter being added to the URL.

```ruby
= form_tag the_current_path, method: :get do |f|
  = check_box_tag :custom_filter, true, params[:custom_filter], onchange: 'this.form.submit();'
  = label_tag :custom_filter, "Custom Filter"
```
