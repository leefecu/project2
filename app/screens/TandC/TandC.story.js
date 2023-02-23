import React from 'react';

import { storiesOf } from '@storybook/react-native';

import TandC from './TandC';

import { noop } from '../../helpers/general';

const navigation = {
  closeDrawer: noop,
  navigate: noop,
};

storiesOf('Page | Terms and Conditions', module).add('default', () => (
  <TandC navigation={navigation} />
));
