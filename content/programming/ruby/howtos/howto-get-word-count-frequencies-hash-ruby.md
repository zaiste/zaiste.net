
+++

+++
# How To Get Word Count / Frequencies using Hashes in Ruby

```ruby 
wf = Hash.new(0).tap { |h| words.each { |word| h[word] += 1 } }
```

Using ```
undefined
```:

```ruby 
wf = words.each_with_object(Hash.new(0)) { |word, acc| acc[word] += 1 }
```

A functional/immutable approach:

```ruby 
wf = words.group_by(&:itself).map { |w, ws| [w, ws.length] }.to_h
```

Ruby 2.7 onwards will have the Enumerable#tally method that will solve:

\> Tallys the collection. Returns a hash where the keys are the elements and the values are numbers of elements in the collection that correspond to the key.

```ruby 
["a", "b", "c", "b"].tally #=> {"a"=>1, "b"=>2, "c"=>1}
```

