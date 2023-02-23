import React, { createRef, Fragment, PureComponent } from 'react';
import NetInfo from '@react-native-community/netinfo';
import SmsRetriever from 'react-native-sms-retriever';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import {
  AppState,
  AppStateStatus,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import get from 'lodash/get';
import throttle from 'lodash/throttle';

import Button from '../../components/Button/Button';
import CodeInput, {
  EMPTY_PLACEHOLDER,
  OPT_DIGIT_COUNT,
} from '../../components/CodeInput/CodeInput';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import PopupModal from '../../components/PopupModal/PopupModal';

import { TERROR_MESSAGE, ERROR_MESSAGES, ERROR_CODE } from '../../constants/Messages';
import { DEFAULT_COOLDOWN_PERIOD, THROTTLING } from '../../constants/Shared';

import { getFormattedMobileNumber } from '../../helpers/format';
import { getErrorMessage } from '../../helpers/Messages';
import { testProps } from '../../helpers/general';
import * as Device from '../../helpers/Device';
import * as Storage from '../../helpers/Storage';

import Styles from './EnterCode.styles';
import Colors from '../../themes/Colors';

import BackSVG from '../../images/back.svg';
import WarningSVG from '../../images/warning.svg';

import API from '../../services/Api';

const api = API.create();

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  code: string;
  errorButtonLabel: string;
  errorMessage: string;
  errorTitle: string;
  hasError: boolean;
  formValid: boolean;
  processing: boolean;
  retryLeft: number;
  success: boolean;
  userLocked: boolean;
}

interface SMSEvent {
  message: string;
}

