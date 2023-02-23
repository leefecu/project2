import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { testProps } from '../../helpers/general';

import Styles from './LoadingModal.styles';

import Colors from '../../themes/Colors';

const LoadingModal = () => (
  <View {...testProps('Loading Modal')}>
    <View style={Styles.header}>
      <View style={Styles.headerLine} />
      <View style={Styles.headerTextWrapper}>
        <Text style={Styles.headerText}>LOADING</Text>
      </View>
    </View>

    <View style={Styles.content}>
      <View style={Styles.messageContainer}>
        <Text style={Styles.message}>We’re processing your request.</Text>
      </View>

      <View style={Styles.loader}>
        <ActivityIndicator size="large" color={Colors.loadingBlue} />
      </View>
    </View>
  </View>
);

export default LoadingModal;
