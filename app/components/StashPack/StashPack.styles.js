import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export const STACH_PACK_WIDTH = Metrics.width - Metrics.doublePadding * 2;

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'row',
    width: STACH_PACK_WIDTH,
  },
  labelColumn: {
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderTopLeftRadius: Metrics.inputBorderRadius,
    borderBottomLeftRadius: Metrics.inputBorderRadius,
    flex: 6,
    justifyContent: 'center',
    paddingHorizontal: Metrics.basePadding,
    paddingVertical: Metrics.basePadding,
  },
  buttonColumn: {
    alignItems: 'center',
    backgroundColor: Colors.sunriseYellow,
    borderTopRightRadius: Metrics.inputBorderRadius,
    borderBottomRightRadius: Metrics.inputBorderRadius,
    flex: 4,
    justifyContent: 'center',
    paddingVertical: Metrics.smallPadding,
  },
  packNameBlock: {
    alignItems: 'flex-end',
  },
  packName: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.small,
    fontFamily: 'CircularPro-Bold',
    marginRight: Metrics.smallestMargin,
  },
  unit: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.small,
    fontFamily: 'CircularPro-Bold',
  },
  info: {
    borderTopColor: Colors.lineColor,
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: Metrics.basePadding,
    paddingTop: Metrics.basePadding,
  },
  typeColumn: {
    flex: 5,
    justifyContent: 'center',
    paddingRight: Metrics.smallestPadding,
  },
  type: {
    color: Colors.descriptionColor,
    fontSize: Metrics.Fonts.smallest,
    fontFamily: 'CircularPro-Book',
  },
  remainingColumn: {
    borderLeftColor: Colors.lineColor,
    borderLeftWidth: 1,
    flex: 5,
    paddingLeft: Metrics.smallerPadding,
  },
  remaining: {
    color: Colors.descriptionColor,
    fontSize: Metrics.Fonts.smallest,
    fontFamily: 'CircularPro-Bold',
  },
});
