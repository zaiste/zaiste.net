
+++

+++
# Elasticserch

By default, the number of shards is 5 and the number of replicas is 1.

For testing on a single node, start with only one shard and no replicas.

```yaml 
index.number_of_shards: 1
index.number_of_replicas: 0
```

## Queries

### Show indices

```bash 
http :9200/_cat/indices
```

