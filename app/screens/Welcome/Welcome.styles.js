import { PixelRatio, StyleSheet, Platform } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

const SMALL_ANDROID_DEVICE =
  Platform.OS === 'android' && Metrics.width <= 320 && PixelRatio.get() <= 1.5;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
    paddingBottom: 43,
    ...Platform.select({
      ios: {
        paddingTop: Metrics.height / 6 - Metrics.statusBarHeight,
      },
      android: {
        paddingTop: Metrics.height / (SMALL_ANDROID_DEVICE ? 8 : 6) - Metrics.statusBarHeight,
      },
    }),
  },
  textRow: {
    marginBottom: SMALL_ANDROID_DEVICE ? Metrics.smallMargin : Metrics.baseMargin,
  },
  welcomeText: {
    color: Colors.white,
    fontSize: Metrics.Fonts.normal,
    fontFamily: 'CircularPro-Bold',
  },
  buyText: {
    color: Colors.white,
    fontSize: Metrics.Fonts.normal,
    fontStyle: 'italic',
    fontFamily: 'CircularPro-Bold',
  },
  buttonRow: {
    marginTop: Metrics.height / 14,
    marginBottom: Metrics.height / 14,
  },
  logoRow: {
    position: 'absolute',
    bottom: 100,
  },
  tAndCRow: {
    position: 'absolute',
    bottom: 43,
  },
  tAndC: {
    color: Colors.white,
    fontSize: Metrics.Fonts.small,
    fontFamily: 'CircularPro-Medium',
    textDecorationLine: 'underline',
  },
});
