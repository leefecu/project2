import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export const TIME_PACK_WIDTH = Metrics.width - Metrics.doublePadding * 2;

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'row',
    width: TIME_PACK_WIDTH,
  },
  messageBG: {
    backgroundColor: Colors.primaryLight,
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
  disabledLabelColumn: {
    backgroundColor: Colors.lightGrey,
  },
  buttonColumn: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderTopRightRadius: Metrics.inputBorderRadius,
    borderBottomRightRadius: Metrics.inputBorderRadius,
    flex: 4,
    justifyContent: 'center',
    paddingVertical: Metrics.smallPadding,
  },
  disabledButtonColumn: {
    backgroundColor: Colors.stoneGrey,
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
  disabledText: {
    color: Colors.disabledText,
  },
  topupLabel: {
    fontSize: Metrics.Fonts.smallest,
    fontFamily: 'CircularPro-Book',
  },
  message: {
    borderTopColor: Colors.lineColor,
    borderTopWidth: 1,
    marginTop: Metrics.basePadding,
    paddingTop: Metrics.basePadding,
  },
  messageTitle: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.smaller,
    fontFamily: 'CircularPro-Bold',
    marginBottom: Metrics.baseMargin,
  },
  messageBody: {
    color: Colors.descriptionColor,
    fontSize: Metrics.Fonts.smallest,
    fontFamily: 'CircularPro-Book',
  },
});
