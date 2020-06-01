
+++
date = 2013-02-02T00:00:00.000Z


title = "MongoDB Replica Set and OSX Setup"
topics = [ "mongodb", "osx" ]

+++

In MongoDB realm, a *replica set* is simply a set (or cluster if you like fancy
names) that consists of at least two mongod instances that replicate data
amongst one another. Such setup increases redundancy and ensures high
availability of the database. It may also improve its read capacity.

## Concepts

In a replica set there is always only one primary mongod instance that is used
to manage write operations. Secondary instances are only readable and
asynchronously replicate data from the primary mongod instance. Replica sets
also provide automated failover which means that if the primary member fails,
secondary ones will automatically try to elect a new primary among them.

The operations log (abbreviated as `oplog`) is a special feature (implemented
as a capped collection) of replica set that records each operation modifying any
data stored in the databases. In order to modify the database configured as a
replica set, MongoDB starts by applying write operations on the primary member.
Next, the operation is recorded on the primary’s oplog. The secondary members
are now ready to replicate this oplog. Once replicated, they can apply these
operations to themselves in an asynchronous process. Operations in the oplog are
idempotent. Readable members may not have the latest changes at all times, but
eventually, they will contain the same version of the oplog. When the system
allows gradual propagation of changes we say that read operations to a primary
have *strict consistency*, while read operations to secondaries have *eventual
consistency*.

## Development Setup

Setting up a replica set on OSX is pretty straightforward. I assume that
everything is performed on the localhost with no security nor optimisation taken
into consideration. In practice, while in development mode, the number of mongod
instances can be even reduced to a single one. In that case there is obviously
no replication, but we have access to the `oplog`, which, in some scenarios, may
be useful.

Let's run a `mongod` instance as a member of `test` replica set with the
following command:

```
mongod --port 27001 --smallfiles --oplogSize 50 --replSet test
```

`oplogSize` specifies the maximum size (in MB). By default, it is set based on
the available disk space. Here, we make the hard size limit for it. `small files`
enforces smaller files by default. Again, given values make sense only for
development purposes.

Next, let's connect to this instance and configure its replica set as shown
below:

```
λ mongo --port 27001
> cfg = { _id: "test", members: [ {_id:0, host: "localhost:27001"} ] }
> use admin
switched to db admin
> rs.initiate(cfg)
{
    "info" : "Config now saved locally. Should come online in about a minute.",
    "ok" : 1
}
```

Our replica set should be running and ready to accept connections. Enjoy.
