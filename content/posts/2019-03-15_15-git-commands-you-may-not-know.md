+++
date = 2019-03-15T00:00:00.000Z
title = "15 Git Commands You May Not Know"
description = """
Here is a list of 15 Git commands that you may not know yet, but hopefully they will help you out on a journey to master this tool.
"""
aliases = [
  "15-git-commands-you-may-not-know"
]
[taxonomies]
topics = [ "Git" ]
+++

Using [Git](https://git-scm.com/) may be intimidating at times. There are so many commands and details to
learn. The [documentation](https://git-scm.com/docs), however, while being
immense, is still greatly accessible. Once you overcome the initial feeling of being overwhelmed, the things will start to fall into place. Here is a
list of 15 Git commands that you may not know yet, but hopefully they will help
you out on a journey to master Git.

## 1. Modify The Most Recent Commit

```
git commit --amend
```

`—-amend` allows to append staged changes (e.g. to add a forgotten file) to the previous commit. Adding `—-no-edit` on top of that will amend the last commit without changing its commit message. If there are no changes, `-—amend` will allow you to reword the last commit message.

For more: `git help commit`

## 2. Interactively Add Selected Parts of Files
```
git add -p
```

`-p`  (or `—patch`) allows to interactivly select parts of each tracked file to commit. This way each commit contains only related changes.

For more: `git help add`

## 3. Interactively Stash Selected Parts of Files
```
git stash -p
```

Similar to `git-add` , you can use `--patch` option to interactively select parts of each tracked file to stash.

For more: `git help stash`

## 4. Stash with untracked
```
git stash -u
```

By default, when stashing, the untracked files are not included. In order to change that bevahiour and include those files as well you need to use `-u` parameter. There is also `-a` (`—all`) which stashes both untracked and ignored files altogether, which is probably something you usually won’t need.

## 5. Interactively Revert Selected Parts of Files
```
git checkout -p
```

`--patch` can be also used to selectively discard parts of each tracked file. I aliased this command as `git discard`

For more: `git help checkout`

## 6. Switch to Previous Branch
```
git checkout -
```

This command allows you to quickly switch to the previously checked out branch. On a general note `-` is an alias for the previous branch. It can be used with other commands as well. I aliased `checkout` to `co` so, it becomes just `git co -`

## 7. Revert All Local Changes
```
git checkout .
```

If you are sure that all of your local changes can be discarded, you can use `.` to do it at once. It is, however, a good practice to always use `checkout --patch`.

## 8. Show changes
```
git diff --staged
```

This command shows all staged changes (those added to the index) in contrast to just `git diff` which only shows changes in the working directory (without those in the index).

For more: `git help diff`

## 9. Rename Branches Locally
```
git branch -m old-name new-name
```

If you want to rename the currently checked out branch, you can shorten this command to the following form:

```
git branch -m new-name
```

For more: `git help branch`

## 10. Rename Branches Remotely
In order to rename a branch remotely, once you renamed your branch locally, you need to first remove that branch remotely and then push the renamed branch again.

```
git push origin :old-name
git push origin new-name
```

## 11. Open All Files with Conflicts at Once
Rebasing may lead to conflicts, the following command will open all files which need your help to resolve these conflicts.

```
git diff --name-only --diff-filter=U | uniq  | xargs $EDITOR
```

## 12. What changed?
```
git whatchanged —-since=‘2 weeks ago’
```

This command will show a log with difference each commit introduces within the last two weeks.

## 13. Remove file from last commit

Image you committed a file by mistake. You can quickly remove that file from the last commit by combining `rm` and `commit --amend` commands:

```
git rm —-cached <file-to-remove>
git commit —-amend
```

## 14. Find Branches
```
git branch --contains <commit>
```

This command will show all branches that contain a particular commit.

## 15. Optimize the repository locally
```
git gc --prune=now --aggressive
```

For more: `git help gc`

## Bonus

Although I like CLI a lot, I highly recommend checking [Magit](https://magit.vc/) to futher step up your Git game. It is one of best pieces of software I used.

There is, also, a fantastic overview of recommended Git workflows available via `help` command. Be sure to read it thoroughly!

```
git help workflows
```


