import * as GeneralHelpers from './general';
import { ERROR_CODE } from '../constants/Messages';

describe('General Helper', () => {
  test('testProps returns both testID & accessibilityLabel', () => {
    expect(GeneralHelpers.testProps('test button')).toEqual({
      testID: 'test button',
      accessibilityLabel: 'test button',
    });
  });

  test('shouldLogout returns false / true based on status / errorCode', () => {
    expect(GeneralHelpers.shouldLogout(401, ERROR_CODE.ACCOUNT_HOLIDAY)).toBe(true);
    expect(GeneralHelpers.shouldLogout(403, ERROR_CODE.ACCOUNT_HOLIDAY)).toBe(true);
    expect(GeneralHelpers.shouldLogout(400, ERROR_CODE.NOT_REGISTERED)).toBe(true);
    expect(GeneralHelpers.shouldLogout(400, ERROR_CODE.INVALID_PLAN)).toBe(true);
    expect(GeneralHelpers.shouldLogout(400, ERROR_CODE.ACCOUNT_HOLIDAY)).toBe(false);
  });
});
