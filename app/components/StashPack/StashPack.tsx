import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import Button from '../Button/Button';

import Styles, { STACH_PACK_WIDTH } from './StashPack.styles';
import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

interface Props extends TStash {
  onPress: (packetId: string) => void;
}

const BUTTON_WIDTH = STACH_PACK_WIDTH * 0.4 - Metrics.basePadding * 2;

const StashPack = ({
  grantedForFree,
  onPress,
  packetId,
  packName,
  packActivationsRemaining,
}: Props) => {
  const handlePress = () => {
    onPress(packetId);
  };
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      onPress={handlePress}
      underlayColor={Colors.transparent}
    >
      <View style={Styles.container}>
        <View style={Styles.labelColumn}>
          <View style={Styles.packNameBlock}>
            <Text style={Styles.packName}>{packName}</Text>
          </View>
          <View style={Styles.info}>
            <View style={Styles.typeColumn}>
              <Text style={Styles.type}>{grantedForFree ? 'Free from us!' : 'Purchased'}</Text>
            </View>
            {packActivationsRemaining && packActivationsRemaining > 1 && (
              <View style={Styles.remainingColumn}>
                <Text style={Styles.remaining}>{`${packActivationsRemaining} remaining`}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={[Styles.buttonColumn]}>
          <Button
            onPress={handlePress}
            id={`Start Stash ${packName}`}
            label="Start"
            smallButton
            width={BUTTON_WIDTH}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

StashPack.defaultProps = {
  grantedForFree: false,
};

export default StashPack;
