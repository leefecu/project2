import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import FreeDataHour from './FreeDataHour';
import Styles from '../../Stories.styles';

storiesOf('Component | FreeDataHour', module).add('Default', () => {
  return (
    <View style={Styles.containerWithBG}>
      <View style={Styles.row}>
        <FreeDataHour onStart={action('onStart')} title="Free Data Hour" />
      </View>
    </View>
  );
});
