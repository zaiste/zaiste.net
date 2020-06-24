
+++
date = 2017-05-31T00:00:00.000Z


title = "Rails - includes, joins & references"
topics = [ "rails", "database" ]

+++

## TL;DR

* `joins`: just filtering results - not accessing records from a relationship
* `includes`: when accessing relationship between records


---

Lazy loading is a way to defer initialization of an object until it is needed. It may provide additional efficiency in the program's operation, especially if such initialization is costly, e.g. accessing network services or database. The opposite of lazy loading is eager loading.

In Rails `includes` uses eager loading whereas `joins` uses lazy loading. With the former both tables are loaded into memory - this reduces the amount of queries required to retrieve associated data.

```rb
@companies = Company.includes(:persons).where(persons: { active: true } ).all

@companies.each do |company|
  company.person.name
end
```

Without the eager loading mechanism iterating through companies would generate a separate database query in order to retrive person's name.

If you don't plan to reference any data from the associated `Person` table, you can use `joins` to load it lazy minimizing the required memory utilization. Otherwise, `joins` may trigger **N+1** quries.

```rb
@companies = Company.joins(:persons).where(persons: { active: true } ).all

@companies.each do |company|
  company.name
end
```

`includes` just loads the data eagrly; at times you may also need the functionality that `joins` provides i.e. using the related table in `where` or `order by`, in that case you need to additionally use `references`.

```rb
# Will work
Company.includes(:persons).references(:persons).where('persons.age > 30')
Company.joins(:persons).where('persons.age > 30')

# Will NOT work
Company.references(:persons).where('persons.age > 30')
Company.includes(:persons).where('persons.age > 30')
```



