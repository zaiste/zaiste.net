
+++
date = 2017-10-09T00:00:00.000Z


title = "MacOS Change computer name"
topics = [ "macos", "osx" ]

+++

Use `scutil` to change a computer name in MacOS.

```
sudo scutil --set HostName <your-name>
```

This will change the name visible in `System Preferences -> Sharing` and on the command line.

You may also need to change `ComputerName` and `LocalHostName` variables:

```
sudo scutil --set ComputerName <your-name>
sudo scutil --set LocalHostName <your-name>
```

This corresponds to options available in `System Preferences -> Sharing @ Computer Name:` and `System Preferences -> Sharing -> Edit @ Local Hostname:`

You can check values for those variables using `--get`:

```
sudo scutil --get ComputerName
```
