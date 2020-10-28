+++
date = 2019-01-25
title = "Org Roam Setup"
topics = [ "Emacs", "Org Roam"]
description = """
A short introduction to org-journal, an Emacs mode for journaling that is built on top of org-mode.
"""
[extra]
priority = 0.6
number = "25"
video_id = "rH3ZH95zjKM"
+++

## Notes

Org Roam is a tool for organizing notes in Emacs built on top of Org Mode. It’s a replica of Roam Research, a web based tool that popularized this approach of organizing notes not in a hierarchical way, but as set of documents connected with links. Somehow similar to how the Web is organized. You write a note, then another and maybe you connected them with links if they are related. The key idea in Roam and in Org Roam is that for each note you can see on the side other notes that mention or reference the note you are currently viewing. By seeing the relations between your notes, you have more context about the information you are storing in them. It’s very simple, yet powerful. Finally, contrary to Roam Research, by using Emacs, you write notes as plain text. You can store them anywhere. And you are not locked-in to a particular vendor.

* Capture a new note: `SPC n r c`
* Add a link to a note: `SPC n r I`
* See the backlinks: `SPC n r r`