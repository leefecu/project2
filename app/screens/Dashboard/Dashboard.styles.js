import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackgroundColor,
    flex: 1,
    paddingTop: Metrics.largePadding,
  },
  scrollView: {
    paddingBottom: Metrics.largePadding,
  },
  prepaid: {
    paddingTop: 0,
  },
  innerContainer: {
    paddingHorizontal: Metrics.doublePadding,
  },
  noActivePackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.largePadding,
    paddingHorizontal: Metrics.largePadding,
  },
  sleepingClock: {
    marginBottom: Metrics.baseMargin,
    left: 7,
  },
  noActivePackText: {
    color: Colors.lineColor,
    fontSize: Metrics.Fonts.small,
    textAlign: 'center',
    fontFamily: 'CircularPro-Bold',
  },
  loadingIconWrapper: {
    height: Metrics.height - Metrics.statusBarHeight * 2 - Metrics.largePadding * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    flex: 1,
  },
  menuButton: {
    marginLeft: Metrics.smallMargin,
  },
  prepayBalance: {
    marginBottom: Metrics.largePadding,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  freeDataHour: {
    marginBottom: Metrics.largerPadding,
  },
  packContainer: {
    marginBottom: Metrics.largerPadding,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
  },
  headerLine: {
    position: 'absolute',
    backgroundColor: Colors.lineColor,
    height: 1,
    top: 9,
    width: Metrics.width - Metrics.doubleMargin * 2,
  },
  headerTextWrapper: {
    backgroundColor: Colors.defaultBackgroundColor,
    paddingHorizontal: Metrics.basePadding,
    zIndex: 1,
  },
  headerText: {
    color: Colors.lineColor,
    fontSize: Metrics.Fonts.smaller,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'CircularPro-Bold',
  },
});
