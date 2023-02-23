import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';

import PrepayBalance from './PrepayBalance';
import Styles from '../../Stories.styles';

storiesOf('Component | PrepayBalance', module).add('Default', () => {
  return (
    <View style={Styles.containerWithBG}>
      <View style={Styles.row}>
        <Text style={Styles.title}>Default</Text>
        <PrepayBalance balance={30.98} loading={false} />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>Error</Text>
        <PrepayBalance balance={-1} loading={false} />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>Loading</Text>
        <PrepayBalance balance={30.98} loading={true} />
      </View>
    </View>
  );
});
