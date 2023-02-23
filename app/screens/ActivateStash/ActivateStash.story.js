import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ActivateStash from './ActivateStash';

import { noop } from '../../helpers/general';

const navigation = {
  closeDrawer: noop,
  navigate: noop,
  getParam: () => '1 Hour',
};

storiesOf('Page | Activate Stash Pack', module).add('default', () => (
  <ActivateStash navigation={navigation} />
));
