import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import Button from '../Button/Button';

import { testProps } from '../../helpers/general';

import Styles, { TIME_PACK_WIDTH } from './TimePack.styles';
import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

interface Props extends TTimePack {
  onPress: (packetId: string) => void;
}

const BUTTON_WIDTH = TIME_PACK_WIDTH * 0.4 - Metrics.basePadding * 2;

const parsePrice = (price: number): string => (price === 0 ? 'Free' : `$${price.toFixed(2)}`);

const TimePack = ({
  disabled,
  messageBody,
  messageTitle,
  onPress,
  packName,
  packetId,
  price,
}: Props) => {
  const handlePress = () => {
    onPress(packetId);
  };
  return (
    <TouchableHighlight
      activeOpacity={disabled ? 1 : 0.5}
      onPress={handlePress}
      underlayColor={Colors.transparent}
      {...testProps(`Start Time Pack ${packName}`)}>
      <View style={Styles.container}>
        <View style={[Styles.labelColumn, disabled && Styles.disabledLabelColumn]}>
          <View style={Styles.packNameBlock}>
            <Text style={[Styles.packName, disabled && Styles.disabledText]}>{packName}</Text>
          </View>
          {disabled && <Text style={[Styles.disabledText, Styles.topupLabel]}>Top up to buy</Text>}
          {messageTitle !== '' && !disabled && (
            <View style={Styles.message}>
              <Text style={Styles.messageTitle}>{messageTitle}</Text>
              {messageBody && <Text style={Styles.messageBody}>{messageBody}</Text>}
            </View>
          )}
        </View>
        <View
          style={[
            Styles.buttonColumn,
            !!messageTitle && Styles.messageBG,
            disabled && Styles.disabledButtonColumn,
          ]}>
          <Button
            disabled={disabled}
            disregardDisablePress={true}
            onPress={handlePress}
            id={`Purchase Pack ${packName}`}
            label={parsePrice(price)}
            smallButton
            width={BUTTON_WIDTH}
            withBG={!disabled}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

TimePack.defaultProps = {
  disabled: false,
};

export default TimePack;
