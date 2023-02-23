import React, { PureComponent } from 'react';
import { Linking, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import ErrorModal from '../../components/ErrorModal/ErrorModal';
import PopupModal from '../../components/PopupModal/PopupModal';

import { LINKS } from '../../constants/Links';
import { ERROR_MESSAGES } from '../../constants/Messages';

import { testProps } from '../../helpers/general';

import CloseButtonSVG from '../../images/exit.svg';

import Styles from './TandC.styles';
import Colors from '../../themes/Colors';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  showError: boolean;
}

class TandC extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const closeModal = () => navigation.goBack();
    return {
      title: 'Terms and Conditions',
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        color: Colors.white,
        fontWeight: 'bold',
        fontFamily: 'CircularPro-Bold',
        textAlign: 'center',
      },
      headerLeft: (
        <TouchableHighlight
          activeOpacity={0.5}
          onPress={closeModal}
          style={Styles.closeButton}
          underlayColor={Colors.transparent}
          {...testProps('Close Button')}>
          <CloseButtonSVG />
        </TouchableHighlight>
      ),
    };
  };

  constructor(props: Props) {
    super(props);

    this.state = { showError: false };
  }

  closeErrorModal = () => {
    this.setState({ showError: false });
  };

  openLink = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported: boolean) => {
        if (supported) {
          return Linking.openURL(url);
        }
        this.setState({ showError: true });
      })
      .catch(() => {
        this.setState({ showError: true });
      });
  };

  openPayMonthlyPlan = () => {
    this.openLink(LINKS.PAY_MONTHLY_PLAN);
  };

  openPrepayPlan = () => {
    this.openLink(LINKS.PREPAY);
  };

  openHelpAndSupport = () => {
    this.openLink(LINKS.HELP);
  };

  openTermsOfUse = () => {
    this.openLink(LINKS.TERMS_OF_USE);
  };

  openTermsAndConditions = () => {
    this.openLink(LINKS.TERMS_AND_CONDITIONS);
  };

  render() {
    const { showError } = this.state;

    return (
      <View style={Styles.container}>
        <ScrollView>
          <PopupModal visible={showError}>
            {showError && (
              <ErrorModal
                closeButtonLabel={ERROR_MESSAGES.GENERIC.errorButtonLabel}
                headerLabel={ERROR_MESSAGES.GENERIC.errorTitle}
                message={ERROR_MESSAGES.GENERIC.errorMessage}
                onClose={this.closeErrorModal}
              />
            )}
          </PopupModal>
          <View style={Styles.header}>
            <View style={Styles.headerLine} />
            <View style={Styles.headerTextWrapper}>
              <Text style={Styles.headerText}>WHO’S ELIGIBLE?</Text>
            </View>
          </View>
          <View style={Styles.contentBlock}>
            <Text style={Styles.tandcText}>
              Customers on one of our current{' '}
              <Text onPress={this.openPayMonthlyPlan} style={Styles.link}>
                Pay Monthly Carryover Plans
              </Text>{' '}
              or{' '}
              <Text onPress={this.openPrepayPlan} style={Styles.link}>
                Prepay
              </Text>
              . If you’re on either of these and still getting an error message, you might not have
              the right permissions on your account. Give the top dog of your account a call, they
              should be able to get this sorted by calling 200. You can find out more{' '}
              <Text onPress={this.openHelpAndSupport} style={Styles.link}>
                here
              </Text>
            </Text>
          </View>

          <View style={Styles.header}>
            <View style={Styles.headerLine} />
            <View style={Styles.headerTextWrapper}>
              <Text onPress={this.openHelpAndSupport} style={Styles.headerText}>
                TERMS OF USE
              </Text>
            </View>
          </View>
          <View style={Styles.contentBlock}>
            <Text style={Styles.tandcText}>
              By using the Data Clock App, you agree to the Data Clock App Terms of Use and the Data
              Clock Terms and Conditions.
            </Text>
          </View>
          <View style={Styles.contentBlock}>
            <Text style={Styles.tandcText}>
              For the Data Clock App Terms of Use click{' '}
              <Text onPress={this.openTermsOfUse} style={Styles.link}>
                here
              </Text>
            </Text>
          </View>
          <View style={Styles.contentBlock}>
            <Text style={Styles.tandcText}>
              For the Data Clock App Terms and Conditions click{' '}
              <Text onPress={this.openTermsAndConditions} style={Styles.link}>
                here
              </Text>
            </Text>
          </View>

          <View style={Styles.header}>
            <View style={Styles.headerLine} />
            <View style={Styles.headerTextWrapper}>
              <Text onPress={this.openHelpAndSupport} style={Styles.headerText}>
                FAIR USE POLICY APPLIES
              </Text>
            </View>
          </View>
          <View style={Styles.contentBlock}>
            <Text style={Styles.tandcText}>
              Max speeds reduce to 1 Mbps after 40GB/m per person & hotspotting speeds may be
              reduced during periods of network congestion. T&Cs apply.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TandC;
