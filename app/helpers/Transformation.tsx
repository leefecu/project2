import filter from 'lodash/filter';
import get from 'lodash/get';
import has from 'lodash/has';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const isPackAvailable = (offer: TOffer): boolean => {
  if (!has(offer, 'campaignEnd')) {
    return true;
  }
  const startTime = Number(offer.campaignStart) * 1000;
  const endTime = Number(offer.campaignEnd) * 1000;
  const currentTime = new Date().getTime();
  const campaignOn = currentTime >= startTime && currentTime <= endTime;

  const daysOfWeek = get(offer, 'validDayTimes.daysOfWeek', null);
  const packAvailableToday = daysOfWeek ? daysOfWeek[DAYS[new Date().getDay()]] === 'true' : true;

  return campaignOn && packAvailableToday;
};

export const transformActivePack = (
  activePack: TActiveResponse,
  queue: TQueueResponse | null,
): TActivePack => ({
  duration: Number(activePack.packDuration),
  startTime: Number(activePack.packStartTimeUtc) * 1000, // Convert to micro second
  endTime:
    (queue && Number(queue.queueEndTimeUtc) > 0
      ? Number(queue.queueEndTimeUtc)
      : Number(activePack.packEndTimeUtc)) * 1000, // Convert to micro second
  packTitle: activePack.packTitle,
});

export const transformActivePackFromPurchase = (newPurchse: TNewPurchase): TActivePack => ({
  duration: Number(newPurchse.duration),
  startTime: Number(newPurchse.newPackStartTimeUtc) * 1000, // Convert to micro second
  endTime: Number(newPurchse.newPackEndTimeUtc) * 1000, // Convert to micro second
  packTitle: `${newPurchse.duration} minutes`,
});

export const transformOfferToPack = (offer: TOffer): TTimePack => {
  let messageBody: string = '';
  let messageTitle: string = '';
  if (offer.messagesOfTheDayForThisPacket && offer.messagesOfTheDayForThisPacket.length > 0) {
    messageBody = get(offer.messagesOfTheDayForThisPacket[0], 'messageBody', '');
    messageTitle = get(offer.messagesOfTheDayForThisPacket[0], 'messageTitle', '');
  }
  return {
    disabled: !isPackAvailable(offer),
    duration: Number(offer.duration),
    messageBody,
    messageTitle,
    packName: offer.packName,
    packetId: offer.packetId,
    price: Number(offer.packPrice),
  };
};

export const transformOffersToPacks = (offers: Array<TOffer>): Array<TTimePack> =>
  sortBy(map(offers, transformOfferToPack), offer => Number(offer.duration));

export const transformPromotionToFreeDatahour = (
  promotion: TPromotion,
  offer: TOffer,
): TFreeDataHour => ({
  duration: Number(offer.duration),
  packetId: offer.packetId,
  packName: offer.packName,
  promoId: promotion.promoId || '',
  title: promotion.promoTitle || 'Free Data Hour',
});

export const transformPromotionsToFreeDataHours = (
  promotions: Array<TPromotion>,
  offer: TOffer,
): Array<TFreeDataHour> =>
  map(promotions, (promotion: TPromotion) => transformPromotionToFreeDatahour(promotion, offer));

export const transformStash = (stash: TStashResponse): TStash => ({
  duration: Number(stash.duration),
  grantedForFree: stash.grantedForFree === 'true',
  packetId: stash.packetId,
  packetInstanceId: stash.packetInstanceId,
  packName: stash.packName || '',
  packTitle: stash.packTitle || '',
  packActivationsRemaining: Number(stash.packActivationsRemaining),
});

export const transformMultipleStash = (stashes: Array<TStashResponse>): Array<TStash> =>
  sortBy(map(stashes, transformStash), [stash => stash.grantedForFree, stash => stash.duration]);

type MultiplePacks = {
  freeDataHours: Array<TFreeDataHour>;
  timePacks: Array<TTimePack>;
};

const isFreeDataHour = (promotion: TPromotion): boolean => promotion.plannedPack === true;

export const getTimePacks = (offers: Array<TOffer>): Array<TTimePack> =>
  transformOffersToPacks(offers);

export const getFreePacks = (offers: Array<TOffer>): Array<TFreeDataHour> =>
  reduce(
    offers,
    (packs: Array<TFreeDataHour>, offer: TOffer): Array<TFreeDataHour> => {
      if (offer.promotions) {
        const promotions: Array<TFreeDataHour> = transformPromotionsToFreeDataHours(
          filter(offer.promotions, isFreeDataHour),
          offer,
        );
        return packs.concat(promotions);
      }
      return packs;
    },
    [],
  );

export const convertStashToActivePAck = (
  stash: TStash,
  currentActivePack?: TActivePack,
): TActivePack => {
  if (currentActivePack) {
    return {
      ...currentActivePack,
      endTime: currentActivePack.endTime + stash.duration * 60 * 1000,
    };
  }

  const now = new Date();
  const startTime = now.getTime();
  const endTime = now.getTime() + stash.duration * 60 * 1000;
  return {
    duration: stash.duration,
    startTime,
    endTime,
    packTitle: stash.packTitle,
  };
};
