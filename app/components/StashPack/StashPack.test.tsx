/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import StashPack from './StashPack';

import { noop } from '../../helpers/general';

describe('StashPack component', () => {
  test('render purchased with remaining', () => {
    const button = create(
      <StashPack
        onPress={noop}
        packName="1 hour"
        packetId="id1"
        packetInstanceId="id1"
        packActivationsRemaining={3}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('render with message', () => {
    const button = create(
      <StashPack
        grantedForFree
        onPress={noop}
        packName="1 hour"
        packetId="id2"
        packetInstanceId="id2"
        packActivationsRemaining={1}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('trigger onPress function upon press', () => {
    const onPressEvent = jest.fn();
    const component = shallow(
      <StashPack
        onPress={onPressEvent}
        packName="1 hour"
        packetId="id3"
        packetInstanceId="id2"
        packActivationsRemaining={1}
      />,
    );
    component.find('Button').simulate('press');
    expect(onPressEvent).toHaveBeenCalled();
  });
});
