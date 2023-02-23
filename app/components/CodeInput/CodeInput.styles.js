import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  codeInput: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderRadius: Metrics.inputBorderRadius,
    borderWidth: 1,
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.h4,
    fontWeight: 'bold',
    fontFamily: 'CircularPro-Bold',
    textAlign: 'center',
    marginHorizontal: Metrics.smallerMargin,
    height: 68,
    width: 48,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hiddenInput: {
    height: 0,
  },
  codeWrapper: {
    position: 'relative',
  },
  tick: {
    position: 'absolute',
    top: 26,
    left: 20,
  },
});
