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
    paddingVertical: Metrics.smallerPadding,
  },
  backButton: {
    marginLeft: Metrics.baseMargin,
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
    fontSize: Metrics.Fonts.small,
    fontFamily: 'CircularPro-Book',
    textAlign: 'center',
  },
  hiddenText: {
    color: Colors.secondary,
  },
  number: {
    color: Colors.white,
    fontSize: Metrics.Fonts.small,
    fontWeight: 'bold',
    fontFamily: 'CircularPro-Black',
    lineHeight: Metrics.baseLineSpacing,
    textAlign: 'center',
  },
  link: {
    color: Colors.white,
    fontSize: Metrics.Fonts.small,
    fontWeight: 'bold',
    fontFamily: 'CircularPro-Bold',
    textAlign: 'center',
  },
  icon: {
    marginBottom: Metrics.smallMargin,
  },
});
