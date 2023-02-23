import apisauce from 'apisauce';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import AppCenter from 'appcenter';
import { Platform } from 'react-native';

import endsWith from 'lodash/endsWith';
import get from 'lodash/get';
import includes from 'lodash/includes';

import { ERROR_CODE } from '../constants/Messages';
import { PAYMENT_TYPE } from '../constants/Shared';

import * as Storage from '../helpers/Storage';
import * as TransformationHelpers from '../helpers/Transformation';

export const API_ENDPOINT = {
  ACTIVATE_STASH: 'connections/#MSISDN#/addons/timer/activate',
  DEREGISTER: 'auth/deregister/timer',
  GET_ACTIVE_PACK: 'connections/#MSISDN#/addons/timer/active',
  GET_BALANCE: 'connections/#MSISDN#/balance/timer',
  GET_OFFERS: 'connections/#MSISDN#/addons/timer',
  GET_OTP: 'auth/otp/timer',
  PURCHASE_PACK: 'connections/#MSISDN#/addons/timer/purchase',
  REFRESH_TOKEN: 'auth/token/refresh/timer',
  SYSTEM_INFO: 'system/info/timer',
  VERIFY_OTP: 'auth/token/otp',
};

const parseApiEndpoint = (url: string, placeholder?: string, replacement?: string) =>
  url.replace(placeholder, replacement);

