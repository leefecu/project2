import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

const SMALL_DEVICE = Metrics.width <= 320; // iphone 5

export default StyleSheet.create({
  header: {
    position: 'relative',
    alignItems: 'center',
  },
  headerLine: {
    position: 'absolute',
    backgroundColor: Colors.primaryDark,
    height: 1,
    top: 9,
    width: Metrics.width - Metrics.doubleMargin,
  },
  headerTextWrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.doublePadding,
    zIndex: 1,
  },
  headerText: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.small,
    fontFamily: 'CircularPro-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    marginVertical: SMALL_DEVICE ? Metrics.doubleMargin * 2 : Metrics.doubleMargin * 2,
  },
  message: {
    color: Colors.primaryDark,
    fontSize: SMALL_DEVICE ? Metrics.Fonts.small : Metrics.Fonts.normal,
    fontFamily: 'CircularPro-Book',
    marginBottom: SMALL_DEVICE ? Metrics.smallMargin : Metrics.doubleMargin,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: Metrics.doubleMargin,
    paddingHorizontal: Metrics.basePadding,
  },
  loader: {
    alignItems: 'center',
  },
});