class MobileNumber extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const goBack = () => navigation.goBack();
    return {
      title: 'Text code',
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        color: Colors.white,
        fontWeight: 'bold',
        fontFamily: 'CircularPro-Bold',
      },
      headerLeft: (
        <TouchableHighlight
          activeOpacity={0.5}
          onPress={goBack}
          style={Styles.backButton}
          underlayColor={Colors.transparent}
          {...testProps('Back Button To Enter Mobile')}
        >
          <BackSVG />
        </TouchableHighlight>
      ),
    };
  };

  codeInput = createRef<CodeInput>();

  sendTextAgainThrottled: () => void;

  submitThrottled: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
      errorButtonLabel: '',
      errorMessage: '',
      errorTitle: '',
      hasError: false,
      formValid: false,
      processing: false,
      retryLeft: -1,
      success: false,
      userLocked: false,
    };

    this.sendTextAgainThrottled = throttle(this.sendTextAgain, THROTTLING, { trailing: false });
    this.submitThrottled = throttle(this.submit, THROTTLING, { trailing: false });
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      AppState.addEventListener('change', this.handleAppStateChange);
      try {
        this.handleSMS();
      } catch (error) {
        // Todos
      }
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  closeErrorModal = () => {
    this.setState({
      errorButtonLabel: '',
      errorMessage: '',
      errorTitle: '',
      hasError: false,
    });
  };

  isCodeValid = (code: string): boolean =>
    code.replace(new RegExp(EMPTY_PLACEHOLDER, 'g'), '').length === OPT_DIGIT_COUNT &&
    !Number.isNaN(Number(code));

  handleCodeUpdate = (code: string) => {
    this.setState({ code, formValid: this.isCodeValid(code) });
  };

  handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      this.handleSMS();
    }
  };

  handleSMS = async () => {
    SmsRetriever.removeSmsListener();
    const registered = await SmsRetriever.startSmsRetriever();
    if (registered) {
      SmsRetriever.addSmsListener((event: SMSEvent) => {
        const message = get(event, 'message', '');
        if (message) {
          const code = message.match(/\d\d\d\d\d/);
          if (code && code.length > 0) {
            // need to activate Continue button once auto-filled
            this.setState({ code: code[0], formValid: true });
          }
        }
      });
    }
  };

  lockUser = () => {
    this.setState({
      ...ERROR_MESSAGES.TOO_MANY_ATTEMPT,
      hasError: true,
    });
  };

  navigateBackToEnterNumber = () => {
    const { navigation } = this.props;
    this.setState({ hasError: false }, () => {
      SmsRetriever.removeSmsListener();
      navigation.goBack();
    });
  };

  sendTextAgain = async () => {
    const { navigation } = this.props;
    const netState = await NetInfo.fetch();
    const simIn = await Device.isSimIn();
    const number = navigation.getParam('number', '');
    if (netState.isConnected && simIn) {
      try {
        this.setState({ processing: true }, async () => {
          const response = await api.getOTP(number);
          if (response.ok) {
            this.handleSMS();
            this.setState({ processing: false, hasError: false });
          } else {
            const errorCode: ERROR_CODE = get(response, 'data.errorCode');
            const errors: TERROR_MESSAGE = getErrorMessage(errorCode);
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
        });
      } catch (e) {
        this.setState({ processing: false, hasError: true, ...ERROR_MESSAGES.GENERIC });
      }
    } else {
      this.setState({ hasError: true, ...ERROR_MESSAGES.OFFLINE });
    }
  };

  submit = async () => {
    const { navigation } = this.props;
    const { code, retryLeft } = this.state;
    const number = navigation.getParam('number', '');
    const upgrade = navigation.getParam('upgrade', false);
    const netState = await NetInfo.fetch();
    const simIn = await Device.isSimIn();

    Keyboard.dismiss();
    if (netState.isConnected && simIn) {
      this.setState({ processing: true });

      try {
        const response = await api.verifyOTP(code, number);
        if (response.ok) {
          const paymentType = get(response, 'data.paymentType');
          const result = await Storage.register(response.data);
          if (result) {
            this.setState({ processing: false }, () => {
              navigation.navigate('Stacks', { paymentType, upgrade });
            });
          } else {
            this.setState({
              processing: false,
              hasError: true,
              ...ERROR_MESSAGES.GENERIC,
            });
          }
        } else {
          const errorCode: ERROR_CODE = get(response, 'data.errorCode');
          const errors: TERROR_MESSAGE = getErrorMessage(errorCode);
          const newRetryLeft =
            errorCode === ERROR_CODE.INVALID_PASSCODE
              ? get(response, 'data.retryLeft', retryLeft)
              : retryLeft;
          this.setState({
            processing: false,
            hasError: true,
            retryLeft: newRetryLeft,
            userLocked: newRetryLeft === 0,
            ...(newRetryLeft === 0 ? ERROR_MESSAGES.TOO_MANY_ATTEMPT : errors),
          });
        }
      } catch (e) {
        this.setState({ processing: false, hasError: true, ...ERROR_MESSAGES.GENERIC });
      }
    } else {
      this.setState({ hasError: true, ...ERROR_MESSAGES.OFFLINE });
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      code,
      errorButtonLabel,
      errorMessage,
      errorTitle,
      formValid,
      hasError,
      processing,
      retryLeft,
      success,
      userLocked,
    } = this.state;
    const number = navigation.getParam('number', '');

    return (
      <KeyboardAvoidingView style={Styles.container}>
        <ScrollView
          contentContainerStyle={Styles.innerContainer}
          keyboardShouldPersistTaps='handled'
        >
          <PopupModal visible={hasError || processing}>
            {hasError && (
              <ErrorModal
                closeButtonLabel={errorButtonLabel}
                headerLabel={errorTitle}
                message={errorMessage}
                onClose={userLocked ? this.navigateBackToEnterNumber : this.closeErrorModal}
              />
            )}
            {processing && <LoadingModal />}
          </PopupModal>
          {retryLeft === 1 ? (
            <View style={[Styles.fieldRow, Styles.textRow]}>
              <View style={Styles.icon} {...testProps('Too Many Attempt Warning Icon')}>
                <WarningSVG />
              </View>
              <Text style={[Styles.number, success && Styles.hiddenText]}>
                This is your last attempt before having to start the process again.
              </Text>
            </View>
          ) : (
            <View style={[Styles.fieldRow, Styles.textRow]}>
              <Text style={[Styles.generalText, success && Styles.hiddenText]}>
                We’ve sent a five-digit code to
              </Text>
              <Text style={[Styles.number, success && Styles.hiddenText]}>
                {getFormattedMobileNumber(number)}
              </Text>
              <Text style={[Styles.generalText, success && Styles.hiddenText]}>
                Please enter the five-digit code below.
              </Text>
            </View>
          )}
          <View style={Styles.fieldRow}>
            <CodeInput
              ref={this.codeInput}
              code={code}
              onUpdate={this.handleCodeUpdate}
              success={success}
            />
          </View>
          {!success && (
            <Fragment>
              <View style={Styles.fieldRow}>
                <Button
                  disabled={!formValid}
                  onPress={userLocked ? this.lockUser : this.submitThrottled}
                  id='Continue'
                  label='Continue'
                  withBG
                />
              </View>

              <View style={Styles.fieldRow}>
                <TouchableHighlight
                  activeOpacity={0.5}
                  onPress={this.sendTextAgainThrottled}
                  underlayColor={Colors.transparent}
                  {...testProps('Send text again')}
                >
                  <Text style={Styles.link}>Send text again</Text>
                </TouchableHighlight>
              </View>
            </Fragment>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default MobileNumber;
