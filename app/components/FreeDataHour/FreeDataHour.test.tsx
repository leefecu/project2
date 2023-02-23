/**
 * @jest-environment jsdom
 */
import React from 'react';
import { create } from 'react-test-renderer';

import FreeDataHour from './FreeDataHour';

import { noop } from '../../helpers/general';

describe('FreeDataHour component', () => {
  test('render default', () => {
    const button = create(<FreeDataHour onStart={noop} title="Free Data Hour" />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
