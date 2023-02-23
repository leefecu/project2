import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.largerPadding,
    width: Metrics.width,
  },
  duration: {
    color: Colors.white,
    fontSize: Metrics.Fonts.h3,
    fontWeight: 'bold',
    fontFamily: 'CircularPro-Bold',
    textAlign: 'center',
  },
});
