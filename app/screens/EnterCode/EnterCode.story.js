import React from 'react';

import { storiesOf } from '@storybook/react-native';

import EnterCode from './EnterCode';

const navigation = {
  getParam: () => '021123456',
};

storiesOf('Page | EnterCode', module).add('default', () => <EnterCode navigation={navigation} />);
