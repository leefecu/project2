import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderRadius: Metrics.inputBorderRadius,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.basePadding,
    paddingHorizontal: Metrics.basePadding,
    width: Metrics.width * 0.9,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorIcon: {
    flex: 1,
  },
  clearTextIcon: {
    alignItems: 'flex-end',
    flex: 1,
  },
  hasError: {
    borderColor: Colors.errorBorder,
    borderWidth: 1,
  },
  input: {
    color: Colors.primaryDark,
    fontSize: Metrics.Fonts.small,
    flex: 8,
    padding: 0,
    margin: 0,
  },
});
