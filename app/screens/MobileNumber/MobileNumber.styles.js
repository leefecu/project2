import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
    paddingBottom: Metrics.doublePadding,
    paddingTop: Metrics.doublePadding,
  },
  innerContainer: {
    paddingVertical: Metrics.doublePadding,
  },
  fieldRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.doubleMargin,
  },
  textRow: {
    paddingHorizontal: Metrics.doublePadding,
  },
  generalText: {
    color: Colors.white,
    fontSize: Metrics.Fonts.normal,
    fontFamily: 'CircularPro-Book',
    textAlign: 'center',
  },
  smallText: {
    color: Colors.white,
    fontSize: Metrics.Fonts.smaller,
    textAlign: 'center',
  },
  tAndC: {
    color: Colors.white,
    fontSize: Metrics.Fonts.smaller,
    fontWeight: 'bold',
    fontFamily: 'CircularPro-Medium',
    lineHeight: Metrics.largeLineSpacing,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
