import React, { createRef, PureComponent, RefObject } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  TextInput,
  View,
  TextInputKeyPressEventData,
} from 'react-native';
import get from 'lodash/get';
import times from 'lodash/times';

import { isAutoFillSupported } from '../../helpers/Device';
import { noop, testProps } from '../../helpers/general';

import Styles from './CodeInput.styles';

import TickSVG from '../../images/tick.svg';

interface DefaultProps {
  invalid?: boolean;
  code: string;
  success?: boolean;
  onBlur?: () => void;
  onUpdate: (number: string) => void;
}

interface Props extends DefaultProps {}

export const OPT_DIGIT_COUNT = 5;
export const EMPTY_PLACEHOLDER = 'X';

class Input extends PureComponent<Props> {
  autoFillInput: RefObject<TextInput>;

  codes: Array<RefObject<TextInput>>;

  static defaultProps: DefaultProps = {
    invalid: false,
    code: '',
    success: false,
    onBlur: noop,
    onUpdate: noop,
  };

  constructor(props: Props) {
    super(props);
    this.codes = [];

    this.autoFillInput = createRef<TextInput>();

    times(OPT_DIGIT_COUNT, index => {
      this.codes[index] = createRef<TextInput>();
    });
  }

  getCode(position: number) {
    const { code, success } = this.props;
    if (success) {
      return '';
    }
    return code.length > position
      ? code[position] === EMPTY_PLACEHOLDER
        ? ''
        : code[position]
      : '';
  }

  handleCodeChange = (position: number, value: string) => {
    const { code, onUpdate } = this.props;
    if (value) {
      const newCode: string =
        code.substring(0, position) + value + code.substring(position + 1, OPT_DIGIT_COUNT);
      onUpdate(newCode);
      if (position < OPT_DIGIT_COUNT - 1) {
        const nextCode = get(this.codes, `${[position + 1]}.current`, null);
        if (nextCode) {
          nextCode.focus();
        }
      }
    }
  };

  handleDeleteCode = (position: number, key: string) => {
    const { code, onUpdate } = this.props;
    if (key === 'Backspace' && position >= 0) {
      const newCode: string =
        code.substring(0, position) +
        EMPTY_PLACEHOLDER +
        code.substring(position + 1, OPT_DIGIT_COUNT);
      onUpdate(newCode);
      if (this.getCode(position) === '' && position > 0) {
        const prevCode = get(this.codes, `${[position - 1]}.current`, null);
        if (prevCode) {
          prevCode.focus();
        }
      }
    }
  };

  handleAutoFill = (code: string) => {
    const { onUpdate } = this.props;
    if (code.length === OPT_DIGIT_COUNT) {
      onUpdate(code);
    }
  };

  handleAutoFillInputKeyPress = ({
    nativeEvent: { key },
  }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const { code, onUpdate } = this.props;
    const secondDigit = get(this.codes, `${[1]}.current`, null);

    if (secondDigit && Number(key)) {
      const newCode = key + code.substring(1, OPT_DIGIT_COUNT);
      onUpdate(newCode);
      secondDigit.focus();
    }
  };

  render() {
    const { code, invalid, onBlur, onUpdate, success, ...props } = this.props;
    return (
      <View style={Styles.container} {...testProps('One Time Passcode Input Field')}>
        {times(OPT_DIGIT_COUNT, index => (
          <View key={index} style={Styles.codeWrapper}>
            <TextInput
              ref={this.codes[index]}
              autoFocus={Platform.OS !== 'android' && !isAutoFillSupported && index === 0}
              keyboardType="number-pad"
              maxLength={1}
              onBlur={onBlur}
              onChangeText={value => this.handleCodeChange(index, value)}
              onKeyPress={e => this.handleDeleteCode(index, e.nativeEvent.key)}
              returnKeyType="next"
              style={Styles.codeInput}
              value={this.getCode(index)}
              {...props}
            />
            {success && (
              <View style={Styles.tick}>
                <TickSVG />
              </View>
            )}
          </View>
        ))}
        {/* 
        Trick here is to display hidden TextInput to trigger keyboard up
        and display OTC once SMS is received
        This only works for ios12 or above
        Applying textContentType="oneTimeCode" doesn't really work  with above TextInput
        as it's composed of 5 individual TextInput
        */}
        {isAutoFillSupported && (
          <TextInput
            ref={this.autoFillInput}
            keyboardType="number-pad"
            autoFocus={true}
            style={Styles.hiddenInput}
            textContentType="oneTimeCode"
            onChangeText={this.handleAutoFill}
            onKeyPress={this.handleAutoFillInputKeyPress}
            value=""
          />
        )}
      </View>
    );
  }
}

export default Input;
