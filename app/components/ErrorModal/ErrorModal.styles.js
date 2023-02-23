import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export const ERROR_MODAL_WIDTH = Metrics.width - Metrics.baseMargin;

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
    paddingHorizontal: Metrics.basePadding,
    zIndex: 1,
  },
  headerText: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.small,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'CircularPro-Bold',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrics.doubleMargin,
  },
  message: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.small,
    fontFamily: 'CircularPro-Book',
    marginBottom: Metrics.doubleMargin,
    textAlign: 'center',
  },
  messageContainer: {
    paddingHorizontal: Metrics.basePadding,
  },
  button: {
    alignItems: 'center',
  },
});
