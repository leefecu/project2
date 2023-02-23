import React, { PureComponent } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import throttle from 'lodash/throttle';

import Button from '../../components/Button/Button';

import { THROTTLING } from '../../constants/Shared';

import { testProps } from '../../helpers/general';

import DataClockSVG from '../../images/dataClock.svg';
import SmalLogoSVG from '../../images/logoSmall.svg';

import Styles from './Welcome.styles';
import Colors from '../../themes/Colors';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class Welcome extends PureComponent<Props> {
  openTandCThrottled: () => void;
  navigateToMobilePageThrottled: () => void;

  constructor(props: Props) {
    super(props);

    this.navigateToMobilePageThrottled = throttle(this.navigateToMobileNumber, THROTTLING, {
      trailing: false,
    });
    this.openTandCThrottled = throttle(this.openTandC, THROTTLING, {
      trailing: false,
    });
  }

  navigateToMobileNumber = () => {
    const { navigation } = this.props;
    navigation.navigate('MobileNumber');
  };

  openTandC = () => {
    const { navigation } = this.props;
    navigation.navigate('TandCModal');
  };

  render() {
    return (
      <View style={Styles.container}>
        <StatusBar backgroundColor={Colors.primary} />
        <View style={Styles.textRow}>
          <Text style={Styles.welcomeText}>WELCOME TO</Text>
        </View>
        <View style={Styles.textRow}>
          <DataClockSVG />
        </View>
        <View style={Styles.textRow}>
          <Text style={Styles.buyText}>Buy data by the minute</Text>
        </View>
        <View style={Styles.buttonRow}>
          <Button
            withBG
            onPress={this.navigateToMobilePageThrottled}
            id='Get started'
            label='Get started'
          />
        </View>
        <View style={Styles.logoRow} {...testProps('Welcome Page Logo')}>
          <SmalLogoSVG />
        </View>
        <View style={Styles.tAndCRow}>
          <Text
            style={Styles.tAndC}
            onPress={this.openTandCThrottled}
            {...testProps('Open Terms And Condition')}
          >
            Terms & Conditions
          </Text>
        </View>
      </View>
    );
  }
}

export default Welcome;
