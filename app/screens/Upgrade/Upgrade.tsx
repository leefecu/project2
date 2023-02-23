import React, { PureComponent } from 'react';
import {
  Alert,
  AppState,
  BackHandler,
  Linking,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import { testProps } from '../../helpers/general';
import * as API from '../../helpers/Api';

import Button from '../../components/Button/Button';
import LockSVG from '../../images/lock.svg';
import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';
import Styles from './Upgrade.styles';
import { SYSTEM_RESPONSE } from '../../constants/Shared';

interface NativeEventSubscription {
  remove(): void;
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface State {
  backButtonPressedCount: number;
}

const IS_ANDROID = Platform.OS === 'android';
const APP_STORE_LINK = IS_ANDROID
  ? 'https://play.google.com/store/apps/details?id=nz.co.twodegreesmobile.comptelfwd.smpl'
  : 'https://apps.apple.com/nz/app/dataclock/id1203636332';

const BUTTON_WIDTH = Metrics.width - Metrics.doublePadding * 2;

class Upgrade extends PureComponent<Props, State> {
  backHandler: NativeEventSubscription | null;

  constructor(props: Props) {
    super(props);

    this.backHandler = null;

    this.state = { backButtonPressedCount: 0 };
  }

  componentDidMount() {
    if (IS_ANDROID) {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    if (IS_ANDROID && this.backHandler) {
      this.backHandler.remove();
    }
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = async (nextAppState: string) => {
    const { navigation } = this.props;
    if (nextAppState === 'active') {
      const systemInfo = await API.checkSystemInfo();
      if (systemInfo === SYSTEM_RESPONSE.MAINTENANCE) {
        navigation.navigate('Maintenance');
      } else if (systemInfo === SYSTEM_RESPONSE.CONTINUE) {
        navigation.navigate('Loading');
      }
    }
  };

  handleBackPress = () => {
    this.setState(prevState => {
      // Exit the app when user press back button twice
      if (prevState.backButtonPressedCount > 0) {
        BackHandler.exitApp();
      }
      return {
        backButtonPressedCount: prevState.backButtonPressedCount + 1,
      };
    });
    return true;
  };

  showError = () => {
    Alert.alert(
      "Can't open App Store",
      `Please copy this url and paste on your browser to update DataClock.\n
      ${APP_STORE_LINK}`,
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
    );
  };

  upgrade = () => {
    Linking.canOpenURL(APP_STORE_LINK)
      .then(supported => {
        if (!supported) {
          this.showError();
        } else {
          return Linking.openURL(APP_STORE_LINK);
        }
      })
      .catch(() => this.showError());
  };

  render() {
    return (
      <View style={Styles.container}>
        <StatusBar backgroundColor={Colors.primary} />
        <View style={Styles.icon} {...testProps('Upgrade Lock Icon')}>
          <LockSVG />
        </View>
        <View style={Styles.textRow}>
          <Text style={Styles.title}>Upgrade Data Clock</Text>
        </View>
        <View style={Styles.textRow}>
          <Text style={Styles.message}>
            You need to update to keep using the Data Clock app, please update the app then re-open.
          </Text>
        </View>
        <View>
          <Button onPress={this.upgrade} id="Upgrade" label="Upgrade" width={BUTTON_WIDTH} withBG />
        </View>
      </View>
    );
  }
}

export default Upgrade;
