/**
 * @format
 */
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import App from './app/App';
import StorybookUI from './storybook';
import { name as appName } from './app.json';

const codePushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

const CodePushedApp = codePush(codePushOptions)(App);

AppRegistry.registerComponent(appName, () => (__DEV__ ? StorybookUI : CodePushedApp));
