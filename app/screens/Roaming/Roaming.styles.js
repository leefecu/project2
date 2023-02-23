import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
    paddingBottom: 43,
    paddingTop: Metrics.height / 6 - Metrics.statusBarHeight,
    paddingHorizontal: Metrics.largerPadding,
  },
  icon: {
    marginTop: Metrics.doubleMargin,
    marginBottom: Metrics.doubleMargin,
  },
  textRow: {
    marginBottom: Metrics.baseMargin,
  },
  title: {
    color: Colors.white,
    fontSize: Metrics.Fonts.h4,
    fontFamily: 'CircularPro-Bold',
  },
  message: {
    color: Colors.white,
    fontSize: Metrics.Fonts.smaller,
    fontFamily: 'CircularPro-Book',
    lineHeight: Metrics.Fonts.h4,
    textAlign: 'center',
  },
});
