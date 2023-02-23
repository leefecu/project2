import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';

import TimePacks from './TimePacks';
import Styles from '../../Stories.styles';

import { PACKS } from '../../__testData__/offers';

storiesOf('Component | TimePacks', module).add('Default', () => {
  return (
    <View style={Styles.defaultBGContainer}>
      <View style={Styles.row}>
        <TimePacks packs={PACKS} />
      </View>
    </View>
  );
});
