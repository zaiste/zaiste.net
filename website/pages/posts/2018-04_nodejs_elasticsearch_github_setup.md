---
created_at: 2018-04-22
kind: article
publish: true
title: "Using Node.js & Elasticsearch to search GitHub: 1 Setup"
image: "nodejs-elasticsearch.jpg"
tags:
- nodejs
- elasticsearch
- javascript
- es6
sitemap:
  priority: 0.8
abstract: >
  In this tutorial I will be showing how to build a JavaScript application on top of Elasticsearch. Its core will be written in Node.js followed by Vue.js on the frontend. We will be using modern JavaScript specifications (ES6+) with features such as `async/await`, spread operator or destructuring assignment.
---

In this tutorial I will be showing how to build a JavaScript application on top of [Elasticsearch](https://www.elastic.co/products/elasticsearch). Its core will be written in [Node.js](https://nodejs.org/en/) followed by [Vue.js](https://vuejs.org/) on the frontend. We will be using modern JavaScript specifications (ES6+) with features such as `async/await`, spread operator or destructuring assignment.

The tutorial will be split into several articles:

1. Using Node.js & Elasticsearch to search GitHub: 1 Setup
2. Using Node.js & Elasticsearch to search GitHub: 2 Vue.js (TBD)
3. Using Node.js & Elasticsearch to search GitHub: 3 GraphQL (TBD)
4. TBA

The source code can be found [on GitHub](https://github.com/zaiste/elasticsearch-nodejs-github-tutorial).

## Goal

The goal is to build a search engine for GitHub repositories. We will be connecting with [GitHub's API](https://developer.github.com/) to fetch list of trending repositories. Each repository data along with its `README` will be indexed by Elasticsearch.

We will be constructing the application iteratively. Its initial versions won't be ideal. The intention is to showcase a possible process of software development: start with something small that works and improve it along the way by applying various refactorings.

## Requirements

Before we start, make sure you have the following software installed:

- [Yarn](https://yarnpkg.com/en/)
- [Elasticsearch 6.x](https://www.elastic.co/downloads)
- [HTTPie](https://httpie.org/)

Check if Elasticsearch running:

```
http :9200
```
```
HTTP/1.1 200 OK
content-encoding: gzip
content-length: 288
content-type: application/json; charset=UTF-8

{
    "cluster_name": "tempertynka",
    "cluster_uuid": "SWjeIaE4SrOQV-SJRxwObA",
    "name": "ZGl7bwG",
    "tagline": "You Know, for Search",
    "version": {
        "build_date": "2018-04-12T20:37:28.497551Z",
        "build_hash": "ccec39f",
        "build_snapshot": false,
        "lucene_version": "7.2.1",
        "minimum_index_compatibility_version": "5.0.0",
        "minimum_wire_compatibility_version": "5.6.0",
        "number": "6.2.4"
    }
}
```

## Create Project

Let's start by creating a project using Yarn.

    yarn init

Next, install the \`elasticsearch\` package from the NPM registry.

    yarn add elasticsearch

In the first step, let's try to connect to the Elasticsearch instance using JavaScript and check
its health.

```js
const { Client } = require('elasticsearch');
const client = new Client({
  host: 'localhost:9200'
});

const main = async () => {
  const health = await client.cluster.health();
  console.log(health)
}

main()
```

Run it: 

```
node index.js
```

```json
{ cluster_name: 'tempertynka',
  status: 'yellow',
  timed_out: false,
  number_of_nodes: 1,
  number_of_data_nodes: 1,
  active_primary_shards: 10,
  active_shards: 10,
  relocating_shards: 0,
  initializing_shards: 0,
  unassigned_shards: 10,
  delayed_unassigned_shards: 0,
  number_of_pending_tasks: 0,
  number_of_in_flight_fetch: 0,
  task_max_waiting_in_queue_millis: 0,
  active_shards_percent_as_number: 50 }
```

## Create Elasticsearch Index

Now we can create an Elasticsearch index. Let's call it `github` with `trending` as the type.

```js
const init = async () => {
  await client.indices.create({
    index: 'github',
    body: {
      mappings: {
        trending: {
          properties: {
            name: { type: 'text' },
            url: { type: 'text' },
            description: { type: 'text', analyzer: 'english' },
            readme: { type: 'text', analyzer: 'english' },
          }
        }
      }
    }
  });
};
```

Now we can start indexing documents. Let's create a wrapper around Elasticsearch's `index()` method to control and limit possible input data.

```js
const index = async ({ name, description, readme }) => {
  await client.index({
    index: 'github',
    type: 'trending',
    body: { name, description, readme }
  })
}
```

In the example above, we are using destructuring assignment feature to extract values of specific properties from the input object and to store them as variables.

## Connect with GitHub API

Next step is to connect with GitHub's API. We will start with REST API and eventually (in the following articles) we will refactor it to use GraphQL API.

First, install [axios](https://github.com/axios/axios), a promised-based HTTP library.

    yarn add axios

We will fetch the most starred (trending) JavaScript repositories from the last week.

```js
const fetchTrendingRepositories = async () => {
  const { data: { items } } = await axios({
    baseURL: 'https://api.github.com/',
    url: "/search/repositories",
    params: {
      sort: 'stars',
      order: 'desc',
      q: 'language:javascript created:>2018-04-15',
    }
  })

  return items.map(({
    id, full_name, html_url, description
  }) => ({
    id,
    name: full_name,
    url: html_url,
    description
  }));
}
```

We send a request to `/search/repositories` endpoint. The query params indicate JavaScript only repositories created within last week, sorted by stars in the descending order.

`axios` returnes response's payload under `data` field while GitHub API places the requested repository list under `items` field. We use destructuring assignment again to place that collection directly into `items` variable.

As there are many other fields for each item of the collection returned by GitHub API, we filter out only those fields that we are interested in by using `.map()`. In the process we rename some of those fields for convenience.

Next step is to fetch `README` for each of those repositories. `/repos/<repository name>/readme` endpoint is for that. Let's write an auxiliary function which fetches the `README` of a repository specified by `name` as the input parameter.

```js
const fetchReadme = async name => {
  const { data: readme } = await axios({
    baseURL: 'https://api.github.com/',
    url: `/repos/${name}/readme`,
    headers: {
      accept: "application/vnd.github.v3.raw"
    }
  })

  return readme;
}
```

## Save to Elasticsearch

Now we can merge those two data points and store it Elasticsearch.

```js
const store = async () {
  try {
    const repos = await fetchTrendingRepositories();
    for (const repo of repos) {
      const readme = await fetchReadme(repo.name);
      await index({ ...repo, readme })
    }
  } catch (error) {
    console.log(error.message);
  }
}
```

## Query Elasticsearch

The final piece of the puzzle is the `search()` function.

```js
const search = async query => {
  const results = await client.search({
    index: 'github',
    size: 10,
    body: {
      query: {
        multi_match: {
          query,
          type: 'cross_fields',
          fields: ['name', 'description^2', 'readme^3'],
          operator: 'or',
          tie_breaker: 1.0,
          cutoff_frequency: 0.1
        }
      }
    }
  })

  return results.hits.hits.map(({
    _source: { name, description, readme }
  }) => ({
    name, description, readme,
  }))
}
```

We specify the query as a `multi_match`. Each field has a different weight specified with `fields` as `['name', 'description^2', 'readme^3']`. With `cross_fields` we indicate that all terms of a query must be present in at least one field for a document to match.

```js
const results = await search('webassembly');
```

## Source code

Check the [source code on GitHub](https://github.com/zaiste/elasticsearch-nodejs-github-tutorial) if you are not sure how to combine all pieces together.

## Next 

In the next article we will build a simple web UI using Vue.js. Stay tuned.
