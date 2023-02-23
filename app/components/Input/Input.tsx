import React, { createRef, PureComponent } from 'react';
import { TextInput, TouchableHighlight, View } from 'react-native';

import { noop } from '../../helpers/general';

import Styles from './Input.styles';
import Colors from '../../themes/Colors';

import ClearTextSVG from '../../images/clearText.svg';
import ErrorSVG from '../../images/error.svg';

interface DefaultProps {
  autoFocus?: boolean;
  invalid?: boolean;
  number: string;
  onBlur?: () => void;
  onUpdate: (number: string) => void;
  placeholder: string;
  returnKeyType:
    | 'go'
    | 'none'
    | 'search'
    | 'default'
    | 'done'
    | 'next'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call'
    | undefined;
}

interface Props extends DefaultProps {
  clearText: () => void;
}

class Input extends PureComponent<Props> {
  textInput = createRef<TextInput>();

  static defaultProps: DefaultProps = {
    autoFocus: false,
    invalid: false,
    number: '',
    onBlur: noop,
    onUpdate: noop,
    placeholder: 'placeholder',
    returnKeyType: 'go',
  };

  render() {
    const {
      autoFocus,
      clearText,
      invalid,
      number,
      onBlur,
      onUpdate,
      placeholder,
      ...props
    } = this.props;
    return (
      <View style={Styles.container}>
        {invalid && (
          <View style={Styles.errorIcon}>
            <ErrorSVG />
          </View>
        )}
        <TextInput
          ref={this.textInput}
          autoFocus={autoFocus}
          allowFontScaling={true}
          keyboardType="phone-pad"
          onBlur={onBlur}
          onChangeText={onUpdate}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          style={Styles.input}
          value={number}
          {...props}
        />
        {number.length > 0 && (
          <TouchableHighlight
            activeOpacity={0.5}
            onPress={clearText}
            style={Styles.clearTextIcon}
            testID="clearTextButton"
            underlayColor={Colors.transparent}>
            <ClearTextSVG />
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

export default Input;
