import React, { PureComponent } from 'react';
import { Alert, AppState, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationDescriptor,
  SafeAreaView,
} from 'react-navigation';
import throttle from 'lodash/throttle';

import Styles from './SideMenu.styles';

import { THROTTLING } from '../../constants/Shared';

import { getLocalFormattedMobileNumber } from '../../helpers/format';
import { testProps } from '../../helpers/general';
import * as Storage from '../../helpers/Storage';

import Colors from '../../themes/Colors';

import ExitSVG from '../../images/exit.svg';

interface Props {
  descriptors: { [key: string]: NavigationDescriptor };
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  msisdn: string;
}

class SideMenu extends PureComponent<Props, State> {
  handleDeregisterThrottled: () => void;

  constructor(props: Props) {
    super(props);

    this.state = { msisdn: '' };

    this.handleDeregisterThrottled = throttle(this.handleDeregister, THROTTLING, {
      trailing: false,
    });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.getMsisdn();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleDeregister = () => {
    const { descriptors } = this.props;
    const deregister = descriptors.Dashboard.navigation.getParam('deregister');
    Alert.alert(
      'Deregister Data Clock?',
      'Doing this will remove any data you have purchased. After deregistration please restart your phone to continue to use data.',
      [
        {
          text: 'Go Back',
          style: 'cancel',
        },
        {
          text: 'Deregister',
          onPress: () => {
            deregister();
          },
        },
      ],
      { cancelable: true },
    );
  };

  getMsisdn = async () => {
    const msisdn = await Storage.getMsisdn();
    if (msisdn) {
      this.setState({ msisdn });
    }
  };

  handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
      this.getMsisdn();
    }
  };

  openTermsAndConditions = () => {
    const { navigation } = this.props;
    navigation.closeDrawer();
    navigation.navigate('TandCModal');
  };

  render() {
    const { navigation } = this.props;
    const { msisdn } = this.state;

    return (
      <ScrollView contentContainerStyle={Styles.container}>
        <SafeAreaView
          style={Styles.innerContainer}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <View style={Styles.body}>
            <View style={Styles.header}>
              <View style={Styles.closeButton}>
                <TouchableHighlight
                  activeOpacity={0.5}
                  onPress={navigation.closeDrawer}
                  underlayColor={Colors.transparent}
                  {...testProps('Close Side Menu Button')}
                >
                  <ExitSVG />
                </TouchableHighlight>
              </View>
              <View>
                <Text style={Styles.msisdn}>{getLocalFormattedMobileNumber(msisdn)}</Text>
              </View>
            </View>
            <View style={Styles.externalMenu}>
              <View style={Styles.linkRow}>
                <Text
                  onPress={this.openTermsAndConditions}
                  style={Styles.link}
                  {...testProps('Open Terms and Condition Button')}
                >
                  Terms and conditions
                </Text>
              </View>
              <View style={Styles.linkRow}>
                <Text
                  onPress={this.handleDeregisterThrottled}
                  style={Styles.link}
                  {...testProps('Deregister Button')}
                >
                  Deregister Data Clock
                </Text>
              </View>
            </View>
            <View style={Styles.footer}>
              <Text style={Styles.footerText}>{'\u00A9'} Two Degrees Mobile Limited 2019</Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default SideMenu;
