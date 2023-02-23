import React from 'react';
import { Modal, View } from 'react-native';

import { noop, testProps } from '../../helpers/general';

import Styles from './PopupModal.styles';

interface Props {
  children?: React.ReactNode;
  visible: boolean;
}

const PopupModal = ({ children, visible }: Props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} {...testProps('Popup Modal')}>
      <View style={Styles.container}>
        <View style={Styles.innerContainer}>{children}</View>
      </View>
    </Modal>
  );
};

PopupModal.defaultProps = {
  onClose: noop,
  visible: false,
};

export default PopupModal;
