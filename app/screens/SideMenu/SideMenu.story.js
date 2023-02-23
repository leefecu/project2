import React from 'react';

import { storiesOf } from '@storybook/react-native';

import SideMenu from './SideMenu';

import { noop } from '../../helpers/general';

const navigation = {
  closeDrawer: noop,
  navigate: noop,
};

storiesOf('Page | SideMenu', module).add('default', () => <SideMenu navigation={navigation} />);
