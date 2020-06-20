+++
title = "How To Assure Unique Jobs in Sidekiq"
[taxonomies]
topics = [ "Ruby" ]
+++

```ruby
class UniqueWorker

  def self.perform_unique_async(...<params>...)
    queue = Sidekiq::Queue.new('queue-name')
    queue.each { |q| return if q.args.join(':') == key }

    YourWorker.perform_async(...<params>...)
  end

end
```

