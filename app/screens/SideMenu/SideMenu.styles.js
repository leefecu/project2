import { Platform, StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingBottom: Metrics.basePadding,
  },
  innerContainer: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Metrics.basePadding,
  },
  closeButton: {
    marginBottom: Metrics.doubleMargin * 2,
  },
  msisdn: {
    color: Colors.white,
    fontSize: Metrics.Fonts.normal,
    fontFamily: 'CircularPro-Book',
  },
  menu: {
    backgroundColor: Colors.white,
    padding: Metrics.basePadding,
  },
  menuRow: {
    flexDirection: 'row',
    paddingVertical: Metrics.basePadding,
  },
  mainMenuText: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.normal,
    fontFamily: 'CircularPro-Book',
  },
  externalMenu: {
    backgroundColor: Colors.white,
    padding: Metrics.basePadding,
  },
  optionMenu: {
    backgroundColor: Colors.white,
    padding: Metrics.basePadding,
  },
  linkRow: {
    paddingVertical: Metrics.basePadding,
  },
  link: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.smaller,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: Metrics.basePadding,
  },
  footerText: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.smallest,
    fontFamily: 'CircularPro-Book',
  },
});
