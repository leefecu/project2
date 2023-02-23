import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { height, width } = Dimensions.get('window');

export default {
  buttonBorderRadius: 32,
  inputBorderRadius: 5,
  borderWidth: 1,
  smallestPadding: 4,
  smallerPadding: 8,
  smallPadding: 12,
  basePadding: 16,
  doublePadding: 24,
  largePadding: 36,
  largerPadding: 48,
  smallestMargin: 2,
  smallerMargin: 4,
  smallMargin: 8,
  baseMargin: 16,
  doubleMargin: 32,
  smallLineSpacing: 12,
  baseLineSpacing: 24,
  largeLineSpacing: 36,
  height,
  width,
  buttonMaxWidth: 340,
  smallButtonMaxWidth: 250,
  statusBarHeight: getStatusBarHeight(),
  smallIOSDevice: width <= 320,
  Fonts: {
    h1: 42,
    h2: 32,
    h3: 28,
    h4: 24,
    h5: 20,
    h6: 16,
    normal: 20,
    small: 17,
    smaller: 15,
    smallest: 13,
  },
};
