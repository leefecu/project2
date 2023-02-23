import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Button from './Button';
import Metrics from '../../themes/Metrics';
import Styles from '../../Stories.styles';

const BUTTON_WIDTH = Metrics.width - Metrics.doublePadding * 2;
const SMALL_BUTTON_WIDTH = Metrics.width / 2;

storiesOf('Component | Button', module)
  .add('Primary', () => {
    return (
      <View style={Styles.container}>
        <View style={Styles.row}>
          <Text style={Styles.title}>Default</Text>
          <Button
            onPress={action('clicked-text')}
            id="Get Started"
            label="Get Started"
            width={BUTTON_WIDTH}
          />
        </View>
        <View style={Styles.row}>
          <Text style={Styles.title}>Disabled</Text>
          <Button
            onPress={action('clicked-text')}
            id="Get Started"
            label="Get Started"
            width={BUTTON_WIDTH}
            disabled
          />
        </View>
      </View>
    );
  })
  .add('Primary with Background', () => {
    return (
      <View style={Styles.containerWithBG}>
        <View style={Styles.row}>
          <Text style={Styles.title}>Default</Text>
          <Button
            onPress={action('clicked-text')}
            id="Get Started"
            label="Get Started"
            width={BUTTON_WIDTH}
            withBG
          />
        </View>
        <View style={Styles.row}>
          <Text style={Styles.title}>Disabled</Text>
          <Button
            onPress={action('clicked-text')}
            id="Get Started"
            label="Get Started"
            width={BUTTON_WIDTH}
            disabled
            withBG
          />
        </View>
      </View>
    );
  })
  .add('Small button', () => {
    return (
      <View style={Styles.containerWithBG}>
        <View style={Styles.row}>
          <Text style={Styles.title}>Default</Text>
          <Button
            onPress={action('clicked-text')}
            id="Get Started"
            label="Get Started"
            smallButton
            width={SMALL_BUTTON_WIDTH}
          />
        </View>
        <View style={Styles.row}>
          <Text style={Styles.title}>Disabled</Text>
          <Button
            onPress={action('clicked-text')}
            id="Get Started"
            label="Get Started"
            width={SMALL_BUTTON_WIDTH}
            smallButton
            disabled
          />
        </View>
      </View>
    );
  })
  .add('Small button with Background', () => {
    return (
      <View style={Styles.containerWithBG}>
        <View style={Styles.row}>
          <Text style={Styles.title}>Default</Text>
          <Button
            onPress={action('clicked-text')}
            id="Get Started"
            label="Get Started"
            smallButton
            width={SMALL_BUTTON_WIDTH}
            withBG
          />
        </View>
        <View style={Styles.row}>
          <Text style={Styles.title}>Disabled</Text>
          <Button
            onPress={action('clicked-text')}
            id="Get Started"
            label="Get Started"
            width={SMALL_BUTTON_WIDTH}
            smallButton
            disabled
            withBG
          />
        </View>
      </View>
    );
  });
