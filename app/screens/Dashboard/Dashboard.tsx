import React, { PureComponent, Fragment } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  ActivityIndicator,
  Alert,
  AppState,
  AppStateStatus,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  NavigationEvents,
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import get from 'lodash/get';
import noop from 'lodash/noop';
import throttle from 'lodash/throttle';
import firebase from 'react-native-firebase';
import { NotificationOpen } from 'react-native-firebase/notifications';

import ActivePack from '../../components/ActivePack/ActivePack';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import FreeDataHours from '../../components/FreeDataHour/FreeDataHours';
import PopupModal from '../../components/PopupModal/PopupModal';
import PrepayBalance from '../../components/PrepayBalance/PrepayBalance';
import StashList from '../../components/StashPack/StashList';
import TimePacks from '../../components/TimePack/TimePacks';

import {
  TERROR_MESSAGE,
  ERROR_MESSAGES,
  ERROR_CODE,
  EXPIRY_NOTIFICATION,
  LOGOUT_SUCCESS_MESSAGE,
  MIGRATION_NOTIFICATION,
} from '../../constants/Messages';
import {
  ACTION_TYPE,
  NOTIFICATION_CHANNEL_ID,
  PAYMENT_TYPE,
  PACK_TYPE,
  THROTTLING,
} from '../../constants/Shared';

import Styles from './Dashboard.styles';
import Colors from '../../themes/Colors';
import MenuSVG from '../../images/menu.svg';

import API from '../../services/Api';
import { getErrorMessage } from '../../helpers/Messages';
import { shouldLogout, systemCheck, testProps } from '../../helpers/general';
import * as NotificationHelpers from '../../helpers/Notification';
import * as Device from '../../helpers/Device';
import * as Storage from '../../helpers/Storage';

import Metrics from '../../themes/Metrics';

const api = API.create();
const notifications = firebase.notifications();
const IS_IOS = Platform.OS === 'ios';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  paymentType: PAYMENT_TYPE;
}

interface State {
  activePack: TActivePack | null;
  balance: number;
  errorButtonLabel: string;
  errorMessage: string;
  errorTitle: string;
  hasError: boolean;
  loadingBalance: boolean;
  loadingOffer: boolean;
  loggedOut: boolean;
  freeDataHours: Array<TFreeDataHour>;
  paymentType: PAYMENT_TYPE;
  processing: boolean;
  stashes: Array<TStash>;
  timePacks: Array<TTimePack>;
}

