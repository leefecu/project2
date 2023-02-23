import React from 'react';
import Orientation from 'react-native-orientation';
import { Platform } from 'react-native';
import { useScreens } from 'react-native-screens';

import Router from './Router';
import './config/ReactotronConfig';

if (Platform.OS === 'ios') {
  useScreens();
}

Orientation.lockToPortrait();

export default () => <Router />;
