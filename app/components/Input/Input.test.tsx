/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import Input from './Input';

import { noop } from '../../helpers/general';

describe('Input component', () => {
  test('render default input', () => {
    const button = create(
      <Input clearText={noop} number="" onUpdate={noop} placeholder="Enter mobile number" />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render input with number', () => {
    const button = create(
      <Input
        clearText={noop}
        number="+62 22 1234 5678"
        onUpdate={noop}
        placeholder="Enter mobile number"
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render input with invalid number & error', () => {
    const button = create(
      <Input
        clearText={noop}
        invalid={true}
        number="09 373 5"
        onUpdate={noop}
        placeholder="Enter mobile number"
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('trigger clearText function upon press clear text icon', () => {
    const clearTextEvent = jest.fn();
    const component = shallow(
      <Input
        clearText={clearTextEvent}
        number="+62 22 1234 5678"
        onUpdate={noop}
        placeholder="Enter mobile number"
      />,
    );
    component
      .find('TouchableHighlight')
      .first()
      .simulate('press');
    expect(clearTextEvent).toHaveBeenCalled();
  });
});
