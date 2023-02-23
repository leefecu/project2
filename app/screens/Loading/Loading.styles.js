import { StyleSheet } from 'react-native';

import Colors from '../../themes/Colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
  },
  splashLogo: {
    alignSelf: 'center',
    width: 320,
    height: 320,
  },
});
