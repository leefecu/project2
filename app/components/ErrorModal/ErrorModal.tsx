import React from 'react';
import { Text, View } from 'react-native';

import Button from '../Button/Button';

import { noop, testProps } from '../../helpers/general';

import Styles, { ERROR_MODAL_WIDTH } from './ErrorModal.styles';
import Metrics from '../../themes/Metrics';

import ThumbsDownSVG from '../../images/thumbsDown.svg';
import TruckSVG from '../../images/truck.svg';

const BUTTON_WIDTH = ERROR_MODAL_WIDTH - Metrics.doublePadding * 2;

interface Props {
  closeButtonLabel: string;
  forLogout: boolean;
  headerLabel: string;
  message: string;
  onClose: () => void;
}

const ErrorModal = ({ closeButtonLabel, forLogout, headerLabel, message, onClose }: Props) => {
  return (
    <View {...testProps('Error Modal')}>
      <View style={Styles.header}>
        <View style={Styles.headerLine} />
        <View style={Styles.headerTextWrapper}>
          <Text style={Styles.headerText}>{headerLabel}</Text>
        </View>
      </View>

      <View style={Styles.icon}>{forLogout ? <TruckSVG /> : <ThumbsDownSVG />}</View>

      <View style={Styles.messageContainer}>
        <Text style={Styles.message}>{message}</Text>
      </View>

      <View style={Styles.button}>
        <Button
          onPress={onClose}
          id="Close Error Modal"
          label={closeButtonLabel}
          width={BUTTON_WIDTH}
        />
      </View>
    </View>
  );
};

ErrorModal.defaultProps = {
  closeButtonLabel: 'Close',
  forLogout: false,
  headerLabel: 'OOPS',
  message: '',
  onClose: noop,
  visible: false,
};

export default ErrorModal;
