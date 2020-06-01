
+++

+++
# Grep

Default options using `GREP_OPTIONS`

```bash
GREP_OPTIONS=
for pattern in .cvs .git .hg .svn node_modules; do
    GREP_OPTIONS="$GREP_OPTIONS --exclude-dir=$pattern
done

export GREP_OPTIONS
```

Default options using `alias`:

```bash
alias grep='grep --exclude-dir=.git'
```

Then to run `grep` without default options, use `\grep`

