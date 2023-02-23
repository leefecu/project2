// 4 hours in milliseconds
// This value is configurable from Backend API
export const DEFAULT_COOLDOWN_PERIOD = 4 * 60 * 60 * 1000;

// 300 milliseconds
export const THROTTLING = 300;

export enum PAYMENT_TYPE {
  PREPAID = 'Prepaid',
  POSTPAID = 'Postpaid',
}

export enum ACTION_TYPE {
  DASHBOARD = 'DASHBOARD',
  REGISTER = 'REGISTER',
  PURCHASE = 'PURCHASE',
}

export const NOTIFICATION_CHANNEL_ID = 'expiryNotification';

export enum SYSTEM_RESPONSE {
  CONTINUE = 'CONTINUE',
  MAINTENANCE = 'MAINTENANCE',
  UPGRADE = 'UPGRADE',
}

export enum PACK_TYPE {
  TIME_PACK = 'TimePack',
  FREE_PACK = 'FreePack',
}
