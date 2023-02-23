import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import PopupModal from './PopupModal';
import ErrorModal from '../ErrorModal/ErrorModal';
import LoadingModal from '../LoadingModal/LoadingModal';
import Styles from '../../Stories.styles';

storiesOf('Component | PopupModal', module).add('Primary', () => {
  return (
    <View style={Styles.containerWithBG}>
      <View style={Styles.row}>
        <Text style={Styles.title}>Error</Text>
        <PopupModal visible={true}>
          <ErrorModal
            closeButtonLabel="Go back"
            headerLabel="HUH?!"
            message="Huh?! Something is wrong with that number. Please try again."
            onClose={action('close')}
          />
        </PopupModal>
      </View>
      <View style={Styles.row}>
        <Text style={Styles.title}>Loading</Text>
        <PopupModal visible={true}>
          <LoadingModal />
        </PopupModal>
      </View>
    </View>
  );
});
