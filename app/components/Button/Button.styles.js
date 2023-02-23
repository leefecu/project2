import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.primaryDark,
    borderRadius: Metrics.buttonBorderRadius,
    borderWidth: Metrics.borderWidth,
    paddingVertical: Metrics.smallPadding,
    alignItems: 'stretch',
  },
  containerWithBG: {
    borderColor: Colors.whiteBorder,
  },
  smallButton: {
    paddingVertical: Metrics.smallerPadding,
  },
  pressed: {
    borderColor: Colors.primaryDark,
  },
  disabled: {
    borderColor: Colors.primaryDarkDisabled,
  },
  disabledWithBG: {
    borderColor: Colors.whiteDisabled,
  },
  label: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.normal,
    fontWeight: 'bold',
    fontFamily: 'CircularPro-Bold',
    textAlign: 'center',
  },
  smallLabel: {
    fontSize: Metrics.Fonts.smaller,
  },
  labelWithBG: {
    color: Colors.white,
  },
  labelPressed: {
    color: Colors.white,
  },
  labelDisabled: {
    color: Colors.primaryDarkDisabled,
  },
  labelWithBGDisabled: {
    color: Colors.whiteBorder,
  },
});
