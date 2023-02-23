/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import ErrorModal from './ErrorModal';

import { noop } from '../../helpers/general';

describe('ErrorModal component', () => {
  test('render scenario 1', () => {
    const button = create(
      <ErrorModal
        closeButtonLabel="Go back"
        headerLabel="HUH?!"
        message="Huh?! Something is wrong with that number. Please try again."
        onClose={noop}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render scenario 2', () => {
    const button = create(
      <ErrorModal
        closeButtonLabel="Try again"
        headerLabel="OOPS?!"
        message="Yikes! Something went wrong. Please try again."
        onClose={noop}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
  test('render logout modal', () => {
    const button = create(
      <ErrorModal
        closeButtonLabel="Login"
        forLogout={true}
        headerLabel="SEE YA LATER!"
        message="You've logged out of Data Clock. See you later!"
        onClose={noop}
      />,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('trigger onClose function upon press button', () => {
    const onCloseEvent = jest.fn();
    const component = shallow(
      <ErrorModal
        closeButtonLabel="Go back"
        headerLabel="HUH?!"
        message="Huh?! Something is wrong with that number. Please try again."
        onClose={onCloseEvent}
      />,
    );
    component
      .find('Button')
      .first()
      .simulate('press');
    expect(onCloseEvent).toHaveBeenCalled();
  });
});
