# remote-jobs
In this project we are using the endpoints from the https://github.com/remotive-io/remote-jobs-api to display a list to remote jobs in react native.

## Installtion

Initial to set up the application you do need to install [node](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) in your local system.

Navigate to the root repository.
To install the package run the following command
```bash
yarn install 
```

Now you can start the project.

## Running

## Android
To start the application you should either have to connect your android mobile to PC and should have abd installed in the system.
Or You can run the application in Emulator.
```bash
yarn android
```
You can build the apk which is bundled by follow steps.
## Step 1
Run following the command in the root directory. By this it will the bundler by which you need not need to have the metro server running to run the application.
This file will be produced in the android/app/src/main/assets/index.android.bundle
```bash
yarn android:debugBundle
```
And then you need to navigate to the android directory by using the command
```bash
cd android
```
And then you can build the bundled apk by following command. This will the apk in following relative path android\app\build\outputs\apk\debug\app-debug.apk
```bash 
./gradlew assembleDebug
```

## IOS
To start the application in the ios you need to have macOS system. And to stepup system you can step mentioned in the [React native documention](https://reactnative.dev/docs/running-on-device).
You run application in the simultor by running the following command 
```bash
yarn ios
```

