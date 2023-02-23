import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Input from './Input';
import Styles from '../../Stories.styles';

storiesOf('Component | Input', module).add('Primary', () => {
  return (
    <View style={Styles.containerWithBG}>
      <View style={Styles.row}>
        <Text style={Styles.title}>Default</Text>
        <Input
          clearText={action('clear text')}
          number=""
          onUpdate={action('update number')}
          placeholder="Enter mobile number"
        />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>with number</Text>
        <Input
          clearText={action('clear text')}
          number="+62 22 1234 5678"
          onUpdate={action('update number')}
          placeholder="Enter mobile number"
        />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>with error</Text>
        <Input
          clearText={action('clear text')}
          invalid={true}
          number="09 373 5"
          onUpdate={action('update number')}
          placeholder="Enter mobile number"
        />
      </View>
    </View>
  );
});
