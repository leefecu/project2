import AsyncStorage from '@react-native-community/async-storage';
import get from 'lodash/get';
import reduce from 'lodash/reduce';
import reject from 'lodash/reject';

import { PAYMENT_TYPE } from '../constants/Shared';

export const STORAGE_ITEM_NAME = {
  ACCESS_TOKEN: 'accessToken',
  ACCOUNT_TYPE: 'accountType',
  ACTIVE_PACK: 'activePack',
  APP_OPENED: 'appOpened',
  BALANCE: 'balance',
  EXPIRY_DATE: 'expiredAt',
  FREE_DATA_HOURS: 'freeDataHours',
  MSISDN: 'msisdn',
  PAYMENT_TYPE: 'paymentType',
  REFRESH_TOKEN: 'refreshToken',
  STASH: 'stashes',
  TIME_PACKS: 'timePacks',
  UPGRADED: 'upgraded',
  USER_BLOCKED: 'userBlocked',
  USER_BLOCK_EXPIRY_TIME: 'userBlockExpiryTime',
};

export const setAccessToken = async (accessToken: string): boolean => {
  try {
    await AsyncStorage.setItem(STORAGE_ITEM_NAME.ACCESS_TOKEN, accessToken);
    return true;
  } catch (e) {
    return false;
  }
};

export const register = async data => {
  // If non-string is passed to AsyncStorage app crashes
  // thus setting empty string as default value
  const expiredAt = get(data, 'expiredAt', '');
  const accessToken = get(data, 'accessToken', '');
  const refreshToken = get(data, 'refreshToken', '');
  const msisdn = get(data, 'msisdn', '');
  const paymentType = get(data, 'paymentType', '');
  const accountType = get(data, 'accountType', '');

  try {
    await AsyncStorage.multiSet([
      [STORAGE_ITEM_NAME.ACCESS_TOKEN, accessToken],
      [STORAGE_ITEM_NAME.REFRESH_TOKEN, refreshToken],
      [STORAGE_ITEM_NAME.EXPIRY_DATE, `${expiredAt}`],
      [STORAGE_ITEM_NAME.MSISDN, msisdn],
      [STORAGE_ITEM_NAME.PAYMENT_TYPE, paymentType],
      [STORAGE_ITEM_NAME.ACCOUNT_TYPE, accountType],
    ]);
    return true;
  } catch (e) {
    return false;
  }
};

export const deregister = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_ITEM_NAME.ACCESS_TOKEN,
      STORAGE_ITEM_NAME.REFRESH_TOKEN,
      STORAGE_ITEM_NAME.EXPIRY_DATE,
      STORAGE_ITEM_NAME.MSISDN,
      STORAGE_ITEM_NAME.PAYMENT_TYPE,
      STORAGE_ITEM_NAME.ACCOUNT_TYPE,
      STORAGE_ITEM_NAME.ACTIVE_PACK,
      STORAGE_ITEM_NAME.STASH,
      STORAGE_ITEM_NAME.FREE_DATA_HOURS,
      STORAGE_ITEM_NAME.TIME_PACKS,
    ]);
    return true;
  } catch (e) {
    return false;
  }
};

export const setActivePackAndBalance = async (activePack: TActivePack, balance: number) => {
  try {
    await AsyncStorage.multiSet([
      [STORAGE_ITEM_NAME.ACTIVE_PACK, JSON.stringify(activePack)],
      [STORAGE_ITEM_NAME.BALANCE, `${balance}`],
    ]);
    return true;
  } catch (e) {
    return false;
  }
};

export const setActivePack = async (activePack: TActivePack) => {
  try {
    await AsyncStorage.setItem(STORAGE_ITEM_NAME.ACTIVE_PACK, JSON.stringify(activePack));
    return true;
  } catch (e) {
    return false;
  }
};

export const removeActivePack = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_ITEM_NAME.ACTIVE_PACK);
    return true;
  } catch (e) {
    return false;
  }
};

export const savePacks = async (
  activePack: TActivePack,
  stash: Array<TStash>,
  freeDataHours: Array<TFreeDataHour>,
  timePacks: Array<TTimePack>,
  paymentType: PAYMENT_TYPE,
) => {
  try {
    await AsyncStorage.multiSet([
      [STORAGE_ITEM_NAME.ACTIVE_PACK, JSON.stringify(activePack)],
      [STORAGE_ITEM_NAME.STASH, JSON.stringify(stash)],
      [STORAGE_ITEM_NAME.FREE_DATA_HOURS, JSON.stringify(freeDataHours)],
      [STORAGE_ITEM_NAME.TIME_PACKS, JSON.stringify(timePacks)],
      [STORAGE_ITEM_NAME.PAYMENT_TYPE, paymentType],
    ]);

    return true;
  } catch (e) {
    return false;
  }
};

export const saveBalance = async (balance: number) => {
  try {
    await AsyncStorage.setItem(STORAGE_ITEM_NAME.BALANCE, `${balance}`);
    return true;
  } catch (e) {
    return false;
  }
};

export const blockUser = async (expiryTime: number) => {
  try {
    await AsyncStorage.multiSet([
      [STORAGE_ITEM_NAME.USER_BLOCKED, 'true'],
      [STORAGE_ITEM_NAME.USER_BLOCK_EXPIRY_TIME, `${expiryTime}`],
    ]);
    return true;
  } catch (e) {
    return false;
  }
};

