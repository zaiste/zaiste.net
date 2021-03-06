+++
title = "Mnesia"
+++

Mnesia was designed for replicating connection state between a hot-master telecom switch and its warm-standby switch, so that the warm standby can be instantly promoted to master.

Mnesia assumes OTP’s “distribution set” model (i.e. a static set of known operational relationships between nodes) rather than a clustering model.

Mnesia has no clustering support per se—you need to take down the whole Mnesia application across the distribution set and start it back up if you want to change its node membership.

