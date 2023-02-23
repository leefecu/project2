import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export const FREE_DATA_HOUR_WIDTH = Metrics.width - Metrics.doublePadding * 2;

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    width: FREE_DATA_HOUR_WIDTH,
  },
  iconRow: {
    backgroundColor: Colors.transparent,
    height: 36,
    position: 'relative',
    zIndex: 1,
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: FREE_DATA_HOUR_WIDTH / 2 - 27,
  },
  labelRow: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Metrics.largePadding,
    paddingBottom: Metrics.basePadding,
  },
  buttonRow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.sunriseYellow,
    paddingVertical: Metrics.basePadding,
    paddingHorizontal: Metrics.doublePadding,
  },
  label: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.normal,
    fontFamily: 'CircularPro-Bold',
  },
});
