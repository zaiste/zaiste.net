---
created_at: 2012-08-16
kind: article
publish: true
title: "Rails Dev Speed-Up: From Spork to Zeus"
tags:
- rails
- ruby
- perf
---

## TL;DR

[Zeus][3] is like [Spork][5] on steroids. Beside speeding up tests execution, it also greatly reduces Rails boot up time. Usual development tasks such as `server`, `console`, `generate` execute in about a second!

If you haven't done it yet, you should consider switching from Spork to Zeus.

## Vanilla Dev Env

These are execution times for `server` and `console` commands on my machine before applying any performance tweaks.

```
time rails c
rails c  12.03s user 2.56s system 16% cpu 1:09.97 total
```

```
time rails s
rails s  11.49s user 2.28s system 35% cpu 39.126 total
```

Let's try to improve it.

## Step 1: Patched Ruby 1.9.3-p194

The [following patch for Ruby 1.9.3-p194][1] by [burke][6] incorporates [new version of garbage collector][2] that will come with the release of Ruby 2.0. The installation is pretty straightforward, both for [rbenv][7] and [rvm][8].

with rbenv

```
curl https://raw.github.com/gist/1688857/rbenv.sh | sh ; rbenv global 1.9.3-p194-perf
```

with rvm

```
rvm get head && rvm reinstall 1.9.3-perf --patch falcon --force-autoconf -j 3
```

As it's a new version of Ruby, we have to install all gems once again.

```
gem install bundler
bundle install
```

Let's check how it improves Rails boot up

```
time rails c
rails c  4.76s user 1.77s system 78% cpu 8.324 total
```

```
time rails s
rails s  4.53s user 1.66s system 74% cpu 8.327 total
```

Pretty cool. In my case even much faster than [declared in the gist][1] 30% time improvement.

## Step 2: Zeus

[Zeus][3] preloads your Rails environment. It is easier to use that [Spork][5] as you don't have to put it as a dependency in `Gemfile` or to modify any files (e.g. `spec_helper`). It not only greatly increases tests execution time, but also handles usual development commands (`server`, `console`, etc.) The tool was designed to work with new version of garbage collector mentioned above. Check [author's screencast][4] to see Zeus in action.

Zeus requires **OS X 10.7+** or **Linux 2.6.13+** and works with **Rails 3.0+** (at the time of writing).

In your project directory:

```
gem install zeus
zeus init
zeus start
```

Let's check how Zeus helps with Rails boot up time

```
time zeus s
zeus s  0.20s user 0.07s system 22% cpu 1.181 total
```

```
time zeus c
zeus c  0.20s user 0.07s system 16% cpu 1.715 total
```

Wow!

## Final

Overall, in my case, Rails `server` starts approx. 59x faster and Rails `console` approx. 22x faster than vanilla Ruby/Rails installation. That's quite a change!

[1]: https://gist.github.com/1688857
[2]: http://patshaughnessy.net/2012/3/23/why-you-should-be-excited-about-garbage-collection-in-ruby-2-0
[3]: https://github.com/burke/zeus
[4]: http://vimeo.com/46795747
[5]: https://github.com/sporkrb/spork
[6]: https://github.com/burke
[7]: https://github.com/sstephenson/rbenv
[8]: https://rvm.io/
