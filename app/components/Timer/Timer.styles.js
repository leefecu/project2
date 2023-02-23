import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  svgContainer: {
    backgroundColor: Colors.transparent,
  },
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
  },
  timeLabel: {
    color: Colors.deeperBlue,
    fontSize: Metrics.Fonts.smaller,
    fontWeight: 'bold',
    fontFamily: 'CircularPro-Bold',
    textAlign: 'center',
  },
  time: {
    color: Colors.deeperBlue,
    fontSize: Metrics.Fonts.h2,
    fontWeight: 'bold',
    fontFamily: 'CircularPro-Bold',
    textAlign: 'center',
  },
});
