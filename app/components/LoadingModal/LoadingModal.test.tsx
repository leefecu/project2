/**
 * @jest-environment jsdom
 */
import React from 'react';
import { create } from 'react-test-renderer';

import LoadingModal from './LoadingModal';

describe('LoadingModal component', () => {
  test('render default LoadingModal', () => {
    const button = create(<LoadingModal />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
