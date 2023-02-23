import { TERROR_MESSAGE, ERROR_CODE, ERROR_MESSAGES } from '../constants/Messages';
import { ACTION_TYPE } from '../constants/Shared';

export const getErrorMessage = (errorCode: ERROR_CODE, action?: ACTION_TYPE): TERROR_MESSAGE => {
  switch (errorCode) {
    case ERROR_CODE.ACCOUNT_HOLIDAY:
    case ERROR_CODE.INVALID_ACCOUNT_STATUS: {
      if (action === ACTION_TYPE.REGISTER) {
        return ERROR_MESSAGES.NOT_ELIGIBLE;
      }
      return ERROR_MESSAGES.ACCOUNT_SUSPENDED;
    }
    case ERROR_CODE.CREDIT_BARRED:
      return ERROR_MESSAGES.CREDIT_LIMIT;
    case ERROR_CODE.EXPIRED:
      return ERROR_MESSAGES.EXPIRED;
    case ERROR_CODE.INSUFFICIENT_CREDIT:
      return ERROR_MESSAGES.LOW_BALANCE;
    case ERROR_CODE.INVALID_PASSCODE:
      return ERROR_MESSAGES.INVALID_PASSCODE;
    case ERROR_CODE.INVALID_ACCOUNT:
    case ERROR_CODE.INVALID_ACCOUNT_TYPE:
    case ERROR_CODE.INVALID_ROLE:
      return ERROR_MESSAGES.ROLE_PERMISSION;
    case ERROR_CODE.BLOCKED: {
      if (action === ACTION_TYPE.REGISTER) {
        return ERROR_MESSAGES.NOT_ELIGIBLE;
      }
      if (action === ACTION_TYPE.PURCHASE) {
        return ERROR_MESSAGES.ACCOUNT_SUSPENDED;
      }
      return ERROR_MESSAGES.NOT_ELIGIBLE;
    }
    case ERROR_CODE.INVALID_PLAN:
      return ERROR_MESSAGES.NOT_ELIGIBLE;
    case ERROR_CODE.DEVICE_NOT_MATCH:
      return ERROR_MESSAGES.DEVICE_NOT_MATCH;
    case ERROR_CODE.NOT_REGISTERED:
      return ERROR_MESSAGES.NOT_REGISTERED;
    case ERROR_CODE.SPEND_LIMIT_REACHED:
      return ERROR_MESSAGES.SPEND_LIMIT;
    case ERROR_CODE.TOO_MANY_ATTEMPT:
      return ERROR_MESSAGES.TOO_MANY_ATTEMPT;
    case ERROR_CODE.PACK_STACK_LIMIT_REACHED:
      return ERROR_MESSAGES.PACK_STACK_LIMIT_REACHED;
    case ERROR_CODE.QD_ISSUE: {
      if (action === ACTION_TYPE.DASHBOARD) {
        return ERROR_MESSAGES.NOT_ELIGIBLE;
      }
      return ERROR_MESSAGES.GENERIC;
    }
    default:
      return ERROR_MESSAGES.GENERIC;
  }
};