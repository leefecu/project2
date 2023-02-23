/**
 * @jest-environment jsdom
 */
import React from 'react';
import { create } from 'react-test-renderer';

import PrepayBalance from './PrepayBalance';

describe('PrepayBalance component', () => {
  test('render with balance', () => {
    const button = create(<PrepayBalance balance={30.98} loading={false} />);
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('render error state', () => {
    const button = create(<PrepayBalance balance={-1} loading={false} />);
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('render loading status', () => {
    const button = create(<PrepayBalance balance={30.98} loading={true} />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
