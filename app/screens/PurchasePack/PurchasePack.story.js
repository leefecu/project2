import React from 'react';

import { storiesOf } from '@storybook/react-native';

import PurchasePack from './PurchasePack';

import { noop } from '../../helpers/general';

const navigation = {
  closeDrawer: noop,
  navigate: noop,
  getParam: name => (name === 'packName' ? '30 minutes' : 6.0),
};

storiesOf('Page | Purchase Time Pack', module).add('default', () => (
  <PurchasePack navigation={navigation} />
));
