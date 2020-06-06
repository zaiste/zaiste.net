
+++
date = 2017-05-11T00:00:00.000Z
title = "tree: ignore directories with patterns"
aliases = [
  "tree_ignore_directories_with_patterns"
]
[taxonomies]
topics = [ "Shell" ]
+++

`tree` displays the directory structure of the current directory. `-d` option displays only directories. `-I` option allows to exclude directories that match specific pattern e.g.

```
tree -I node_modules
```

In order to exclude multiple directories at once, their names must be separated by `|` sign, i.e.

```
tree -I 'node_modules|cache|test_*'
```

This command will skip `node_modules`, `cache` directories (along with their content) from the output, and all directories that match `test_*` wildcard expression.
