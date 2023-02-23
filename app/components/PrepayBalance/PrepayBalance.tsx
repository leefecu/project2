import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { testProps } from '../../helpers/general';

import Styles from './PrepayBalance.styles';

import Colors from '../../themes/Colors';

interface Props {
  balance: number;
  loading: boolean;
}

const PrepayBalance = ({ balance, loading }: Props) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.leftColumn}>
        <Text style={Styles.label}>Prepay balance</Text>
      </View>
      <View style={Styles.rightColumn}>
        {loading ? (
          <ActivityIndicator style={Styles.loadingIcon} size="small" color={Colors.white} />
        ) : (
          <Text style={Styles.balance} {...testProps('Prepay Balance')}>
            {balance !== -1 ? `$${balance.toFixed(2)}` : 'N/A'}
          </Text>
        )}
      </View>
    </View>
  );
};

PrepayBalance.defaultProps = {
  loading: false,
};

export default PrepayBalance;
