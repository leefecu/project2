import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
    paddingTop: Metrics.basePadding,
    paddingHorizontal: Metrics.doublePadding,
  },
  closeButton: {
    marginLeft: Metrics.baseMargin,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: Metrics.baseMargin,
  },
  headerLine: {
    position: 'absolute',
    backgroundColor: Colors.whiteBorder,
    height: 1,
    top: 9,
    width: Metrics.width - Metrics.doubleMargin,
  },
  headerTextWrapper: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Metrics.basePadding,
    zIndex: 1,
  },
  headerText: {
    color: Colors.white,
    fontSize: Metrics.Fonts.smallest,
    fontFamily: 'CircularPro-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentBlock: {
    marginBottom: Metrics.smallMargin,
  },
  tandcText: {
    color: Colors.white,
    fontSize: Metrics.Fonts.smallest,
    fontFamily: 'CircularPro-Book',
    lineHeight: Metrics.Fonts.normal,
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});
