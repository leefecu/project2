import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.azureBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Metrics.smallPadding,
    width: Metrics.width,
  },
  leftColumn: {
    borderRightColor: Colors.separatorColor,
    borderRightWidth: 1,
    flex: 3,
    paddingVertical: Metrics.smallestPadding,
    paddingHorizontal: Metrics.smallPadding,
  },
  rightColumn: {
    flex: 7,
    paddingHorizontal: Metrics.smallPadding,
  },
  label: {
    color: Colors.white,
    fontSize: Metrics.Fonts.smallest,
    textAlign: 'center',
    fontFamily: 'CircularPro-Book',
  },
  balance: {
    color: Colors.white,
    fontSize: Metrics.Fonts.small,
    fontFamily: 'CircularPro-Bold',
  },
  loadingIcon: {
    alignSelf: 'flex-start',
    flex: 1,
  },
});
