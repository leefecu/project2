import React, { PureComponent } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import get from 'lodash/get';
import noop from 'lodash/noop';
import throttle from 'lodash/throttle';
import firebase from 'react-native-firebase';

import Button from '../../components/Button/Button';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import PopupModal from '../../components/PopupModal/PopupModal';

import { TERROR_MESSAGE, ERROR_MESSAGES, ERROR_CODE } from '../../constants/Messages';
import { ACTION_TYPE, THROTTLING } from '../../constants/Shared';
import BackSVG from '../../images/back.svg';
import BalloonSVG from '../../images/balloon.svg';

import Styles, { BUTTON_WIDTH } from './ActivateStash.styles';
import Colors from '../../themes/Colors';

import { getErrorMessage } from '../../helpers/Messages';
import { shouldLogout, testProps } from '../../helpers/general';
import * as Device from '../../helpers/Device';
import * as API from '../../helpers/Api';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  errorButtonLabel: string;
  errorMessage: string;
  errorTitle: string;
  loggedOut: boolean;
  processing: boolean;
  showError: boolean;
}

class ActivateStash extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const closeModal = () => navigation.goBack();
    return {
      title: 'Pack confirmation',
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
          {...testProps('Back Button To Dashboard')}
        >
          <BackSVG />
        </TouchableHighlight>
      ),
    };
  };

  handleStartPackThrottled: () => void;
  notificationOpenedListener: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      errorButtonLabel: '',
      errorMessage: '',
      errorTitle: '',
      loggedOut: false,
      processing: false,
      showError: false,
    };

    this.notificationOpenedListener = noop;
    this.handleStartPackThrottled = throttle(this.startPack, THROTTLING, { trailing: false });
  }

  componentDidMount() {
    const { navigation } = this.props;
    // Need to navigate back to Dashboard if App opened from notification
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(() => {
      navigation.goBack();
    });
  }

  componentWillUnmount() {
    this.notificationOpenedListener();
  }

  closeErrorModal = () => {
    const { navigation } = this.props;
    const { loggedOut } = this.state;
    this.setState({ showError: false }, () => {
      if (loggedOut) {
        navigation.navigate('Auth');
      }
    });
  };

  startPack = async () => {
    const { navigation } = this.props;
    const stash = navigation.getParam('stash');
    const netState = await NetInfo.fetch();
    const simIn = await Device.isSimIn();
    if (netState.isConnected && simIn) {
      try {
        if (stash.packetInstanceId) {
          this.setState({ processing: true });
          const response = await API.activateStash(stash);
          const errorCode: ERROR_CODE = get(response, 'data.errorCode');
          const errors: TERROR_MESSAGE = getErrorMessage(errorCode, ACTION_TYPE.PURCHASE);
          if (response.status === 200) {
            this.setState({ processing: false });
            navigation.state.params.scrollToTop(true);
            navigation.goBack();
          } else if (response.status === 400) {
            this.setState({
              loggedOut: false,
              processing: false,
              showError: true,
              ...errors,
            });
          } else {
            const logoutUser = shouldLogout(response.status, errorCode);
            this.setState({
              loggedOut: logoutUser,
              processing: false,
              showError: true,
              ...ERROR_MESSAGES.GENERIC,
              errorButtonLabel: logoutUser ? 'Deregister' : ERROR_MESSAGES.GENERIC.errorButtonLabel,
            });
          }
        }
      } catch (e) {
        this.setState({ processing: false, showError: true, ...ERROR_MESSAGES.GENERIC });
      }
    } else {
      this.setState({ processing: false, showError: true, ...ERROR_MESSAGES.OFFLINE });
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      errorButtonLabel,
      errorMessage,
      errorTitle,
      loggedOut,
      processing,
      showError,
    } = this.state;
    const stash = navigation.getParam('stash');

    return (
      <View style={Styles.container}>
        <ScrollView>
          <PopupModal visible={showError || processing}>
            {showError && (
              <ErrorModal
                closeButtonLabel={errorButtonLabel}
                headerLabel={errorTitle}
                forLogout={loggedOut}
                message={errorMessage}
                onClose={this.closeErrorModal}
              />
            )}
            {processing && <LoadingModal />}
          </PopupModal>
          <View style={Styles.row}>
            <BalloonSVG />
          </View>
          <View style={Styles.row}>
            <Text style={Styles.duration} {...testProps('Stash Pack Name')}>
              {stash.packName}
            </Text>
          </View>
          <View style={Styles.button}>
            <Button
              onPress={this.handleStartPackThrottled}
              id='Activate Stash'
              label='Start the clock'
              width={BUTTON_WIDTH}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ActivateStash;
