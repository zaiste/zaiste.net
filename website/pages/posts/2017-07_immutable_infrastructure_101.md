---
created_at: 2017-07-17
kind: article
publish: true
title: "Immutable Infrastructure 101"
tags:
- immutable
- infrastructure
---

*Immutable infrastructure* is an approach to infrastructure management (deployment & configuration), where immutable components are replaced for every deployment, rather than being updated in-place, i.e. new servers are created and the old ones are destoryed. The aim is to treat infrastructure as code, i.e. to build the infrastructure components to an exact set of specifications. If a change to a specification is required, then a whole new set of infrastructure is provisioned based on the updated requirements, and the previous infrastructure is taken out of service as it is obsolete

Treating your infrastructure as code allows for automated testing, version control and continuous integration. Servers evolve over time and configuration drift often leads to the creation of unique servers (snowflakes). The immutable approach prevents from that configuration drift: e.g. instead of selectively rolling out a security patch (and potentially missing a few instances), the patching can be integrated into a new image with old instances being replaced by patched versions. Rebuilding instances from a base image enables an instance’s configuration to be in a known state. This decreases operational complexity when outages occur or roll backs are required. The use of configuration management tools such as Chef or Ansible helps to avoid "snowflake servers" by automating the specification of how servers should be configured. Development-production parity is achieved, as immutable images make it easier to mirror production to staging and development environments

Immutable infrastructure benefits include lower IT complexity and failures, improved security and easier troubleshooting than on mutable infrastructure. It provides higher scalability and availability, more consistent (predictable and repeatable) deployments across environments and decreased operations intervention. It eliminates server patching and configuration changes.

The main benefit of this approach is the clear view on the state of a server once it has been provisioned (the state is siloed). There are clear boundaries between layers storing state and the layers that are ephemeral. It is important to precisely separate persistent from volatile data and ensure that the right data is being persisted. This clarifies the application design and it ensures that there is no additional cost of persisting data unnecessarily, it also simplifies the process of discarding out-of-date data.

Since deployments are done by building new images, the history is automatically preserved for rollback. There is also no access to the servers, so it forces to collect logs and system metrics externally, which is a better approach. Logs are preserved across deployments so they can be retrospectively investigated. The best way is to ship all logs straight off to a central server using something like `rsyslog`.

Immutable infrastructure aligns well with the [Phoenix Server Approach](https://martinfowler.com/bliki/PhoenixServer.html), i.e. regularly recreating servers from scratch.

On the downside,  system upgrades may be slower because creating servers from scratch takes more time while any additional change to a server requires a redeploy as it is impossible to update them in-place.







