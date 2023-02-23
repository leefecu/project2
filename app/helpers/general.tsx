import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import { ERROR_CODE } from '../constants/Messages';
import { SYSTEM_RESPONSE } from '../constants/Shared';

import * as API from '../helpers/Api';

export const noop = () => {};

interface TTestProp {
  testID: string;
  accessibilityLabel: string;
}
export const testProps = (id: string): TTestProp => ({
  testID: id,
  accessibilityLabel: id,
});

export const shouldLogout = (status: number | undefined, errorCode: ERROR_CODE): boolean =>
  status === 401 ||
  status === 403 ||
  errorCode === ERROR_CODE.NOT_REGISTERED ||
  errorCode === ERROR_CODE.INVALID_PLAN ||
  errorCode === ERROR_CODE.QD_ISSUE;

export const systemCheck = async (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const systemInfo = await API.checkSystemInfo();
  if (systemInfo === SYSTEM_RESPONSE.CONTINUE) {
    return;
  }
  navigation.navigate(systemInfo === SYSTEM_RESPONSE.MAINTENANCE ? 'Maintenance' : 'Upgrade');
};
