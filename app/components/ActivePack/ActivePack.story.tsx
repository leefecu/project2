import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ActivePack from './ActivePack';
import Styles from '../../Stories.styles';

storiesOf('Component | ActivePack', module).add('Default', () => {
  const now = new Date();
  const startTime = now.getTime();
  const endTime = now.getTime() + 60000;
  return (
    <View style={Styles.container}>
      <View style={Styles.row}>
        <ActivePack
          duration={1}
          startTime={startTime}
          endTime={endTime}
          packTitle="1 minute"
          onTimerComplete={action('onTimerComplete')}
        />
      </View>
    </View>
  );
});
