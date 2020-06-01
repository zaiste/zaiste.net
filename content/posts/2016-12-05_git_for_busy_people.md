
+++
date = 2016-12-05T00:00:00.000Z


title = "Git Primer for Busy People"
topics = [ "git", "scm", "primer" ]

+++

<div class="notice blockquote">
This is work-in-progress, suggestions or tips are welcome.
To move around efficiently, use `Ctrl-F`. Last updated: <strong>Dec 30th, 2017</strong>
</div>

[Git][1] (current version `2.15.1`) is an open source distributed version control system. It has a tiny footprint with lightning fast performance.

## Architecture

### Storage

Git uses files for storage. A commit is a file with the commit message, associated data (name, email, date/time, previous commit, etc) and with a link to a tree file. The tree file contains a list of objects or other trees. The object or blob is the actual content associated with the commit (the filename isn’t stored in the object, but in the tree). Files are stored with a filename of a SHA-1 hash of the object.

Branches and tags are files containing SHA-1 hashes pointing to particular commits. Creating a new branch means creating a file with the name of the branch and the SHA-1 reference to the current commit. Current branch is marked as `HEAD`. All the branch pointers are kept in `.git/refs/heads`, `HEAD` is stored in `.git/HEAD` file and tags are stored in `.git/refs/tags`. Additionally, `ORIG_HEAD` backs up the position of `HEAD` before a potentially dangerous operation

### Modes

« *Changes are staged* » means they are added to the **index**. « *Changes are unstaged* » means they are not added to the **index** but present in the **working directory**. Commits are only made from staged changes.

**Staging area** is a place to short list changes to be added with the next commit; also known as *index*, *cache*, *staged files area* or just *stage*.

### Relative commit markers (i.e. `^` & `~`)