export const unBlockUser = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_ITEM_NAME.USER_BLOCKED,
      STORAGE_ITEM_NAME.USER_BLOCK_EXPIRY_TIME,
    ]);
    return true;
  } catch (e) {
    return false;
  }
};

/*
 * check if block period has passed
 * then unblock user and return true
 * otherwise return false;
 *
 * Need to convert expirtyTime to number as it's stored in string
 */
export const isUserBlocked = async () => {
  try {
    const blocked = await AsyncStorage.getItem(STORAGE_ITEM_NAME.USER_BLOCKED);
    const expiryTime = await AsyncStorage.getItem(STORAGE_ITEM_NAME.USER_BLOCK_EXPIRY_TIME);
    if (blocked && expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime > Number(expiryTime)) {
        await unBlockUser();
        return false;
      }
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getMsisdn = async () => {
  try {
    const msisdn = await AsyncStorage.getItem(STORAGE_ITEM_NAME.MSISDN);
    return msisdn;
  } catch (e) {
    return null;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(STORAGE_ITEM_NAME.ACCESS_TOKEN);
    return accessToken;
  } catch (e) {
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem(STORAGE_ITEM_NAME.REFRESH_TOKEN);
    return refreshToken;
  } catch (e) {
    return null;
  }
};

export const getPaymentType = async (): Promise<PAYMENT_TYPE> => {
  try {
    const paymentType = await AsyncStorage.getItem(STORAGE_ITEM_NAME.PAYMENT_TYPE);
    return paymentType || PAYMENT_TYPE.POSTPAID;
  } catch (e) {
    return PAYMENT_TYPE.POSTPAID;
  }
};

interface TPacks {
  activePack: TActivePack;
  stashes: Array<TStash>;
  freeDataHours: Array<TFreeDataHour>;
  timePacks: Array<TTimePack>;
}

export const getPacks = async (): Promise<TPacks> => {
  try {
    const packs = await AsyncStorage.multiGet([
      STORAGE_ITEM_NAME.ACTIVE_PACK,
      STORAGE_ITEM_NAME.STASH,
      STORAGE_ITEM_NAME.FREE_DATA_HOURS,
      STORAGE_ITEM_NAME.TIME_PACKS,
    ]);
    return reduce(packs, (acc, [key, value]) => ({ ...acc, [key]: JSON.parse(value) }), {});
  } catch (e) {
    return {
      activePack: {},
      stashes: [],
      freeDataHours: [],
      timePacks: [],
    };
  }
};

export const getActivePack = async (): Promise<TActivePack> => {
  try {
    const activePack = await AsyncStorage.getItem(STORAGE_ITEM_NAME.ACTIVE_PACK);
    return activePack ? JSON.parse(activePack) : null;
  } catch (e) {
    return null;
  }
};

export const getBalance = async () => {
  try {
    const balance = await AsyncStorage.getItem(STORAGE_ITEM_NAME.BALANCE);
    return Number(balance);
  } catch (e) {
    return null;
  }
};

export const removeFreeDataHourById = async (promoId: string) => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_ITEM_NAME.FREE_DATA_HOURS);
    if (json) {
      const freeDataHour = JSON.parse(json);
      const newFreeDataHour = reject(freeDataHour, pack => pack.promoId === promoId);
      await AsyncStorage.setItem(
        STORAGE_ITEM_NAME.FREE_DATA_HOURS,
        JSON.stringify(newFreeDataHour),
      );
    }
  } catch (e) {
    return null;
  }
};

export const appOpened = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_ITEM_NAME.APP_OPENED, `true`);
    return true;
  } catch (e) {
    return false;
  }
};

export const hasAppOpened = async () => {
  try {
    const opened = await AsyncStorage.getItem(STORAGE_ITEM_NAME.APP_OPENED);
    return opened && opened === 'true';
  } catch (e) {
    return false;
  }
};

export const setMsisdn = async (msisdn: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_ITEM_NAME.MSISDN, msisdn);
    return true;
  } catch (e) {
    return false;
  }
};

export const getStash = async (): Promise<Array<TStash>> => {
  try {
    const stash = await AsyncStorage.getItem(STORAGE_ITEM_NAME.STASH);
    return stash ? JSON.parse(stash) : [];
  } catch (e) {
    return [];
  }
};

export const saveActivePackAndStash = async (activePack: TActivePack, stash: Array<TStash>) => {
  try {
    await AsyncStorage.multiSet([
      [STORAGE_ITEM_NAME.ACTIVE_PACK, JSON.stringify(activePack)],
      [STORAGE_ITEM_NAME.STASH, JSON.stringify(stash)],
    ]);

    return true;
  } catch (e) {
    return false;
  }
};

export const setUpgraded = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_ITEM_NAME.UPGRADED, 'true');
    return true;
  } catch (e) {
    return false;
  }
};

export const getUpgraded = async (): Promise<boolean> => {
  try {
    const upgraded = await AsyncStorage.getItem(STORAGE_ITEM_NAME.UPGRADED);
    return !!upgraded;
  } catch (e) {
    return false;
  }
};
