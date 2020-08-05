+++
title = "Setup Firebase in Flutter (Visual Guide)"
[taxonomies]
topics = [ "Flutter", "Dart", "Firebase" ]
+++

**Last updated**: 2020-07-25

This guide was tested on Flutter `1.17.5`.

```
Flutter 1.17.5 • channel stable • https://github.com/flutter/flutter.git
Framework • revision 8af6b2f038 (4 weeks ago) • 2020-06-30 12:53:55 -0700
Engine • revision ee76268252
Tools • Dart 2.8.4
```

## Firebase Account Setup

### Create Firebase Project

![Firebase Project](../firebase-01.png)

### Set Project's Name

![Firebase Project](../firebase-02.png)

### Configure Firebase Analytics

![Firebase Project](../firebase-03.png)

![Firebase Project](../firebase-04.png)

![Firebase Project](../firebase-05.png)

### Select Your Target: iOS or Android

![Firebase Project](../firebase-07.png)

### Register App

![Firebase Project](../firebase-08.png)

### Download Firebase Config File

![Firebase Project](../firebase-09.png)

### Add Firebase SDK

![Firebase Project](../firebase-10.png)

In `android/build.gradle` (root-level / project-level)

```jsx
buildscript {

    repositories {
      // Check that you have the following line (if not, add it):
      google()  // Google's Maven repository
    }

    // ...

    dependencies {
      // ...

      // Add the following line:
      classpath 'com.google.gms:google-services:4.3.3'  // Google Services plugin
    }
}

allprojects {
    // ...

    repositories {
      // Check that you have following line (if not, add it):
      google()  // Google's Maven repository
      // ...
    }
}
```

In `android/app/build.gradle` (app-level)

```jsx
// Add the following line:
apply plugin: 'com.google.gms.google-services'  // Google Services plugin

android {
  // ...
}

// ...
```

### Finalize Firebase Setup

![Firebase Project](../firebase-11.png)

## Setup Firestore Database

![Firebase Project](../firebase-12.png)

### Create Database

![Firebase Project](../firebase-13.png)

### Set Database Location

![Firebase Project](../firebase-14.png)

![Firebase Project](../firebase-15.png)

### Add Entries to Database

![Firebase Project](../firebase-16.png)

![Firebase Project](../firebase-17.png)

![Firebase Project](../firebase-18.png)

![Firebase Project](../firebase-19.png)

## Configure Your Flutter App


Add FlutterFire plugin to `pubspec.yaml`

```yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_core:
  cloud_firestore:
```

Run `flutter packages get`.

## Troubleshootings

### Error `Plugin project :firebase_core_web not found`

Add the following content to `android/app/settings.gradle`:

```groovy
def flutterProjectRoot = rootProject.projectDir.parentFile.toPath()

def plugins = new Properties()
def pluginsFile = new File(flutterProjectRoot.toFile(), '.flutter-plugins')
if (pluginsFile.exists()) {
    pluginsFile.withReader('UTF-8') { reader -> plugins.load(reader) }
}

plugins.each { name, path ->
    def pluginDirectory = flutterProjectRoot.resolve(path).resolve('android').toFile()
    include ":$name"
    project(":$name").projectDir = pluginDirectory
}
```

([Reference](https://github.com/FirebaseExtended/flutterfire/issues/2599))

### Error `D8: Cannot fit requested classes in a single dex file`

Enable multidex support by adjusting `android/app/bundle.gradle`:

```jsx
android {

    defaultConfig {
        ...

        // Enabling multidex support.
        multiDexEnabled true
    }
    ...
}
```