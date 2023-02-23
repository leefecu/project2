import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import CodeInput from './CodeInput';
import Styles from '../../Stories.styles';

storiesOf('Component | CodeInput', module).add('Primary', () => {
  return (
    <View style={Styles.containerWithBG}>
      <View style={Styles.row}>
        <Text style={Styles.title}>Default</Text>
        <CodeInput code="" onUpdate={action('update number')} />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>with Code</Text>
        <CodeInput code="12345" onUpdate={action('update number')} />
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>successful</Text>
        <CodeInput code="12345" onUpdate={action('update number')} success={true} />
      </View>
    </View>
  );
});
