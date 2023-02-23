import React from 'react';
import { Text, View } from 'react-native';

import Button from '../Button/Button';

import Styles, { FREE_DATA_HOUR_WIDTH } from './FreeDataHour.styles';
import ClockSVG from '../../images/clockOn.svg';
import Metrics from '../../themes/Metrics';

interface Props {
  onStart: () => void;
  title: string;
}

const BUTTON_WIDTH = FREE_DATA_HOUR_WIDTH - Metrics.doublePadding * 2;

const FreeDataHour = ({ onStart, title }: Props) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.iconRow}>
        <ClockSVG style={Styles.icon} />
      </View>
      <View style={Styles.labelRow}>
        <Text style={Styles.label}>{title}</Text>
      </View>
      <View style={Styles.buttonRow}>
        <Button
          onPress={onStart}
          id={`Start Free Data Hour ${title}`}
          label='Start the clock'
          width={BUTTON_WIDTH}
        />
      </View>
    </View>
  );
};

export default FreeDataHour;
