/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import TimePack from './TimePack';

import { noop } from '../../helpers/general';

describe('TimePack component', () => {
  test('render default', () => {
    const button = create(
      <TimePack duration={15} packName="15 minutes" onPress={noop} packetId="id1" price={0.4} />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('render with message', () => {
    const button = create(
      <TimePack
        duration={180}
        packName="3 hours"
        onPress={noop}
        packetId="id2"
        price={5}
        messageBody="This is a testing packet level notification."
        messageTitle="Testing PACKET Notification"
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('trigger onPress function upon press', () => {
    const onPressEvent = jest.fn();
    const component = shallow(
      <TimePack
        duration={15}
        packName="15 minutes"
        onPress={onPressEvent}
        packetId="id1"
        price={0.4}
      />,
    );
    component.find('Button').simulate('press');
    expect(onPressEvent).toHaveBeenCalled();
  });
});
