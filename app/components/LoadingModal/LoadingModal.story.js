import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';

import LoadingModal from './LoadingModal';
import Styles from '../../Stories.styles';

storiesOf('Component | LoadingModal', module).add('Primary', () => {
  return (
    <View style={Styles.containerWithBG}>
      <View style={Styles.row}>
        <Text style={Styles.title}>HUH</Text>
        <LoadingModal />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>OOPS</Text>
        <LoadingModal />
      </View>
    </View>
  );
});
