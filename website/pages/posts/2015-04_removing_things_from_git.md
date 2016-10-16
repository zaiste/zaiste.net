---
created_at: 2015-04-06 
kind: article
publish: true
title: "Removing things from Git"
tags:
- git
- cli
---

## Remove a file in the most recent state 

The following command removes the file from the repository and deletes 
it from the **local** file system:

```
git rm file.txt
git commit -m "remove file.txt"
```

To remove the file from the repository while **not** deleting it from the 
local file system, use:

```
git rm --cached file.txt
```

Similar for directories:

```
git rm -r dir 
git commit -m "remove dir"
```

## BFG Cleaner

The BFG Repo-Cleaner is a faster, simpler alternative to git filter-branch for removing unwanted data. For example, to remove any file named 'Rakefile' (and leave your latest commit untouched), run:

bfg --delete-files Rakefile
To replace all text listed in passwords.txt wherever it can be found in your repository's history, run:

bfg --replace-text passwords.txt


http://stackoverflow.com/questions/2100907/how-to-remove-delete-a-large-file-from-commit-history-in-git-repository
http://stackoverflow.com/questions/307828/completely-remove-file-from-all-git-repository-commit-history





