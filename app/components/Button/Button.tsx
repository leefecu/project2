import React, { useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';

import { noop, testProps } from '../../helpers/general';

import Styles from './Button.styles';
import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

interface Props {
  disabled?: boolean;
  disregardDisablePress?: boolean;
  fixedWidth?: number;
  id: string;
  label: string;
  onPress: () => void;
  smallButton?: boolean;
  withBG?: boolean;
  width?: number;
}

const Button = ({
  disabled,
  disregardDisablePress,
  id,
  label,
  onPress,
  smallButton,
  withBG,
  width,
}: Props) => {
  const [buttonPressed, setPressed] = useState(false);
  const pressed = () => {
    setPressed(true);
  };
  const unPressed = () => {
    setPressed(false);
  };
  return (
    <TouchableHighlight
      activeOpacity={1}
      onPress={disabled && !disregardDisablePress ? noop : onPress}
      onShowUnderlay={pressed}
      onHideUnderlay={unPressed}
      underlayColor={disabled ? Colors.transparent : Colors.primaryDark}
      style={[
        { width },
        Styles.container,
        smallButton && Styles.smallButton,
        withBG && Styles.containerWithBG,
        buttonPressed && Styles.pressed,
        disabled && !withBG && Styles.disabled,
        disabled && withBG && Styles.disabledWithBG,
      ]}
      {...testProps(`${id} button`)}
    >
      <Text
        style={[
          Styles.label,
          smallButton && Styles.smallLabel,
          withBG && Styles.labelWithBG,
          buttonPressed && Styles.labelPressed,
          disabled && withBG && Styles.labelWithBGDisabled,
          disabled && !withBG && Styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </TouchableHighlight>
  );
};

Button.defaultProps = {
  containerWidth: Metrics.width,
  disabled: false,
  disregardDisablePress: false,
  id: '',
  label: '',
  onPress: noop,
  smallButton: false,
  withBG: false,
  width: 255,
};

export default Button;
