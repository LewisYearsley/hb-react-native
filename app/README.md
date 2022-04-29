# React Native Challenge

## Getting started

### Clone this repo

```bash
git clone git@github.com:LewisYearsley/hb-react-native.git
cd hb-react-native # instructions assume you are in this folder
```

## Prerequisites

In order to run the application you need the `server` (or the real API) running first.

Please follow the instructions in the `server` repo.

### Set up your development environment

Follow the instructions [here](https://reactnative.dev/docs/environment-setup) to set up your development environment for either iOS or Android.

For Android, make sure you have Android Studio [installed](https://developer.android.com/studio) - with Android SDK 11.0 (R) package, including Android SDK Platform 30 (post install setup - `More Actions` -> `SDK Manager`. Check `Show Package Details` for more info).
Once installed create a Virtual Device (`More Actions` -> `Virtual Device Manager`) - this will be needed to run an emulator.

### Install packages

```bash
yarn install
```

### iOS only: Install CocoaPods

```bash
npx pod-install ios # this may take a while
```

### Run Metro

```bash
yarn start
```

If you have problems with port numbers you can try:

```bash
yarn start --port=1234
```

### Run the app on an Android Emulator

Make sure an emulator is running (`Android Studio` -> `Virtual Device Manager` -> `'Play' button for a device`).

```bash
yarn android
```

If you have problems with port numbers you can try:

```bash
yarn android --port=1234
```

### Run the app on an iOS Simulator

```bash
yarn run ios
```

## Testing

### Running tests

There are a number of test scripts defined in [package.json](package.json):

```bash
npm run test              # runs all tests once
npm run test:watch        # runs tests for changed (uncommitted) code
npm run test:coverage     # runs all tests and produces a test coverage report
```
