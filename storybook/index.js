import SplashScreen from 'react-native-splash-screen';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

/* eslint-disable global-require */
configure(() => {
  require('../app/Stories');
  SplashScreen.hide();
}, module);
/* eslint-enable global-require */

const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
