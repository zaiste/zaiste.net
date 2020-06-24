+++
title = "How To Set Colors for Priorities in Org Mode"
+++

Customize `org-priority-faces` to set specific attributes for each priority:

```lisp
'((65 :foreground "red" )
  (66 :foreground "orage")
  (67 :foreground "blue"))
```

The numbers 65, 66 and 67 correspond to the priority letters in ASCII e.g. 65 is A. This can be also written as `?A` in Emacs Lisp.

