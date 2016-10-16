---
created_at: 2017-08-04 
kind: article
publish: true
title: "CSV Parsing Performance: Python vs Ruby"
tags:
- csv
- python
- ruby
---

Let's compare CSV parsing performance as a time spent and memory used between Python and Ruby. We will be using Python `3.6.4` and Ruby `2.4.3`.

There will be two data sets. The first CSV file has 1 million records and 302 MB. The second CSV file has 7 million records and 2.1 GB.

For both languages we will be testing three scenarios: a regular parsing, parsing with headers and parsing using a progress bar. 

## Python

Regular CSV parsing:

```py
with open(csv_path, newline='') as f:
    reader = csv.reader(f)
    for row in reader:
        pass
```

CSV parsing with headers:

```py
with open(csv_path, newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        pass
```

CSV parsing with a progress bar using `progressbar2` package.

```py
num_lines = sum(1 for line in open(csv_path))

with progressbar.ProgressBar(max_value=num_lines) as bar:
    with open(csv_path, newline='') as f:
        reader = csv.reader(f)
        for row in bar(reader):
            pass
```

### Results

#### Time spent

| scenario | 1M | 7M |
| - | - | - |
| regular parsing | 8.07 s | 54.11 s |
| with headers | 14.04 s | 106.37 s |
| with progress bar | 13.38 s | 88.98 s |

Time spent looks consistent between 1M and 7M data sets: for the latter it's slightly less than 7x than the former.

Adding a progress bar or parsing CSV headers increases the time almost 2x.

#### Memory usage

| scenario | 1M | 7M |
| - | - | - |
| regular parsing | 9.75 MB | 3.93 MB | 
| with headers | 9.78 MB | 5.11 MB | 
| with progress bar | 9.78 MB | 4.87 MB | 

Memory usage for the large data set is about 2x smaller than for the small data set. This is an unexpected result. 

### Measurement Method

The following method can be used as a decorator on a method to measure its memory usage and how long it is being executed.

```py
def example(fn):
    @functools.wraps(fn)
    def wrapped():
        try:
            print('Running: {}'.format(fn.__name__))

            start = time.time()

            fn()

            end = time.time()
            print('{:.2f}'.format(end - start))

            process = psutil.Process(os.getpid())
            print('{:.2f} MB\n'.format(process.memory_info().rss / 1024 / 1024))
        except KeyboardInterrupt:
            print('Skipping...')

    examples.append(wrapped)
    return wrapped
```

`time.time` provides the overall execution time including running time spent by other processes on the computer. It is the time the user notices. Thus, it may not be the best measurement to compare.

## Ruby

Regular CSV parsing:

```rb
CSV.foreach(FILENAME) do |row|

end
```

CSV parsing with headers:

```rb
CSV.foreach(FILENAME, headers: true) do |row|

end
```

CSV parsing with a progress bar using `progressbar2` package.

```rb
count = File.foreach(FILENAME).inject(0) { |c, _| c + 1 }
bar = ProgressBar.create(throttle_rate: 0.2, total: count)

CSV.foreach(FILENAME) do |row|
  bar.increment
end
```

### Results

#### Time spent

| scenario | 1M | 7M |
| - | - | - |
| regular parsing | 22.34 s | 178.87 s |
| with headers | 32.66 s | 260.42 s |
| with progress bar | 28.75 s | 214.38 s |
| with headers & progress bar | 41.93 s | 314.32 s |

#### Memory usage

| scenario | 1M | 7M |
| - | - | - |
| regular parsing | 1.14 MB | - | 
| with headers | 0.99 MB | - | 
| with progress bar | 0.96 MB | - | 
| with headers & progress bar | 2.87 MB | - |

For the larger data set the memory usage wasn't consistent. During some runs it was even indicated as a minus value.

### Measurement Method

The following methods were used to measure the execution time along with the memory usage.

```rb
def memory_usage
  memory_before = `ps -o rss= -p #{Process.pid}`.to_i
  yield
  memory_after = `ps -o rss= -p #{Process.pid}`.to_i

  puts "Memory: #{((memory_after - memory_before) / 1024.0).round(2)} MB"
end

def time_spent
  time = Benchmark.realtime do
    yield
  end

  puts "Time: #{time.round(2)}"
end
```

```rb
memory_usage do
  time_spent do
    # actual code goes here
  end
end
```
