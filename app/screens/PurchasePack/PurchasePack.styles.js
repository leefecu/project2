import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

const SMALL_DEVICE = Metrics.width <= 400;
export const BUTTON_WIDTH =
  Metrics.width - (SMALL_DEVICE ? Metrics.largePadding : Metrics.largerPadding) * 2;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
    paddingTop: Metrics.largerPadding * 2,
    paddingHorizontal: SMALL_DEVICE ? Metrics.basePadding : Metrics.doublePadding,
  },
  closeButton: {
    marginLeft: Metrics.baseMargin,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.largePadding,
  },
  infoRow: {
    flexDirection: 'row',
  },
  nameColumn: {
    alignItems: 'flex-end',
    borderRightColor: Colors.white,
    borderRightWidth: 1,
    flex: 6,
    justifyContent: 'flex-end',
    paddingRight: Metrics.smallPadding,
  },
  priceColumn: {
    alignItems: 'flex-start',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: Metrics.smallPadding,
  },
  duration: {
    color: Colors.white,
    fontSize: SMALL_DEVICE ? Metrics.Fonts.h4 : Metrics.Fonts.h3,
    fontFamily: 'CircularPro-Bold',
    lineHeight: Metrics.largePadding,
  },
  dollar: {
    color: Colors.white,
    fontSize: Metrics.Fonts.h6,
    fontFamily: 'CircularPro-Book',
    position: 'relative',
    top: 3,
  },
  price: {
    color: Colors.white,
    fontSize: SMALL_DEVICE ? Metrics.Fonts.h4 : Metrics.Fonts.h2,
    fontFamily: 'CircularPro-Book',
    lineHeight: Metrics.largePadding,
  },
  button: {},
});