class Dashboard extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: 'Data Clock',
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      color: Colors.white,
      fontSize: Metrics.Fonts.small,
      fontWeight: 'bold',
      fontFamily: 'CircularPro-Bold',
    },
    headerLeft: (
      <TouchableHighlight
        activeOpacity={0.5}
        onPress={navigation.openDrawer}
        style={Styles.menuButton}
        underlayColor={Colors.transparent}
        {...testProps('Open Side Menu')}
      >
        <MenuSVG />
      </TouchableHighlight>
    ),
  });

  appState: AppStateStatus;

  handleDeregisterThrottled: () => void;

  notificationListener: () => void;

  notificationOpenedListener: () => void;

  scrollView: { current: null | ScrollView };

  scrollToTop: boolean;

  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    this.state = {
      activePack: null,
      balance: -1,
      errorButtonLabel: '',
      errorMessage: '',
      errorTitle: '',
      hasError: false,
      loadingBalance: true,
      loadingOffer: true,
      loggedOut: false,
      freeDataHours: [],
      paymentType: navigation.getParam('paymentType') || PAYMENT_TYPE.POSTPAID,
      processing: false,
      stashes: [],
      timePacks: [],
    };

    this.appState = AppState.currentState;
    this.handleDeregisterThrottled = throttle(this.handleDeregister, THROTTLING, {
      trailing: false,
    });
    this.notificationListener = noop;
    this.notificationOpenedListener = noop;
    this.scrollView = React.createRef();
    this.scrollToTop = false;

    const parent = navigation.dangerouslyGetParent();
    if (parent) {
      const upperParent = parent.dangerouslyGetParent();
      if (upperParent) {
        upperParent.setParams({
          deregister: this.handleDeregisterThrottled,
        });
      }
    }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const { paymentType } = this.state;
    const netState = await NetInfo.fetch();
    const simIn = await Device.isSimIn();
    const paymentTypeFromStorage: PAYMENT_TYPE = await Storage.getPaymentType();

    const upgrade = navigation.getParam('upgrade', false);

    AppState.addEventListener('change', this.handleAppStateChange);

    NotificationHelpers.createNotificationChannel();
    this.checkPermission();

    const { activePack, stashes, freeDataHours, timePacks } = await Storage.getPacks();
    if (timePacks && timePacks.length > 0) {
      this.setState({
        loadingOffer: false,
        activePack,
        stashes: stashes || [],
        freeDataHours: freeDataHours || [],
        timePacks,
      });
    }

    if (paymentTypeFromStorage && paymentTypeFromStorage !== paymentType) {
      this.setState({ paymentType: paymentTypeFromStorage });
    }
    if (netState.isConnected && simIn) {
      if (paymentTypeFromStorage === PAYMENT_TYPE.PREPAID || paymentType === PAYMENT_TYPE.PREPAID) {
        this.handleGetBalance();
      }
      this.handleGetOffer();
    } else {
      this.setState({
        hasError: true,
        loadingBalance: false,
        loadingOffer: false,
        ...ERROR_MESSAGES.OFFLINE,
      });
    }

    if (upgrade) {
      Storage.setUpgraded();
      Alert.alert(
        MIGRATION_NOTIFICATION.TITLE,
        MIGRATION_NOTIFICATION.MESSAGE,
        [
          {
            text: MIGRATION_NOTIFICATION.BUTTON,
          },
        ],
        { cancelable: false },
      );
    }
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.notificationListener();
    this.notificationOpenedListener();
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.createNotificationListeners();
    } else {
      this.requestPermission();
    }
  };

  createNotificationListeners = () => {
    this.notificationListener = notifications.onNotification(async notification => {
      notification.android.setChannelId(NOTIFICATION_CHANNEL_ID).setSound('default');
      // Display notification only when App is in background
      if (this.appState === 'background') {
        notifications.displayNotification(notification);
        const badgeCount = await notifications.getBadge();
        notifications.setBadge(badgeCount + 1);
      }
    });

    this.notificationOpenedListener = notifications.onNotificationOpened(
      async (notificationOpen: NotificationOpen) => {
        const { notification } = notificationOpen;
        const badgeCount = await notifications.getBadge();
        notifications.setBadge(badgeCount > 0 ? badgeCount - 1 : 0);
        notifications.removeDeliveredNotification(notification.notificationId);
      },
    );
  };

  closeErrorModal = () => {
    const { navigation } = this.props;
    const { loggedOut } = this.state;
    this.setState({ hasError: false }, () => {
      if (loggedOut) {
        // Need to remove all local notification upon deregister
        NotificationHelpers.clearAllExpiryNotification();
        navigation.navigate('Auth');
      }
    });
  };

  deregisterInProgress = () => {
    this.setState({ processing: true });
  };

  deregisterSuccess = () => {
    this.setState({
      hasError: true,
      loggedOut: true,
      processing: false,
      ...LOGOUT_SUCCESS_MESSAGE,
    });
  };

  displayError = (loggedOut: boolean = false) => {
    this.setState({
      hasError: true,
      loadingBalance: false,
      loadingOffer: false,
      loggedOut,
      processing: false,
      ...ERROR_MESSAGES.GENERIC,
      errorButtonLabel: loggedOut ? 'Deregister' : ERROR_MESSAGES.GENERIC.errorButtonLabel,
    });
  };

  handleAppStateChange = async (nextAppState: AppStateStatus) => {
    const { navigation } = this.props;
    const { loggedOut, paymentType } = this.state;
    this.appState = nextAppState;
    if (nextAppState === 'active') {
      // Clear badge count when app re-opens only for iOS
      // on iOS there is no way to clear badge count if user clear notification
      if (IS_IOS) {
        NotificationHelpers.clearBadgeCount();
      }
      const scheduledNotifications = await notifications.getScheduledNotifications();
      // If App is opened after Warning expiry notifcation received by user
      // need to clear all remaining notification
      if (
        scheduledNotifications &&
        scheduledNotifications.length === 1 &&
        scheduledNotifications[0].notificationId === EXPIRY_NOTIFICATION.EXPIRY_MESSAGE_ID
      ) {
        NotificationHelpers.clearAllExpiryNotification();
      }
      const userOnRoaming = await Device.checkForRoaming();
      if (userOnRoaming) {
        navigation.navigate('Roaming');
      } else {
        systemCheck(navigation);
        if (paymentType === PAYMENT_TYPE.PREPAID) {
          this.handleGetBalance();
        }
        this.handleGetOffer();
      }
    } else {
      if (loggedOut) {
        // Need to remove all local notification upon deregister
        NotificationHelpers.clearAllExpiryNotification();
        navigation.navigate('Auth');
      }
    }
  };

  handleDeregister = async () => {
    const { navigation } = this.props;
    const netState = await NetInfo.fetch();
    const simIn = await Device.isSimIn();
    if (netState.isConnected && simIn) {
      try {
        navigation.closeDrawer();
        this.deregisterInProgress();
        const response = await api.deregister();
        const errorCode = get(response, 'data.errorCode');
        if (response.ok) {
          await Storage.deregister();
          this.deregisterSuccess();
        } else {
          this.displayError(shouldLogout(response.status, errorCode));
        }
      } catch (e) {
        this.displayError();
      }
    } else {
      this.setState({ hasError: true, ...ERROR_MESSAGES.OFFLINE });
    }
  };

  handleGetBalance = async () => {
    try {
      const response = await api.getBalance();
      const errorCode = get(response, 'data.errorCode');
      const errors: TERROR_MESSAGE = getErrorMessage(errorCode, ACTION_TYPE.DASHBOARD);
      if (response.ok) {
        const balance = Number(get(response, 'data.balanceValue', 0));
        this.setState({ balance, loadingBalance: false });
      } else {
        const logoutUser = shouldLogout(response.status, errorCode);
        this.setState({
          hasError: true,
          loadingBalance: false,
          loadingOffer: false,
          loggedOut: logoutUser,
          processing: false,
          ...errors,
          errorButtonLabel: logoutUser ? 'Deregister' : errors.errorButtonLabel,
        });
      }
    } catch (e) {
      this.displayError();
    }
  };

  handleGetOffer = async () => {
    try {
      const response = await api.getOffers();
      const { paymentType: currentPaymentTYpe } = this.state;
      if (response.ok) {
        const activePack = get(response, 'data.activePack', null);
        const freeDataHours = get(response, 'data.freeDataHours', []);
        const timePacks = get(response, 'data.timePacks', []);
        const stashes = get(response, 'data.stash', []);
        const paymentType = get(response, 'data.paymentType');

        this.setState(
          {
            activePack,
            freeDataHours: freeDataHours || [],
            loadingOffer: false,
            stashes: stashes || [],
            paymentType,
            timePacks: timePacks || [],
          },
          () => {
            // Trigget get balance if payment type switched from postpaid to prepaid
            if (paymentType === PAYMENT_TYPE.PREPAID && paymentType !== currentPaymentTYpe) {
              this.handleGetBalance();
            }
          },
        );
      } else {
        const errorCode: ERROR_CODE = get(response, 'data.errorCode');
        const errors: TERROR_MESSAGE = getErrorMessage(errorCode, ACTION_TYPE.DASHBOARD);
        const logoutUser = shouldLogout(response.status, errorCode);
        this.setState({
          hasError: true,
          loadingBalance: false,
          loadingOffer: false,
          loggedOut: logoutUser,
          processing: false,
          ...errors,
          errorButtonLabel: logoutUser ? 'Deregister' : errors.errorButtonLabel,
        });
      }
    } catch (e) {
      this.displayError();
    }
  };

  reloadPacks = async () => {
    const { activePack, stashes, freeDataHours, timePacks } = await Storage.getPacks();
    const balance = await Storage.getBalance();
    if (this.scrollView.current && this.scrollToTop) {
      this.scrollView.current.scrollTo({ animated: false }, 0);
    }
    this.setState({
      activePack,
      balance: balance || -1,
      stashes: stashes || [],
      freeDataHours: freeDataHours || [],
      timePacks: timePacks || [],
    });
  };

  removeActivePack = async () => {
    // Need to remove all local notification when Active Pack runs out
    NotificationHelpers.clearAllExpiryNotification();
    await Storage.removeActivePack();
    this.setState({ activePack: null });
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.createNotificationListeners();
    } catch (error) {
      this.displayError();
    }
  };

  selectStash = (stash: TStash) => {
    const { navigation } = this.props;
    this.setScrollToTop(false);
    navigation.navigate('ActivateStash', { stash, scrollToTop: this.setScrollToTop });
  };

  selectPack = (pack: TTimePack, lowBalance: boolean) => {
    const { navigation } = this.props;
    const { paymentType } = this.state;
    if (paymentType === PAYMENT_TYPE.PREPAID && lowBalance) {
      this.setState({
        hasError: true,
        ...ERROR_MESSAGES.LOW_BALANCE,
      });
    } else {
      this.setScrollToTop(false);
      navigation.navigate('PurchasePack', {
        packetId: pack.packetId,
        packName: pack.packName,
        price: pack.price,
        scrollToTop: this.setScrollToTop,
        type: PACK_TYPE.TIME_PACK,
      });
    }
  };

  selectFreePack = (pack: TFreeDataHour) => {
    const { navigation } = this.props;
    this.setScrollToTop(false);
    navigation.navigate('PurchasePack', {
      packetId: pack.packetId,
      promoId: pack.promoId || '',
      packName: pack.packName,
      price: 0,
      scrollToTop: this.setScrollToTop,
      type: PACK_TYPE.FREE_PACK,
    });
  };

  setScrollToTop = (scrollToTop: boolean) => {
    this.scrollToTop = scrollToTop;
  };

  render() {
    const {
      activePack,
      balance,
      errorButtonLabel,
      errorMessage,
      errorTitle,
      freeDataHours,
      hasError,
      loadingBalance,
      loadingOffer,
      loggedOut,
      paymentType,
      processing,
      stashes,
      timePacks,
    } = this.state;
    return (
      <View
        style={[
          Styles.container,
          (paymentType === PAYMENT_TYPE.PREPAID || activePack) && Styles.prepaid,
        ]}
      >
        <NavigationEvents onWillFocus={this.reloadPacks} />
        <ScrollView contentContainerStyle={Styles.scrollView} ref={this.scrollView}>
          <PopupModal visible={hasError || processing}>
            {hasError && (
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
          {paymentType === PAYMENT_TYPE.PREPAID && (
            <View style={[Styles.prepayBalance, activePack && Styles.noMarginBottom]}>
              <PrepayBalance balance={balance} loading={loadingBalance} />
            </View>
          )}
          {loadingOffer ? (
            <View style={Styles.loadingIconWrapper} {...testProps('Loading Icon')}>
              <ActivityIndicator
                style={Styles.loadingIcon}
                size='large'
                color={Colors.loadingBlue}
              />
            </View>
          ) : (
            <Fragment>
              {activePack && !loggedOut ? (
                <ActivePack {...activePack} onTimerComplete={this.removeActivePack} />
              ) : (
                <View style={Styles.noActivePackContainer} {...testProps('No Active Pack')}>
                  <Text style={Styles.noActivePackText}>
                    No time on the clock.{'\n'}
                    Get more by choosing a pack below.
                  </Text>
                </View>
              )}
              <View style={Styles.innerContainer}>
                {freeDataHours.length > 0 && (
                  <View style={Styles.freeDataHour}>
                    <FreeDataHours
                      freeDataHours={freeDataHours}
                      onSelectPack={this.selectFreePack}
                    />
                  </View>
                )}
                {stashes.length > 0 && (
                  <View style={Styles.packContainer}>
                    <View style={Styles.header}>
                      <View style={Styles.headerLine} />
                      <View style={Styles.headerTextWrapper}>
                        <Text style={Styles.headerText}>MY STASH</Text>
                      </View>
                    </View>
                    <StashList stashes={stashes} onSelectStash={this.selectStash} />
                  </View>
                )}
                {timePacks.length > 0 && (
                  <View>
                    <View style={Styles.header}>
                      <View style={Styles.headerLine} />
                      <View style={Styles.headerTextWrapper}>
                        <Text style={Styles.headerText}>TIME PACKS</Text>
                      </View>
                    </View>
                    <TimePacks
                      balance={balance}
                      disableOnBalance={paymentType === PAYMENT_TYPE.PREPAID && balance !== -1}
                      onSelectPack={this.selectPack}
                      packs={timePacks}
                    />
                  </View>
                )}
              </View>
            </Fragment>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Dashboard;
