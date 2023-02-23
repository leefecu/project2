/**
 * @jest-environment jsdom
 */
import React from 'react';
import { create } from 'react-test-renderer';

import CodeInput from './CodeInput';

import { noop } from '../../helpers/general';

jest.mock('react-native-device-info', () => {
  return {
    isEmulator: jest.fn(),
  };
});

describe('CodeInput component', () => {
  test('render default codeInput', () => {
    const button = create(<CodeInput code="" onUpdate={noop} />);
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render codeInput with number', () => {
    const button = create(<CodeInput code="12345" onUpdate={noop} />);
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render codeInput with tick', () => {
    const button = create(<CodeInput code="12345" onUpdate={noop} success={true} />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
