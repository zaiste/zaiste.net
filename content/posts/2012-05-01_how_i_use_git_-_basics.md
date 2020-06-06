+++
date = 2012-05-01T00:00:00.000Z
title = "How I Use Git - Basics"
topics = [ "Git", "CLI" ]
+++

[Git](http://git-scm.com/) is an amazing piece of software. More I know about, more I’m fascinated by its power. Yet, I still have an impression that this is just a beginning of my Git journey.

In a series of posts I will try to present my current workflow with Git. I hope you will find it useful.

If you are new to Git, don’t forget to check [Scott Chacon’s](http://scottchacon.com/) [« Why Git is better than X »](http://whygitisbetterthanx.com/) to see how it compares to other tools.


Code Collaboration
------------------

At [Nukomeet](http://nukomeet.com) we use *Fork + Pull Model* model for all our projects. It means that team members cannot push directly to the central repository, they must fork it before. The changes are then pulled to that central repository by the project maintainer. It is a model mainly use in « open-source world », it allows people to work independently without upfront coordination.

At the moment I am a maintainer of several projects at [Nukomeet](http://nukomeet.com). One of them is a new version of SaaS platform for our friends from [QuickStudio](http://quickstudio.com). For the purpose of this article, I will use this project as an example.


Inception
---------

First step is to clone a central repository

    git clone git@github.com:nukomeet/quicker

I'm not only the maintainer, but also I contribute some code from time to time in that project (tweaks, refactorings, etc). Because of that I have a remote tracking branch, pointed to my private fork:

    λ git remote add z git@github.com:zaiste/quicker

I fork the project using [GitHub](http://github.com) website. I might use [hub](http://defunkt.io/hub/) or [github-gem](https://github.com/defunkt/github-gem), but at the moment they do not support [GitHub API v3](http://developer.github.com/v3/).


Collaboration
-------------

Afterwards, as the maintainer I set up remote tracking branches for repositories of all coders participating in the project. They are added the same way as the one above. The line below connects me with Alban's private fork of QuickStudio project.

    λ git remote add albanlv git@github.com:albanlv/quicker

Alban knows that every change should be provided via a topic branch so the maintainer could deal with it in a more efficient way i.e. it is easier to deal with unrelated commits when they are provided that way (cherry-pick).

Once finished, Alban sends back the changes to his fork by pushing a particular topic branch to his repository origin.

    $ git push origin added-simple-comments

He can now send a pull request via GitHub website from the remote branch he just pushed to.

Every pull request sent to the central repository is merged using GitHub website as I haven't found yet any convenient (and API v3 compatible) way to list pull requests on the command line.

When I want to test some changes without merging, I simply fetch them from that person

    λ git fetch albanlv

and then switch to the branch with specific changes

    λ git checkout albanlv/added-simple-comments

If everything seems fine, I can merge them to the master

    λ git checkout master
    λ git merge albanlv/added-simple-comments

and push it to origin's master on GitHub in order to automatically close that pull request

    git push origin master # or simply: git push


Making my own changes
---------------------

Sometimes I need to contribute some code. I rarely push directly to the central repository. Instead I work on my own fork. As other team members I start off by creating a topic branch

    git checkout -b new-feature

Once changes are done I commit them on that branch. Next, I push that branch to a tracking remote branch which references my fork

    git push -u z new-feature

I send a pull request followed by a merge, which is done the same way I described above.


Feedback
--------

I'm still far from being a Git expert, if you think this workflow can be improved, your feedback is highly welcome !




