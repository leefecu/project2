import React from 'react';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import ActivateStash from './screens/ActivateStash/ActivateStash';
import DashboardScreen from './screens/Dashboard/Dashboard';
import EnterCode from './screens/EnterCode/EnterCode';
import LoadingScreen from './screens/Loading/Loading';
import Maintenance from './screens/Maintenance/Maintenance';
import MobileNumber from './screens/MobileNumber/MobileNumber';
import PurchasePack from './screens/PurchasePack/PurchasePack';
import Roaming from './screens/Roaming/Roaming';
import SafetyLock from './screens/SafetyLock/SafetyLock';
import SideMenu from './screens/SideMenu/SideMenu';
import TandCScreen from './screens/TandC/TandC';
import Upgrade from './screens/Upgrade/Upgrade';
import WelcomeScreen from './screens/Welcome/Welcome';

import Colors from './themes/Colors';
import Metrics from './themes/Metrics';

const PackStack = createStackNavigator(
  {
    Stacks: DashboardScreen,
    ActivateStash,
    PurchasePack,
  },
  {
    headerLayoutPreset: 'center',
  },
);

const MainPackStack = createStackNavigator(
  {
    PackMain: {
      screen: PackStack,
      navigationOptions: {
        header: null,
      },
    },
    TandCModal: {
      screen: TandCScreen,
    },
  },
  {
    headerLayoutPreset: 'center',
    mode: 'modal',
  },
);

const AppStack = createDrawerNavigator(
  {
    Dashboard: MainPackStack,
  },
  {
    hideStatusBar: false,
    contentComponent: SideMenu,
    drawerBackgroundColor: Colors.white,
    drawerWidth: Metrics.width * 0.9,
    defaultNavigationOptions: {
      header: null,
    },
    // overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: Colors.white,
      // activeBackgroundColor: '#6b52ae',
    },
  },
);
const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    MobileNumber: {
      screen: MobileNumber,
    },
    EnterCode: {
      screen: EnterCode,
    },
    SafetyLock: {
      screen: SafetyLock,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerLayoutPreset: 'center',
  },
);

const MainAuthStack = createStackNavigator(
  {
    AuthMain: {
      screen: AuthStack,
      navigationOptions: {
        header: null,
      },
    },
    TandCModal: {
      screen: TandCScreen,
    },
  },
  {
    headerLayoutPreset: 'center',
    mode: 'modal',
  },
);

const SwitchStack = createAnimatedSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: MainAuthStack,
  },
  {
    initialRouteName: 'Loading',
    transition: (
      <Transition.Together>
        <Transition.Out type='slide-left' durationMs={300} interpolation='easeIn' />
      </Transition.Together>
    ),
  },
);

export default createAppContainer(
  createStackNavigator(
    {
      Main: SwitchStack,
      AppLocked: SafetyLock,
      Roaming,
      Maintenance,
      Upgrade,
    },
    {
      initialRouteName: 'Main',
      headerMode: 'none',
      mode: 'modal',
    },
  ),
);
