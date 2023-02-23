import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

const SMALL_DEVICE = Metrics.width <= 400; // iphone 5
export const BUTTON_WIDTH =
  Metrics.width - (SMALL_DEVICE ? Metrics.largePadding : Metrics.largerPadding) * 2;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.sunriseYellow,
    flex: 1,
    paddingTop: Metrics.largerPadding,
    paddingHorizontal: Metrics.doublePadding,
  },
  closeButton: {
    marginLeft: Metrics.baseMargin,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.doubleMargin,
  },
  duration: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.h2,
    fontFamily: 'CircularPro-Bold',
  },
  button: {},
});
