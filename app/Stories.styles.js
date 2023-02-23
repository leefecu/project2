import { StyleSheet } from 'react-native';

import Colors from './themes/Colors';
import Metrics from './themes/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  containerWithBG: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  defaultBGContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.defaultBackgroundColor,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  lightBGContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  row: {
    marginBottom: Metrics.doubleMargin,
  },
  title: {
    color: Colors.white,
    fontSize: Metrics.Fonts.normal,
    marginBottom: Metrics.baseMargin,
  },
});
