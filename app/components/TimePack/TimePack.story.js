import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import TimePack from './TimePack';
import Styles from '../../Stories.styles';

storiesOf('Component | TimePack', module).add('Default', () => {
  return (
    <View style={Styles.defaultBGContainer}>
      <View style={Styles.row}>
        <Text style={Styles.title}>15 minutes</Text>
        <TimePack
          duration={15}
          packName="15 minutes"
          onPress={action('onPress')}
          packetId="id1"
          price={0.4}
        />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>1 hour</Text>
        <TimePack
          duration={60}
          packName="1 hour"
          onPress={action('onPress')}
          packetId="id2"
          price={1}
        />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>with daily message</Text>
        <TimePack
          duration={180}
          packName="3 hours"
          onPress={action('onPress')}
          packetId="id2"
          price={5}
          messageBody="This is a testing packet level notification."
          messageTitle="Testing PACKET Notification"
        />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>disabled</Text>
        <TimePack
          duration={1200}
          packName="20 hours"
          onPress={action('onPress')}
          packetId="id3"
          price={1.5}
          disabled
        />
      </View>
    </View>
  );
});
