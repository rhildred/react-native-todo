<a href="https://github.com/rhildred/react-native-todo" target="_blank">This is an app</a> that runs on a device using expo and in a browser using react-native-web.

1. `npm install -g yarn` (if you haven't already)
1. navigate to a new folder in your editor and run `git clone https://github.com/rhildred/react-native-todo.git .`
1. `npm install`
1. `yarn web`
1. surf to http://localhost:8080 in your browser to see the code on the web
1. in another window run `exp start` to see your code on your phone using the expo app.

### react-native-web

![the web setup](https://rhildred.github.io/react-native-todo/READMEImages/IMG_20180612_105314152.jpg "the web setup")

### react-native with expo

![the expo setup](https://rhildred.github.io/react-native-todo/READMEImages/IMG_20180612_105337772.jpg "the expo setup")

### wrapped in a normal android app

![the expo setup](https://rhildred.github.io/react-native-todo/READMEImages/IMG_20180612_105349178.jpg "the expo setup")

## To build this app for standalone use

Edit the app.json file:

```

{
  "expo": {
    "sdkVersion": "25.0.0",
    "name": "React Native Todo",
    "icon": "./images/yinyang.png",
    "version": "1.0.0",
    "slug": "react-native-todo",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourappname"
    },
    "android": {
      "package": "io.github.rhildred"
    }
  }
}

```

Pay special attention to the package. You can't have 2 that are the same.

Make a 1024px square image for your app. Expo will generate all of the different sizes required for different contexts.

Run `exp build:android` in a command prompt. I let it make a key file to sign my app.

In another command prompt run `exp build:status`. When it is done it will give you a url to the apk file. I found that the URL for monitoring the build didn't work. As well the waiting for the build to complete never worked.

If you need the keystore used to sign your app, download it with `exp fetch:android:keystore`.

