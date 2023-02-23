import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';

import Timer, { LINE_CAP } from './Timer';
import Styles from '../../Stories.styles';
import Colors from '../../themes/Colors';

storiesOf('Component | Timer', module).add('Primary', () => {
  return (
    <ScrollView>
      <View style={Styles.defaultBGContainer}>
        <View style={Styles.row}>
          <Text style={Styles.title}>Hour</Text>
          <Timer
            size={240}
            width={15}
            backgroundWidth={15}
            fill={50}
            tintColor={Colors.primary}
            backgroundColor={Colors.skyBlue}
            arcSweepAngle={360}
            rotation={0}
            lineCap={LINE_CAP.ROUND}
            timeRemaining={5640}
          />
        </View>
        <View style={Styles.row}>
          <Text style={Styles.title}>Min</Text>
          <Timer
            size={240}
            width={15}
            backgroundWidth={15}
            fill={33}
            tintColor={Colors.primary}
            backgroundColor={Colors.skyBlue}
            arcSweepAngle={360}
            rotation={0}
            lineCap={LINE_CAP.ROUND}
            timeRemaining={18 * 60}
          />
        </View>
      </View>
    </ScrollView>
  );
});
