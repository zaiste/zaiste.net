+++
title = "How To Get Word Count / Frequencies using Hashes in Ruby"
[taxonomies]
topics = [ "Ruby" ]
+++


```rb
wf = Hash.new(0).tap { |h| words.each { |word| h[word] += 1 } }
```

Using `Enumerable#each_with_object`:

```rb
wf = words.each_with_object(Hash.new(0)) { |word, acc| acc[word] += 1 }
```

A functional/immutable approach:

```rb
wf = words.group_by(&:itself).map { |w, ws| [w, ws.length] }.to_h
```

Ruby 2.7 onwards will have the Enumerable#tally method that will solve:

> Tallys the collection. Returns a hash where the keys are the elements and the values are numbers of elements in the collection that correspond to the key.

```rb
["a", "b", "c", "b"].tally #=> {"a"=>1, "b"=>2, "c"=>1}
```

