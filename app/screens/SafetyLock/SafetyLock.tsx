import React, { PureComponent } from 'react';
import { AppState, BackHandler, Platform, StatusBar, Text, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import * as Storage from '../../helpers/Storage';
import { testProps } from '../../helpers/general';

import LockSVG from '../../images/lock.svg';
import Colors from '../../themes/Colors';
import Styles from './SafetyLock.styles';

interface NativeEventSubscription {
  remove(): void;
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface State {
  backButtonPressedCount: number;
}

class SafetyLock extends PureComponent<Props, State> {
  backHandler: NativeEventSubscription | null;

  constructor(props: Props) {
    super(props);

    this.backHandler = null;

    this.state = { backButtonPressedCount: 0 };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    if (Platform.OS === 'android' && this.backHandler) {
      this.backHandler.remove();
    }
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = async (nextAppState: string) => {
    const { navigation } = this.props;
    if (nextAppState === 'active') {
      const isUserBlocked = await Storage.isUserBlocked();
      if (!isUserBlocked) {
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

  render() {
    return (
      <View style={Styles.container}>
        <StatusBar backgroundColor={Colors.primary} />
        <View style={Styles.icon} {...testProps('Safety Lock Icon')}>
          <LockSVG />
        </View>
        <View style={Styles.textRow}>
          <Text style={Styles.title}>Safety Lock</Text>
        </View>
        <View style={Styles.textRow}>
          <Text style={Styles.message}>
            You’ve been locked out for safety reasons. Please try again later.
          </Text>
        </View>
      </View>
    );
  }
}

export default SafetyLock;
