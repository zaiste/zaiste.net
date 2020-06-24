+++
title = "How To Delete A Job From A Queue In Sidekiq"
[taxonomies]
topics = [ "Ruby" ]
+++

```rb
queue = Sidekiq::Queue.new("mailer")

queue.each do |job|
  job.klass
  job.args
  job.delete if job.jid == 'abcdef1234567890'
end
```

