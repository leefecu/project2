import { Text, View } from 'react-native';
import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import StashPack from './StashPack';
import Styles from '../../Stories.styles';

storiesOf('Component | StashPack', module).add('Default', () => {
  return (
    <View style={Styles.defaultBGContainer}>
      <View style={Styles.row}>
        <Text style={Styles.title}>With remaining count</Text>
        <StashPack
          onPress={action('onPress')}
          packetId="id1"
          packetInstanceId="id1"
          packName="1 hour"
          packActivationsRemaining={3}
        />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>Free</Text>
        <StashPack
          onPress={action('onPress')}
          packetId="id2"
          packetInstanceId="id2"
          packName="2 hours"
          grantedForFree
          packActivationsRemaining={1}
        />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>Free with remaining count</Text>
        <StashPack
          onPress={action('onPress')}
          packetId="id2"
          packetInstanceId="id2"
          packName="2 hours"
          grantedForFree
          packActivationsRemaining={2}
        />
      </View>
    </View>
  );
});
