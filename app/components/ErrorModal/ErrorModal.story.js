import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ErrorModal from './ErrorModal';
import Styles from '../../Stories.styles';

storiesOf('Component | ErrorModal', module).add('Primary', () => {
  return (
    <View style={Styles.containerWithBG}>
      <ScrollView>
        <View style={Styles.row}>
          <Text style={Styles.title}>HUH</Text>
          <ErrorModal
            closeButtonLabel="Go back"
            headerLabel="HUH?!"
            message="Huh?! Something is wrong with that number. Please try again."
            onClose={action('close')}
          />
        </View>
        <View style={Styles.row}>
          <Text style={Styles.title}>OOPS</Text>
          <ErrorModal
            closeButtonLabel="Try again"
            headerLabel="OOPS?!"
            message="Yikes! Something went wrong. Please try again."
            onClose={action('close')}
          />
        </View>
        <View style={Styles.row}>
          <Text style={Styles.title}>Logout</Text>
          <ErrorModal
            closeButtonLabel="Login"
            forLogout={true}
            headerLabel="SEE YA LATER!"
            message="You've logged out of Data Clock. See you later!"
            onClose={action('close')}
          />
        </View>
      </ScrollView>
    </View>
  );
});