const getCommonPayloadData = async () => {
  const installId = await AppCenter.getInstallId();
  const deviceId = await DeviceInfo.getDeviceId();
  const appVersion = Config.APP_VERSION;
  const manufacture = await DeviceInfo.getManufacturer();
  const platform = Platform.OS;
  const platformVersion = Platform.Version;
  return { appVersion, deviceId, manufacture, installId, platform, platformVersion };
};

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    // 30 second timeout...
    timeout: 30000,
  });

  const activateStash = async (packetInstanceId: string) => {
    const msisdn = await Storage.getMsisdn();
    const token = await Storage.getAccessToken();
    api.setHeader('Authorization', `Bearer ${token}`);
    return api.post(parseApiEndpoint(API_ENDPOINT.ACTIVATE_STASH, '#MSISDN#', msisdn), {
      packetInstanceId,
      ...getCommonPayloadData(),
    });
  };

  const deregister = async () => {
    const token = await Storage.getAccessToken();
    api.setHeader('Authorization', `Bearer ${token}`);
    api.axiosInstance.interceptors.response.use(
      response => {
        // Empty data is causing getting caught at Catch block
        // Manually adding empty object to bypass this issue
        if (response.status === 200 && response.data === '') {
          response.data = {};
        }
        return response;
      },
      error => Promise.reject(error),
    );
    return api.post(API_ENDPOINT.DEREGISTER);
  };

  const getActivePack = async () => {
    const msisdn = await Storage.getMsisdn();
    const token = await Storage.getAccessToken();
    api.setHeader('Authorization', `Bearer ${token}`);
    return api.post(parseApiEndpoint(API_ENDPOINT.GET_ACTIVE_PACK, '#MSISDN#', msisdn), {
      ...(await getCommonPayloadData()),
    });
  };

  const getBalance = async () => {
    const msisdn = await Storage.getMsisdn();
    const token = await Storage.getAccessToken();
    api.setHeader('Authorization', `Bearer ${token}`);
    return api.get(parseApiEndpoint(API_ENDPOINT.GET_BALANCE, '#MSISDN#', msisdn), {
      ...(await getCommonPayloadData()),
    });
  };

  const getNewToken = async () => {
    const refreshToken = await Storage.getRefreshToken();
    return api.post(API_ENDPOINT.REFRESH_TOKEN, {
      refreshToken,
      ...(await getCommonPayloadData()),
    });
  };

  const getOffers = async () => {
    const msisdn = await Storage.getMsisdn();
    const token = await Storage.getAccessToken();
    api.setHeader('Authorization', `Bearer ${token}`);
    return api.post(parseApiEndpoint(API_ENDPOINT.GET_OFFERS, '#MSISDN#', msisdn), {
      ...(await getCommonPayloadData()),
    });
  };

  const getOTP = async msisdn => {
    const OS = Platform.OS === 'android' ? await DeviceInfo.getBaseOs() : 'ios';
    if (__DEV__) {
      api.setHeader('x-debug', '1');
    }
    return api.post(API_ENDPOINT.GET_OTP, { msisdn, OS, ...(await getCommonPayloadData()) });
  };

  const getSystemInfo = () => {
    return api.get(API_ENDPOINT.SYSTEM_INFO);
  };

  const purchasePack = async (packetId: string, promoId?: string) => {
    const msisdn = await Storage.getMsisdn();
    const token = await Storage.getAccessToken();
    api.setHeader('Authorization', `Bearer ${token}`);
    return api.post(parseApiEndpoint(API_ENDPOINT.PURCHASE_PACK, '#MSISDN#', msisdn), {
      packetId,
      ...(promoId ? { promoId } : {}),
      ...(await getCommonPayloadData()),
    });
  };

  const verifyOTP = async (passcode, msisdn) => {
    return api.post(API_ENDPOINT.VERIFY_OTP, {
      msisdn,
      passcode,
      ...(await getCommonPayloadData()),
    });
  };

  api.addResponseTransform(async response => {
    const apiUrl = get(response, 'config.url');
    const status = get(response, 'status');
    const errorCode = get(response, 'data.errorCode');
    // 403 requires log out user
    if (status === 403 || errorCode === ERROR_CODE.NOT_REGISTERED) {
      await Storage.deregister();
    } else if (endsWith(apiUrl, '/addons/timer')) {
      if (status === 200) {
        const active = get(response, 'data.activePacks', null);
        const offers = get(response, 'data.offers', []);
        const stash = get(response, 'data.stash', []);
        const queue = get(response, 'data.queue', null);
        const paymentType = get(response, 'data.paymentType', PAYMENT_TYPE.POSTPAID);
        const msisdn = get(response, 'data.msisdn');

        const freeDataHours = TransformationHelpers.getFreePacks(offers);
        const timePacks = TransformationHelpers.getTimePacks(offers);
        const activePack = active ? TransformationHelpers.transformActivePack(active, queue) : null;
        const stashes = TransformationHelpers.transformMultipleStash(stash);
        response.data.activePack = activePack;
        response.data.freeDataHours = freeDataHours;
        response.data.timePacks = timePacks;
        response.data.stash = stashes;
        // msisdn could change and need to be updated
        if (msisdn) {
          await Storage.setMsisdn(msisdn);
        }
        // Asyncrounsly save pack data
        await Storage.savePacks(activePack, stashes, freeDataHours, timePacks, paymentType);
      }
      // check for getBalance API
    } else if (endsWith(apiUrl, '/balance/timer')) {
      if (status === 200) {
        const balance = Number(get(response, 'data.balanceValue', 0));
        await Storage.saveBalance(balance);
      }
      // check for getActivePack API
    } else if (endsWith(apiUrl, '/addons/timer/active')) {
      if (status === 200) {
        const active = get(response, 'data.activePacks', null);
        const activePack = active ? TransformationHelpers.transformActivePack(active) : null;
        response.data.activePack = activePack;
      }
    } else if (endsWith(apiUrl, '/addons/timer/purchase')) {
      if (status === 200) {
        // purchase API returns updated Balance and need to reflect on the App
        const balance = Number(get(response, 'data.currentBalance')) / 100;
        const purchasedPack = TransformationHelpers.transformActivePackFromPurchase(response.data);
        response.data.purchasedPack = purchasedPack;
        response.data.balance = balance;
      }
    }
  });

  // Refresh token logic
  api.axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      // handle error as usual if not token error
      if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // Logout user if token refresh failed
      if (includes(error.config.url, API_ENDPOINT.REFRESH_TOKEN)) {
        await Storage.deregister();
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      return getNewToken().then(async newResponse => {
        if (newResponse.ok) {
          await Storage.register(newResponse.data);
          // Re-try request with new token
          const { config } = error;
          const newToken = get(newResponse, 'data.accessToken', '');
          api.setHeader('Authorization', `Bearer ${newToken}`);
          return api[config.method](config.url, config.data);
        }
      });
    },
  );

  return {
    activateStash,
    deregister,
    getActivePack,
    getBalance,
    getNewToken,
    getOffers,
    getOTP,
    getSystemInfo,
    purchasePack,
    verifyOTP,
  };
};

export default {
  create,
};
