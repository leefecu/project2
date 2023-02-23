import React, { createRef, PureComponent } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import get from 'lodash/get';
import throttle from 'lodash/throttle';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import PopupModal from '../../components/PopupModal/PopupModal';

import { TERROR_MESSAGE, ERROR_MESSAGES, ERROR_CODE } from '../../constants/Messages';
import { ACTION_TYPE, DEFAULT_COOLDOWN_PERIOD, THROTTLING } from '../../constants/Shared';

import { getFormattedMobileNumber } from '../../helpers/format';
import { getErrorMessage } from '../../helpers/Messages';
import { testProps } from '../../helpers/general';
import * as Device from '../../helpers/Device';
import * as Storage from '../../helpers/Storage';

import Styles from './MobileNumber.styles';
import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

import ShinyPhoneSVG from '../../images/shinyPhone.svg';

import API from '../../services/Api';

const api = API.create();

const PHONE_NUMBER_REGEX = /^((00|\+)?642|\+?642|0?2\d)\d{6,9}$/;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  errorButtonLabel: string;
  errorMessage: string;
  errorTitle: string;
  hasError: boolean;
  formValid: boolean;
  number: string;
  numberInvalid: boolean;
  processing: boolean;
  text: string;
  upgrade: boolean;
}

const DEFAULT_TEXT = 'Enter the 2degrees mobile number you want to receive the data';

class MobileNumber extends PureComponent<Props, State> {
  static navigationOptions = () => ({
    title: 'Mobile number',
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      color: Colors.white,
      fontWeight: 'bold',
      fontFamily: 'CircularPro-Bold',
    },
    headerLeft: null,
  });

  input = createRef<Input>();

  handleSubmitThrottled: () => void;

  verifyNumberThrottled: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      errorButtonLabel: '',
      errorMessage: '',
      errorTitle: '',
      hasError: false,
      formValid: false,
      numberInvalid: false,
      number: '',
      processing: false,
      text: DEFAULT_TEXT,
      upgrade: false,
    };

    this.handleSubmitThrottled = throttle(this.submit, THROTTLING, { trailing: false });
    this.verifyNumberThrottled = throttle(this.verifyNumber, THROTTLING, { trailing: false });
  }

  async componentDidMount() {
    const alreadyUpgraded = await Storage.getUpgraded();
    // No need to autofill if already upgraded
    if (alreadyUpgraded) {
      return;
    }
    const { number, upgrade } = await Device.getExistingMsisdn();
    this.setState({ formValid: upgrade, number, upgrade });
  }

  closeErrorModal = () => {
    this.setState({
      errorButtonLabel: '',
      errorMessage: '',
      errorTitle: '',
      hasError: false,
    });
  };

  handleClearText = () => {
    this.setState({ formValid: false, number: '', numberInvalid: false });
    const textInput = get(this.input, 'current.textInput.current', null);
    if (textInput) {
      textInput.focus();
    }
  };

  handleNumberUpdate = (number: string) => {
    const { numberInvalid } = this.state;
    const formValid = PHONE_NUMBER_REGEX.test(number);
    this.setState({
      formValid,
      number,
      numberInvalid: numberInvalid === false ? numberInvalid : !formValid,
    });
  };

  openTandC = () => {
    const { navigation } = this.props;
    navigation.navigate('TandCModal');
  };

  submit = async () => {
    const { formValid, number } = this.state;
    const netState = await NetInfo.fetch();
    const simIn = await Device.isSimIn();
    Keyboard.dismiss();
    if (netState.isConnected && simIn) {
      if (formValid && number) {
        Alert.alert(
          'Is this the number you want?',
          getFormattedMobileNumber(number),
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => this.handleClearText(),
            },
            { text: 'Confirm', onPress: () => this.verifyNumberThrottled() },
          ],
          { cancelable: true },
        );
      }
    } else {
      this.setState({ hasError: true, ...ERROR_MESSAGES.OFFLINE });
    }
  };

  validateNumber = () => {
    const { number } = this.state;
    const numberInvalid = !PHONE_NUMBER_REGEX.test(number);
    this.setState({ numberInvalid });
  };

  verifyNumber = async () => {
    const { navigation } = this.props;
    const { number, upgrade } = this.state;

    this.setState({ processing: true });
    try {
      const response = await api.getOTP(number);
      if (response.ok) {
        this.setState({ processing: false }, () => {
          navigation.navigate('EnterCode', { number, upgrade });
        });
      } else {
        const errorCode: ERROR_CODE = get(response, 'data.errorCode');
        const errors: TERROR_MESSAGE = getErrorMessage(errorCode, ACTION_TYPE.REGISTER);
        if (errorCode === ERROR_CODE.TOO_MANY_ATTEMPT) {
          const cooldown = Number(get(response, 'data.cooldown', DEFAULT_COOLDOWN_PERIOD));
          const expiryTime = new Date().getTime() + cooldown;
          const blocked = await Storage.blockUser(expiryTime);
          if (blocked) {
            navigation.replace('SafetyLock');
          } else {
            this.setState({ processing: false, hasError: true, ...errors });
          }
        } else {
          this.setState({ processing: false, hasError: true, ...errors });
        }
      }
    } catch (e) {
      this.setState({ processing: false, hasError: true, ...ERROR_MESSAGES.GENERIC });
    }
  };

  render() {
    const {
      errorButtonLabel,
      errorMessage,
      errorTitle,
      hasError,
      formValid,
      numberInvalid,
      number,
      processing,
      text,
    } = this.state;
    return (
      <KeyboardAvoidingView
        style={Styles.container}
        behavior='position'
        enabled={Metrics.smallIOSDevice}
      >
        <ScrollView
          contentContainerStyle={Styles.innerContainer}
          keyboardShouldPersistTaps='handled'
        >
          <PopupModal visible={processing || hasError}>
            {hasError && (
              <ErrorModal
                closeButtonLabel={errorButtonLabel}
                headerLabel={errorTitle}
                message={errorMessage}
                onClose={this.closeErrorModal}
              />
            )}
            {processing && <LoadingModal />}
          </PopupModal>
          <View style={Styles.fieldRow}>
            <ShinyPhoneSVG />
          </View>
          <View style={[Styles.fieldRow, Styles.textRow]}>
            <Text style={Styles.generalText}>{text}</Text>
          </View>
          <View style={Styles.fieldRow} {...testProps('Enter Mobile Number Input')}>
            <Input
              ref={this.input}
              autoFocus={true}
              clearText={this.handleClearText}
              invalid={numberInvalid}
              number={number}
              onBlur={this.validateNumber}
              onUpdate={this.handleNumberUpdate}
              placeholder='Enter mobile number'
              returnKeyType='go'
            />
          </View>
          <View style={Styles.fieldRow}>
            <Button
              disabled={!formValid}
              onPress={this.handleSubmitThrottled}
              id='Conitinue'
              label='Continue'
              withBG
            />
          </View>
          <View style={Styles.fieldRow}>
            <Text style={Styles.smallText}>By continuing you agree to</Text>
            <Text
              style={Styles.tAndC}
              onPress={this.openTandC}
              {...testProps('Open Terms and Conditions')}
            >
              Terms & Conditions
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default MobileNumber;
