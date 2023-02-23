/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import Button from './Button';

import { noop } from '../../helpers/general';

import Metrics from '../../themes/Metrics';

const BUTTON_WIDTH = Metrics.width - Metrics.doublePadding * 2;

describe('Button component', () => {
  test('render Primary active button', () => {
    const button = create(
      <Button onPress={noop} id="Get Started" label="Get Started" width={BUTTON_WIDTH} />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render Primary disabled button', () => {
    const button = create(
      <Button disabled onPress={noop} id="Get Started" label="Get Started" width={BUTTON_WIDTH} />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render Primary with BG button', () => {
    const button = create(
      <Button onPress={noop} id="Get Started" label="Get Started" withBG width={BUTTON_WIDTH} />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render Primary with BG disabled button', () => {
    const button = create(
      <Button
        disabled
        onPress={noop}
        id="Get Started"
        label="Get Started"
        withBG
        width={BUTTON_WIDTH}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('render active small button', () => {
    const button = create(
      <Button
        onPress={noop}
        id="Get Started"
        label="Get Started"
        smallButton
        width={BUTTON_WIDTH}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render disabled small button', () => {
    const button = create(
      <Button
        disabled
        onPress={noop}
        id="Get Started"
        label="Get Started"
        smallButton
        width={BUTTON_WIDTH}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('render active small button with BG', () => {
    const button = create(
      <Button
        onPress={noop}
        id="Get Started"
        label="Get Started"
        smallButton
        width={BUTTON_WIDTH}
        withBG
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render disabled small button with BG', () => {
    const button = create(
      <Button
        disabled
        onPress={noop}
        label="Get Started"
        smallButton
        withBG
        width={BUTTON_WIDTH}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('trigger onPress function upon press', () => {
    const onPressEvent = jest.fn();
    const component = shallow(
      <Button onPress={onPressEvent} id="Get Started" label="Get Started" width={BUTTON_WIDTH} />,
    );
    component.simulate('press');
    expect(onPressEvent).toHaveBeenCalled();
  });

  test('does not trigger onPress function upon press when disabled', () => {
    const onPressEvent = jest.fn();
    const component = shallow(
      <Button
        disabled
        onPress={onPressEvent}
        id="Get Started"
        label="Get Started"
        width={BUTTON_WIDTH}
      />,
    );
    component.simulate('press');
    expect(onPressEvent).not.toHaveBeenCalled();
  });
});
