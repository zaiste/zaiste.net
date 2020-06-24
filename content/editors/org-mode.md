+++
title = "Org Mode"
[extra]
howtos = true
+++

Org Mode is a major mode for Emacs. It is part of Emacs.

Org Mode was created by Dominik Carsten in 2003 as an organizer / outliner tool.

Org Mode can be used to create spreadsheets and LaTeX documents, to manage tasks, to connect documents via hyperlinks.

Org Mode can run blocks of code and collect the output.

```lisp
(setq org-agenda-files
    (file-expand-wildcards "~/Notes/*.org"))
```

Show actually italicized text instead of _italicized text_.

```lisp
(setq org-hide-emphasis-markers t)
```

## Org Agenda

You can export the agenda calendar with `org-icalendar-export-agenda-files` and then load them into applications that read .ics files.

Use `SPC a d` for daily agenda.

Use `SPC a t` for tasks.

## Capture

Store new notes at the beginning of a file or entry:

```bash
(setq org-reverse-note-order t)
```

