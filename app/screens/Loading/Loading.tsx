import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import ImageSequence from 'react-native-image-sequence';
import firebase from 'react-native-firebase';
import Push from 'appcenter-push';
import { Image, Platform, StatusBar, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import { checkForRoaming } from '../../helpers/Device';
import { systemCheck, testProps } from '../../helpers/general';
import * as NotificationHelpers from '../../helpers/Notification';
import * as Storage from '../../helpers/Storage';

import Styles from './Loading.styles';
import Colors from '../../themes/Colors';

const IS_IOS: boolean = Platform.OS === 'ios';

/* eslint-disable global-require */
const images = [
  require('../../images/splash/splash05.png'),
  require('../../images/splash/splash06.png'),
  require('../../images/splash/splash07.png'),
  require('../../images/splash/splash08.png'),
  require('../../images/splash/splash09.png'),
  require('../../images/splash/splash10.png'),
  require('../../images/splash/splash11.png'),
  require('../../images/splash/splash12.png'),
  require('../../images/splash/splash13.png'),
  require('../../images/splash/splash14.png'),
  require('../../images/splash/splash15.png'),
  require('../../images/splash/splash16.png'),
  require('../../images/splash/splash17.png'),
  require('../../images/splash/splash18.png'),
  require('../../images/splash/splash19.png'),
  require('../../images/splash/splash20.png'),
  require('../../images/splash/splash21.png'),
  require('../../images/splash/splash22.png'),
  require('../../images/splash/splash23.png'),
  require('../../images/splash/splash24.png'),
  require('../../images/splash/splash25.png'),
  require('../../images/splash/splash26.png'),
  require('../../images/splash/splash27.png'),
  require('../../images/splash/splash28.png'),
  require('../../images/splash/splash29.png'),
  require('../../images/splash/splash30.png'),
  require('../../images/splash/splash31.png'),
  require('../../images/splash/splash32.png'),
  require('../../images/splash/splash33.png'),
  require('../../images/splash/splash34.png'),
  require('../../images/splash/splash35.png'),
  require('../../images/splash/splash36.png'),
  require('../../images/splash/splash37.png'),
  require('../../images/splash/splash38.png'),
  require('../../images/splash/splash39.png'),
  require('../../images/splash/splash40.png'),
  require('../../images/splash/splash41.png'),
  require('../../images/splash/splash42.png'),
  require('../../images/splash/splash43.png'),
  require('../../images/splash/splash44.png'),
  require('../../images/splash/splash45.png'),
  require('../../images/splash/splash46.png'),
  require('../../images/splash/splash47.png'),
  require('../../images/splash/splash48.png'),
  require('../../images/splash/splash49.png'),
  require('../../images/splash/splash50.png'),
  require('../../images/splash/splash51.png'),
  require('../../images/splash/splash52.png'),
  require('../../images/splash/splash53.png'),
  require('../../images/splash/splash54.png'),
  require('../../images/splash/splash55.png'),
  require('../../images/splash/splash56.png'),
];
/* eslint-enable global-require */

const framesPerSecond = images.length / 3;

const notifications = firebase.notifications();

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  animationDone: boolean;
  checkingOpenStatus: boolean;
}

if (IS_IOS) {
  // Need to reset badge count if app is opened from notification
  Push.setListener({
    onPushNotificationReceived: async () => {
      const badgeCount = await notifications.getBadge();
      notifications.setBadge(badgeCount > 0 ? badgeCount - 1 : 0);
    },
  });
}

class LoadingScreen extends Component<Props, State> {
  animationTimer: NodeJS.Timeout;

  loadingTimer: NodeJS.Timeout;

  /* eslint-disable global-require */
  staticImageIos = require('../../images/splash/splash56.png');

  staticImageAndroid = [require('../../images/splash/splash56.png')];
  /* eslint-enable global-require */

  constructor(props: Props) {
    super(props);

    this.state = { animationDone: false, checkingOpenStatus: true };

    this.animationTimer = setTimeout(() => {
      this.setState({ animationDone: true });
    }, 3000);
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const userOnRoaming = await checkForRoaming();
    SplashScreen.hide();
    // Clear badge count when app opens only for iOS
    // on iOS there is no way to clear badge count if user clear notification
    if (IS_IOS) {
      NotificationHelpers.clearBadgeCount();
    }
    if (userOnRoaming) {
      this.clearAllTimeout();
      navigation.navigate('Roaming');
    } else {
      this.bootstrapAsync();
    }
  };

  componentWillUnmount() {
    this.clearAllTimeout();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const { navigation } = this.props;
    const accessToken = await Storage.getAccessToken();
    const isUserBlocked = await Storage.isUserBlocked();
    const appOpened = await Storage.hasAppOpened();
    if (isUserBlocked) {
      navigation.navigate('AppLocked');
    } else if (accessToken) {
      navigation.navigate('App');
      systemCheck(navigation);
    } else if (appOpened) {
      navigation.navigate('Welcome');
      systemCheck(navigation);
    } else {
      Storage.appOpened();
      const enabled = await firebase.messaging().hasPermission();
      if (!enabled) {
        this.requestPermission();
      }
      this.setState({ checkingOpenStatus: false }, () => {
        this.loadingTimer = setTimeout(() => {
          navigation.navigate('Auth');
          systemCheck(navigation);
        }, 3100);
      });
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      // Todo
    }
  };

  clearAllTimeout() {
    clearTimeout(this.animationTimer);
    clearTimeout(this.loadingTimer);
  }

  render() {
    const { animationDone, checkingOpenStatus } = this.state;
    return (
      <View style={Styles.container} {...testProps('Loading Page')}>
        <StatusBar backgroundColor={Colors.primary} />
        {!checkingOpenStatus ? (
          IS_IOS ? (
            animationDone ? (
              <Image source={this.staticImageIos} style={Styles.splashLogo} />
            ) : (
              <ImageSequence
                framesPerSecond={framesPerSecond}
                images={images}
                loop={true}
                startFrameIndex={0}
                style={Styles.splashLogo}
              />
            )
          ) : (
            <ImageSequence
              framesPerSecond={framesPerSecond}
              images={animationDone ? this.staticImageAndroid : images}
              loop={false}
              startFrameIndex={0}
              style={Styles.splashLogo}
            />
          )
        ) : null}
      </View>
    );
  }
}

export default LoadingScreen;
