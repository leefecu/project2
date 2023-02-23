export interface TERROR_MESSAGE {
  errorButtonLabel: string;
  errorMessage: string;
  errorTitle: string;
}

export const LOGOUT_SUCCESS_MESSAGE = {
  errorButtonLabel: 'OK',
  errorMessage: 'You have successfully deregistered Data Clock.',
  errorTitle: 'See ya soon',
};

type TERROR_MESSAGES = {
  [type: string]: TERROR_MESSAGE;
};

export enum ERROR_CODE {
  ACCOUNT_HOLIDAY = 'ACCOUNT_HOLIDAY',
  BLOCKED = 'BLOCKED',
  CREDIT_BARRED = 'CREDIT_BARRED',
  DEVICE_NOT_MATCH = 'DEVICE_NOT_MATCH',
  EXPIRED = 'EXPIRED',
  INSUFFICIENT_CREDIT = 'INSUFFICIENT_CREDIT',
  INVALID_ACCOUNT = 'INVALID_ACCOUNT',
  INVALID_ACCOUNT_STATUS = 'INVALID_ACCOUNT_STATUS',
  INVALID_ACCOUNT_TYPE = 'INVALID_ACCOUNT_TYPE',
  INVALID_PASSCODE = 'INVALID_PASSCODE',
  INVALID_PLAN = 'INVALID_PLAN',
  INVALID_ROLE = 'INVALID_ROLE',
  NOT_REGISTERED = 'NOT_REGISTERED',
  PACK_STACK_LIMIT_REACHED = 'PACK_STACK_LIMIT_REACHED',
  SPEND_LIMIT_REACHED = 'SPEND_LIMIT_REACHED',
  TOO_MANY_ATTEMPT = 'TOO_MANY_ATTEMPT',
  QD_ISSUE = '3102',
}

export const ERROR_MESSAGES: TERROR_MESSAGES = {
  GENERIC: {
    errorButtonLabel: 'Try again',
    errorMessage: 'Yikes! Something went wrong. Please try again.',
    errorTitle: 'OOPS',
  },
  OFFLINE: {
    errorButtonLabel: 'Try again',
    errorMessage:
      "Make sure you're connected to wifi or mobile data, and airplane mode is switched off.",
    errorTitle: 'Using Data Clock',
  },
  NOT_ELIGIBLE: {
    errorButtonLabel: 'Go back',
    errorMessage:
      "Huh?! This number isn't eligible for Data Clock. Find out why in our Terms & Conditions.",
    errorTitle: 'HUH?!',
  },
  INVALID_PASSCODE: {
    errorButtonLabel: 'Try again',
    errorMessage: 'Whoopsy daisy! The code you entered does not match the one we sent you.',
    errorTitle: 'OOPS',
  },
  TOO_MANY_ATTEMPT: {
    errorButtonLabel: 'Start again',
    errorMessage: "You'll need to start the process again after multiple wrong entries.",
    errorTitle: 'Geeeeeeez!',
  },
  EXPIRED: {
    errorButtonLabel: 'Go back',
    errorMessage: 'Your code has expired. Please go back and request a new text code to continue.',
    errorTitle: 'TOO SLOW',
  },
  MAINTENANCE: {
    errorButtonLabel: 'Try again',
    errorMessage: 'Data Clock is going through maintenance. Check back soon.',
    errorTitle: 'OOPS',
  },
  LOW_BALANCE: {
    errorButtonLabel: 'Try again',
    errorMessage: 'Your Prepay balance is too low to buy this. Please top up and try again.',
    errorTitle: 'OOPS',
  },
  PACK_STACK_LIMIT_REACHED: {
    errorButtonLabel: 'OK',
    errorMessage: "You'll need to use some data before buying more.",
    errorTitle: 'Limit reached',
  },
  SPEND_LIMIT: {
    errorButtonLabel: 'Try again',
    errorMessage:
      "You've hit your Spend Control Limit. Increase this in the 2degrees App and try again.",
    errorTitle: 'OOPS',
  },
  ROLE_PERMISSION: {
    errorButtonLabel: 'Try again',
    errorMessage:
      "Looks like your settings won't allow this. Check with your account holder to change things.",
    errorTitle: 'OOPS',
  },
  CREDIT_LIMIT: {
    errorButtonLabel: 'Try again',
    errorMessage:
      "Sorry, you've reached your Credit Limit and can't nab this pack. To find out more, call 200.",
    errorTitle: 'OOPS',
  },
  ACCOUNT_SUSPENDED: {
    errorButtonLabel: 'Try again',
    errorMessage:
      "You can't grab this pack as your account is suspended. To find out more, call 200.",
    errorTitle: 'OOPS',
  },
  DEVICE_NOT_MATCH: {
    errorButtonLabel: 'OK',
    errorMessage:
      'Looks like you have registered with another device. Please re-register using this device',
    errorTitle: 'HUH?!',
  },
  NOT_REGISTERED: {
    errorButtonLabel: 'OK',
    errorMessage: 'You’ve been deregistered from the Data Clock app.',
    errorTitle: 'HUH?!',
  },
};

export const EXPIRY_NOTIFICATION = {
  TITLE: 'Expiry Notification',
  WARNING_EXPIRY_MESSAGE: 'Your time is about to expire. Buy a pack to keep using Data Clock.',
  WARNING_EXPIRY_MESSAGE_ID: '1',
  EXPIRY_MESSAGE: 'You are out of time. Buy a pack to keep using Data Clock.',
  EXPIRY_MESSAGE_ID: '2',
};

export const MIGRATION_NOTIFICATION = {
  TITLE: 'Data not displaying',
  MESSAGE:
    'You still have your data, you just can’t see it. Unfortunately, this update will hide the data you purchased on the old app. We’re sorry for this unavoidable — one off — inconvenience.',
  BUTTON: 'OK',
};
