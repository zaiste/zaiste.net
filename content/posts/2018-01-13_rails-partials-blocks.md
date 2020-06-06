+++
date = 2018-01-13T00:00:00.000Z
title = "Rails Partials with Blocks"
aliases = [
  "rails_partials_with_blocks"
]
[taxonomies]
topics = [ "Rails" ]
[extra]
priority = 0.8
+++

Partials in Rails can accept blocks. A block is a custom piece of markup. As with
regular Ruby blocks, you nest the markup within `do...end` section of the
`render` function.

```
<%= render layout: 'nav' do %>
  <li><%= link_to 'Books', books_path %></li>
  <li><%= link_to 'CDs', cds_path %></li>
  <li><%= link_to 'Games', games_path %></li>
<% end %>
```

Nesting works only if `render` specifies the partial with the `layout:` option instead of the usual `partial:`.

The partial definition uses `yield` to mark the location where the markup from the passed block will be inserted.

```
<ul class="navigation">
  <%= yield %>
</ul>
```