Carats `^` and tildes `~` are relative commit markers in Git.  `HEAD^1` (or `HEAD^`) means « 1st parent of `HEAD` ». `HEAD^2` means « 2nd parent of `HEAD` » (present if there's been a merge). `HEAD^^` is not the same as `HEAD^2`. `HEAD^^` means « the 1st parent of the 1st first parent ». `HEAD^^` equals to `HEAD~2`

Also:

```
HEAD^1 == HEAD^ == HEAD~1 == HEAD~
```

```
HEAD^^ == HEAD~2
```

## Configuration

### List configuration settings

```
git config --list
```

### Set user name and email

```
git config --global user.name "John Appleseed"
git config --global user.email "john@apple.com"
```

### Create alias

```
git config --global alias.lr 'log --reverse'
```

### Set up pager to wrap lines

```
git config core.pager 'less -r'
```

## Repository

### Unstage all staged files

```
git reset
```

### Remove untracked files from the repository

```
git clean -f
```

### Show untracked files to be removed from the repository

```
git clean -f -n
```

`-n` equals to `--dry-run`

### Remove untracked files & directories from the repository

```
git clean -fd
```

### Remove (interactively) untracked files & directories from the repository

```
git clean -i
```

### Remove file from source control but not from the project

```
git rm --cached config/database.yml
```

## Commit

### Add empty commit

```
git commit -m 'Here goes commit message' --allow-empty
```

### Unstage file

```
git reset HEAD <file name>
```

### Undo last commit & keep changes (if local)

```
git reset HEAD~
```

### Undo last commit & keep changes in index (if local)

```
git reset --soft HEAD~
```

### Undo last commit & destory changes (if local)

```
git reset --hard HEAD~
```

### Undo last commit (if pushed)

```
git revert HEAD
```

### Undo single file from last commit (if local)

```
git reset HEAD~ file.txt
git commit --amend --no-edit
```

or

```
git reset --soft HEAD~
git reset HEAD file.txt # good changes are staged, ready to be committed
git commit
```

### Squash last 3 commits

```
git reset --soft HEAD~3
git commit
```

(only if the the oldest one is not the initial commit)

### Squash into the initial commit

```
git rebase -i --root master
```

### Squash any 3 commits

Let's assume `B` is the SHA of the commit to squash in.

```
git rebase -i B
```

and then

```
pick B ...
squash C ...
squash D ...
...
```

### Apply patch

```
curl https://github.com/zaiste/kulfon/pull/42.patch > /tmp/42.patch
git apply --check /tmp/42.patch
git apply /tmp/42.patch
```

### Find lost commits using reflog

```
git log -g
```

### Find lost commits using `fsck`

```
git fsck --full
```

## Merge

### Undo merge with conflicts

```
git merge --abort
```

It resets the working directory to whatever state it was in before the merge. It should restore any uncommitted changes from before the merge.

Older syntax (Git < 1.7.4) which does the same as the above:

```
git reset --merge
```

In Git < 1.6.2 you have to use

```
git reset --hard
```

which removes all uncommitted changes, including the uncommitted merge.

## Branch

### Create branch from remote

```
git fetch origin
git checkout <branch name>
```

it automatically creates local branch `<branch name>` with an upstream pointing to remote-tracking branch `origin/<branch name>`.

or (for Git < 1.6.6)

```
git checkout -b <branch name> origin/<branch name>
```

### Fetch all branches from remote

```
git fetch origin
```

It fetches all the branches of `origin` remote into remote-tracking branches under `origin/`.

### Fetch branch from remote

```
git fetch origin foo
```

It fetches `foo` branch from `origin` remote and put it under `origin/foo`.

### Delete all branches already merged into the current branch

```
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

### Replace local changes with remote's master

```
git reset --hard origin/master
```

### Clone repository and all of its submodules

```
git clone --recursive git://github.com/foo/bar.git
```

For Git <= X

```
git clone git://github.com/foo/bar.git
cd bar
git submodule init
git submodule update
```

### Rename branch

```
git branch -m <branch name> <new branch name>
```

### Rename current branch

```
git branch -m <new branch name>
```

### Delete local branch

```
git branch -d <branch name>
```

### Delete branch from remote

```
git push origin --delete <branch name>
```

or

```
git push origin :<branch name>
```

### Show which branch is tracking which remote branch

```
git remote show origin
```

### Make an existing Git branch track a remote branch

```
git branch -u origin/<branch name>
```

or, if local `<branch name>` is not the current branch

```
git branch -u origin/<branch name> <branch name>
```

or, longer form

```
git branch --set-upstream-to=origin/<branch name>
```

For Git < 1.7.0

```
git branch --set-upstream foo upstream/foo
```

This syntax is now **deprecated**.

### Show local branches

```
git branch -lv
```

### Show remote branches

```
git branch -rv
```

### Show stale remote-tracking branches

```
git remote prune origin --dry-run
```

### Remove stale remote-tracking branches

```
git remote prune origin
```

### Go to previous branch

```
git checkout -
```

### Shows branches merged in current branch

```
git branch --merged
```

### Shows branches not merged in to your current branch

```
git branch --no-merged
```

## Remotes

Remotes are like nicknames for the URLs of repositories, e.g. `origin`.

### Add remote

```
git remote add upstream git@github.com:<user name>/<project name>.git
```

### List remotes

```
git remote -v
```

### Delete remote

```
git remote rm <remote name>
```

## Rebasing

### Rebase on top of remote-tracking branch

```
git rebase origin/master
```

### Undo a rebase

```
git reset --hard ORIG_HEAD
```

`reset`, `rebase` & `merge` save the original `HEAD` pointer into `ORIG_HEAD`; to undo it, use `git reset --hard`.

## Submodules

Submodules are tracked by the exact commit specified in the parent project, not a branch, a ref, or any other symbolic reference.

### Remove submodule

1. Delete the relevant line from the `.gitmodules` file.
1. Delete the relevant section from `.git/config`.
1.

```
git rm --cached <path to submodule>
git commit
rm -rf <path to submodule>
```

## Log

### Show only the last commit in the log

```
git log -1
```

### Show commits only in specific branches

```
git log master..feature
```

or

```
git log feature --not master
```

or

```
git log feature feature2 --not master
```

### Show incoming commits

```
git log ..@{u}
```

(using reflog syntax available for Git >= `1.7.0`)

### Show outgoing commits

```
git log @{u}..
```

(using reflog syntax available for Git >= `1.7.0`)

### Show commits since the last pull without merges in reverse order

```
git log --reverse --no-merges --stat @{1}..
```

### Search commits by author

```
git log --author=Zaiste
```

### Search through commit messages

```
git log --grep="42 and life"
```

### Generate changelog between releases

```
git shortlog release/42 ^release/41
```

### Generate monthly commit summary for specific user

```
git log --pretty=format:"%h - %s <%cn> %cd" --author="<author name>" --after 2015-11-01 --before 2015-11-31 --no-merges --date=short
```

## Diff

### Show incoming changes

```
git diff ..@{u}
```

### Show outgoing changes

```
git diff @{u}..
```

### Show changes between branch and its remote-tracking branch

```
git diff master origin/master
```

or

```
git diff ...origin
```

## Tags

### Rename tag

```
git tag new old
git tag -d old
git push origin :refs/tags/old
git push --tags
```

Make sure other repository users remove the deleted tag as well. They should run the following command:

```
git pull --prune --tags
```

## Varia

### Use specific SSH key to clone repository

```
ssh-agent bash -c 'ssh-add ~/.ssh/<key file name>; git clone git@github.com:<user name>/<project name>.git’
```

or

```
ssh-agent (ssh-add ~/.ssh/<key file name>; git clone git@github.com:<user name>/<project name.git)
```

### TBC...

Suggestions, adjustments or corrections are welcome!

[1]: https://git-scm.com/
