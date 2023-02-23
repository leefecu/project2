import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  Reactotron.configure({ name: 'DataClock' })
    .setAsyncStorageHandler(AsyncStorage)
    .useReactNative()
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  console.tron = Reactotron;
}
