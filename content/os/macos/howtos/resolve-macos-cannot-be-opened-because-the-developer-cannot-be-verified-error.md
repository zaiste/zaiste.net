+++
title = "Resolve MacOS 'cannot be opened because the developer cannot be verified' error"
[taxonomies]
topics = [ "MacOS" ]
+++

1. Run the binary. You should see `Killed: 9` as output in the terminal.
1. Once the error happens, open the "Security & Privacy" control panel from System Preferences.
1. The `Security & Privacy` panel, `General` tab is updated with the info that the binary was prevented from running. Click `Allow Anyway`.
1. Run the binary again. This time a different prompt is shown. Click `Open` - the binary should run as you expect.