import React, { PureComponent } from 'react';
import { Animated, AppState, BackHandler, Easing, Platform, View } from 'react-native';

import Timer, { LINE_CAP } from '../Timer/Timer';

import { testProps } from '../../helpers/general';

import Styles from './ActivePack.styles';
import Colors from '../../themes/Colors';

const AnimatedTimer = Animated.createAnimatedComponent(Timer);

interface Props extends TActivePack {
  onTimerComplete: () => void;
}

interface State {
  fillAnimation: Animated.Value;
  remainingTimeString: Animated.Value;
}

interface NativeEventSubscription {
  remove(): void;
}

const easing = Easing.out(Easing.linear);

class ActivePack extends PureComponent<Props, State> {
  backHandler: NativeEventSubscription | null;

  callbackOn: boolean;

  fillAnimation: Animated.Value;

  remainingTimeString: Animated.Value;

  constructor(props: Props) {
    super(props);
    const { startTime, endTime } = this.props;

    this.backHandler = null;
    this.callbackOn = true;
    this.fillAnimation = new Animated.Value(this.getPrefill(startTime, endTime));
    this.remainingTimeString = new Animated.Value(this.getRemainingTime(props));
  }

  componentDidMount() {
    this.animate(this.props);
    if (Platform.OS === 'android') {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps(newProps: Props) {
    const { endTime: newEndTime, startTime: newStartTime } = newProps;
    const { endTime } = this.props;
    if (newEndTime !== endTime) {
      this.callbackOn = false;
      // setValue terminates existing animation and trigger onTimerComplete which
      // resets activePack on Dashboard.
      // Need to temporarily disable while refreshing the animation
      this.fillAnimation.setValue(this.getPrefill(newStartTime, newEndTime));
      this.remainingTimeString.setValue(this.getRemainingTime(newProps));
      this.animate(newProps);
      this.callbackOn = true;
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android' && this.backHandler) {
      this.backHandler.remove();
    }
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  getDuration = (props: Props) => {
    const { endTime, startTime } = props;
    const now = new Date().getTime();
    const currentTime = now > startTime ? now : startTime;
    return endTime - currentTime;
  };

  getPrefill = (startTime: number, endTime: number) => {
    const now = new Date().getTime();
    const currentTime = now > startTime ? now : startTime;
    const remainingTime = endTime - currentTime;
    const totalTime = endTime - startTime;
    return Number((remainingTime / totalTime) * 100);
  };

  getRemainingTime = (props: Props) => {
    const { endTime, startTime } = props;
    const now = new Date().getTime();
    const currentTime = now > startTime ? now : startTime;
    return Math.ceil(Number(endTime - currentTime) / 1000);
  };

  handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === 'active') {
      this.callbackOn = true;
    }
  };

  handleBackPress = () => {
    this.callbackOn = false;
    BackHandler.exitApp();
  };

  animate(props: Props) {
    const { onTimerComplete } = props;
    const duration = this.getDuration(props);

    const animation = Animated.parallel([
      Animated.timing(this.fillAnimation, {
        toValue: 0,
        easing,
        duration,
      }),
      Animated.timing(this.remainingTimeString, {
        toValue: 0,
        easing,
        duration,
      }),
    ]);
    animation.start(() => {
      if (this.callbackOn) {
        onTimerComplete();
      }
    });

    return animation;
  }

  render() {
    const { packTitle } = this.props;
    return (
      <View style={Styles.container} {...testProps(`Active Pack ${packTitle} Timer`)}>
        <AnimatedTimer
          fill={this.fillAnimation}
          size={240}
          width={15}
          backgroundWidth={15}
          tintColor={Colors.primary}
          backgroundColor={Colors.skyBlue}
          arcSweepAngle={360}
          rotation={0}
          lineCap={LINE_CAP.ROUND}
          timeRemaining={this.remainingTimeString}
        />
      </View>
    );
  }
}

export default ActivePack;
