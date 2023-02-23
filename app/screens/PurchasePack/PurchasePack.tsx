import React, { Fragment, PureComponent } from 'react';
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
import { ACTION_TYPE, PACK_TYPE, THROTTLING } from '../../constants/Shared';

import BackSVG from '../../images/back.svg';
import BigClockSVG from '../../images/bigClock.svg';

import Styles, { BUTTON_WIDTH } from './PurchasePack.styles';
import Colors from '../../themes/Colors';

import { getErrorMessage } from '../../helpers/Messages';
import { shouldLogout, testProps } from '../../helpers/general';
import * as API from '../../helpers/Api';
import * as Device from '../../helpers/Device';
import * as Storage from '../../helpers/Storage';

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

class PurchasePack extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const goBack = () => navigation.goBack();
    return {
      title: 'Pack select',
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
          onPress={goBack}
          style={Styles.closeButton}
          underlayColor={Colors.transparent}
          {...testProps('Back To Dashboard Button')}
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
    const packetId = navigation.getParam('packetId');
    const promoId = navigation.getParam('promoId');
    const netState = await NetInfo.fetch();
    const simIn = await Device.isSimIn();
    if (netState.isConnected && simIn) {
      try {
        if (packetId) {
          this.setState({ processing: true });
          const response = await API.purchasePack(packetId, promoId);
          const errorCode: ERROR_CODE = get(response, 'data.errorCode');
          const errors: TERROR_MESSAGE = getErrorMessage(errorCode, ACTION_TYPE.PURCHASE);
          if (response.status === 200) {
            if (promoId) {
              await Storage.removeFreeDataHourById(promoId);
            }
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
    const packName = navigation.getParam('packName');
    const price = Number(navigation.getParam('price'));
    const type = navigation.getParam('type');
    const buyButtonLabel = type === PACK_TYPE.TIME_PACK ? 'Buy now' : 'Start the clock';
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
            <BigClockSVG />
          </View>
          <View style={[Styles.row, Styles.infoRow]}>
            <View style={Styles.nameColumn}>
              <Text style={Styles.duration} {...testProps(`Pack Name ${packName}`)}>
                {packName}
              </Text>
            </View>
            <View style={Styles.priceColumn}>
              {price === 0 ? (
                <Text style={Styles.price} {...testProps('FREE PACK')}>
                  FREE
                </Text>
              ) : (
                <Fragment>
                  <Text style={Styles.dollar}>$</Text>
                  <Text
                    style={Styles.price}
                    {...testProps(`PACK PRICE ${Number(price).toFixed(2)}`)}
                  >
                    {Number(price).toFixed(2)}
                  </Text>
                </Fragment>
              )}
            </View>
          </View>
          <View style={Styles.button}>
            <Button
              onPress={this.handleStartPackThrottled}
              id={buyButtonLabel}
              label={buyButtonLabel}
              width={BUTTON_WIDTH}
              withBG
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PurchasePack;
