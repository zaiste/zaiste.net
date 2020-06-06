
+++
date = 2012-08-27T00:00:00.000Z
title = "Importing JSON into MongoDB"
aliases = [
    "importing_json_into_mongodb"
]
[taxonomies]
topics = [ "MongoDB"]
+++

Importing JSON data into MongoDB can be tricky. By default, `monogoimport`
assumes a special structure for a file to import from:
similar to JSON format except that only one document per line is allowed
with no comma after each of them - something like:

```
{ name: "Widget 1", desc: "This is Widget 1" }
{ name: "Widget 2", desc: "This is Widget 2" }
```

It would be easier, however, to use a traditional JSON instead of adapting it
to this special format required by MongoDB. Luckily, we can force `mongoimport`
to import the data as a JSON array using `--jsonArray` parameter.

Let's suppose we have a `seed.json` file with the following content:

```
[
    { name: "Widget 1", desc: "This is Widget 1" },
    { name: "Widget 2", desc: "This is Widget 2" }
]
```

We can import it to our local MongoDB database using following command:

```
λ mongoimport --db <db-name> --collection <coll-name> --type json --file seed.json
--jsonArray
```

If the specified collection doesn't exist, it will be automatically created;
otherwise new documents will be appended to the existing one.
