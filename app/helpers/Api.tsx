import get from 'lodash/get';
import reject from 'lodash/reject';
import Config from 'react-native-config';
import compareVersions from 'compare-versions';
import { Platform } from 'react-native';

import * as Storage from './Storage';
import { createExpiryNotification } from './Notification';
import { convertStashToActivePAck } from './Transformation';
import API from '../services/Api';

import { SYSTEM_RESPONSE } from '../constants/Shared';

const api = API.create();

export const purchasePack = async (packetId: string, promoId?: string) => {
  const response = await api.purchasePack(packetId, promoId);
  const currentActivePack = await Storage.getActivePack();
  if (response.ok) {
    const balance = get(response, 'data.balance');
    const purchasedPack = get(response, 'data.purchasedPack');
    const activePack = currentActivePack
      ? {
          ...currentActivePack,
          endTime: purchasedPack.endTime,
        }
      : purchasedPack;

    createExpiryNotification(purchasedPack.endTime);
    await Storage.setActivePackAndBalance(activePack, balance);
    return response;
  }
  return response;
};

export const activateStash = async (stash: TStash) => {
  const response = await api.activateStash(stash.packetInstanceId);
  if (response.ok) {
    const currentActivePack = await Storage.getActivePack();
    const currentStash = await Storage.getStash();
    const newActivePack = convertStashToActivePAck(stash, currentActivePack);
    const newStash = reject(
      currentStash,
      (target: TStash) => target.packetInstanceId === stash.packetInstanceId,
    );

    createExpiryNotification(newActivePack.endTime);
    await Storage.saveActivePackAndStash(newActivePack, newStash);
    return response;
  }
  return response;
};

export const checkSystemInfo = async (): Promise<SYSTEM_RESPONSE> => {
  const response = await api.getSystemInfo();
  if (response.ok) {
    const maintenance: boolean = get(response, 'data.maintenance', false);
    if (maintenance) {
      return SYSTEM_RESPONSE.MAINTENANCE;
    }
    const minVersion = get(response, `data.${Platform.OS}`);
    const appVersion = Config.APP_VERSION;

    return compareVersions.compare(appVersion, minVersion, '>=')
      ? SYSTEM_RESPONSE.CONTINUE
      : SYSTEM_RESPONSE.UPGRADE;
  }
  return SYSTEM_RESPONSE.CONTINUE;
};
