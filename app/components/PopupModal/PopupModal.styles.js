import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.modalBGColor,
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderRadius: Metrics.inputBorderRadius,
    borderWidth: Metrics.borderWidth,
    paddingVertical: Metrics.doublePadding,
    paddingTop: Metrics.basePadding,
    paddingBottom: Metrics.doublePadding,
    paddingHorizontal: Metrics.smallerPadding,
    width: Metrics.width - Metrics.baseMargin,
  },
});
