/**
 * @jest-environment jsdom
 */
import React from 'react';
import { create } from 'react-test-renderer';

import PopupModal from './PopupModal';
import LoadingModal from '../LoadingModal/LoadingModal';

import { noop } from '../../helpers/general';

describe('LoadingModal component', () => {
  test('render default LoadingModal', () => {
    const button = create(
      <PopupModal onClose={noop} visible={true}>
        <LoadingModal />
      </PopupModal>,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
});
