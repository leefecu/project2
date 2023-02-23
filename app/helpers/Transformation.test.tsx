import * as TransformationHelpers from './Transformation';

describe('Transformation Helpers', () => {
  test('isPackAvailable return true if campaign is on', () => {
    const offer = {
      allowedToBuyAnotherPacketOfThisType: null,
      campaignEnd: '7289521200',
      campaignStart: '1563853227',
      duration: '120',
      packPrice: '20',
      numberOfPacksForPrice: '1',
      packTitle: '2 Hour Pack',
      packName: 'Data Clock  $20 120 Minutes',
      packetId: '5cd39b549fbfa499e27cfd8c',
      messagesOfTheDayForThisPacket: null,
      promotions: null,
    };
    expect(TransformationHelpers.isPackAvailable(offer)).toBe(true);
  });

  test('isPackAvailable return false if campaign is off', () => {
    const offer = {
      allowedToBuyAnotherPacketOfThisType: null,
      campaignEnd: '1565581227',
      campaignStart: '1563853227',
      duration: '120',
      packPrice: '20',
      numberOfPacksForPrice: '1',
      packTitle: '2 Hour Pack',
      packName: 'Data Clock  $20 120 Minutes',
      packetId: '5cd39b549fbfa499e27cfd8c',
      messagesOfTheDayForThisPacket: null,
      promotions: null,
    };
    expect(TransformationHelpers.isPackAvailable(offer)).toBe(false);
  });

  test('isPackAvailable return true if campaign is on and pack is available today', () => {
    const offer = {
      allowedToBuyAnotherPacketOfThisType: null,
      campaignEnd: '7289521200',
      campaignStart: '1563853227',
      duration: '120',
      packPrice: '20',
      numberOfPacksForPrice: '1',
      packTitle: '2 Hour Pack',
      packName: 'Data Clock  $20 120 Minutes',
      packetId: '5cd39b549fbfa499e27cfd8c',
      messagesOfTheDayForThisPacket: null,
      promotions: null,
      validDayTimes: {
        daysOfWeek: {
          friday: 'true',
          monday: 'true',
          saturday: 'true',
          sunday: 'true',
          thursday: 'true',
          tuesday: 'true',
          wednesday: 'true',
        },
      },
    };
    expect(TransformationHelpers.isPackAvailable(offer)).toBe(true);
  });

  test('isPackAvailable return false if campaign is on and pack is not available today', () => {
    const offer = {
      allowedToBuyAnotherPacketOfThisType: null,
      campaignEnd: '7289521200',
      campaignStart: '1563853227',
      duration: '120',
      packPrice: '20',
      numberOfPacksForPrice: '1',
      packTitle: '2 Hour Pack',
      packName: 'Data Clock  $20 120 Minutes',
      packetId: '5cd39b549fbfa499e27cfd8c',
      messagesOfTheDayForThisPacket: null,
      promotions: null,
      validDayTimes: {
        daysOfWeek: {
          friday: 'false',
          monday: 'false',
          saturday: 'false',
          sunday: 'false',
          thursday: 'false',
          tuesday: 'false',
          wednesday: 'false',
        },
      },
    };
    expect(TransformationHelpers.isPackAvailable(offer)).toBe(false);
  });

  test('transformOfferToPack', () => {
    const offer = {
      allowedToBuyAnotherPacketOfThisType: null,
      campaignEnd: '7289521200',
      campaignStart: '1563853227',
      duration: '60',
      packPrice: '10',
      numberOfPacksForPrice: '1',
      packTitle: '1 Hour Pack',
      packName: 'Data Clock Consumer $10 60 Minutes',
      packetId: '5cd39b549fbfa499e27cfd8b',
      messagesOfTheDayForThisPacket: [
        {
          messageBody: 'This is a testing packet level notification.',
          messageId: '5cd39b549fbfa499e27cfd9f',
          messagePriority: '10',
          messageTitle: 'Testing PACKET Notification',
        },
      ],
      promotions: null,
    };
    expect(TransformationHelpers.transformOfferToPack(offer)).toEqual({
      disabled: false,
      duration: 60,
      packName: 'Data Clock Consumer $10 60 Minutes',
      messageBody: 'This is a testing packet level notification.',
      messageTitle: 'Testing PACKET Notification',
      packetId: '5cd39b549fbfa499e27cfd8b',
      price: 10,
    });
  });

  test('transformPromotionToFreeDatahour', () => {
    const offer = {
      allowedToBuyAnotherPacketOfThisType: null,
      campaignEnd: '7289521200',
      campaignStart: '1563853227',
      duration: '60',
      packPrice: '10',
      numberOfPacksForPrice: '1',
      packTitle: '1 Hour Pack',
      packName: 'Data Clock Consumer $10 60 Minutes',
      packetId: '5cd39b549fbfa499e27cfd8b',
      messagesOfTheDayForThisPacket: null,
      promotions: null,
    };
    const promotion = {
      campaignEnd: '1574387490',
      campaignStart: '1569207063',
      numberOfPacksForPrice: '1',
      plannedPack: true,
      promoId: '5d88347ade149877440c6fe9',
      promoPrice: '0',
      promoTitle: 'Free Data Hour',
    };
    expect(TransformationHelpers.transformPromotionToFreeDatahour(promotion, offer)).toEqual({
      duration: 60,
      packetId: '5cd39b549fbfa499e27cfd8b',
      promoId: '5d88347ade149877440c6fe9',
      packName: 'Data Clock Consumer $10 60 Minutes',
      title: 'Free Data Hour',
    });
  });

  test('getTimePacks with empty offers', () => {
    expect(TransformationHelpers.getTimePacks([])).toEqual([]);
  });

  test('getFreePacks with empty offers', () => {
    expect(TransformationHelpers.getFreePacks([])).toEqual([]);
  });

  test('getTimePacks', () => {
    const offers = [
      {
        allowedToBuyAnotherPacketOfThisType: null,
        campaignEnd: '7289521200',
        campaignStart: '1563853227',
        currentPrice: '20',
        duration: '120',
        packPrice: '20',
        numberOfPacksForPrice: '1',
        packTitle: '2 Hour Pack',
        packName: 'Data Clock  $20 120 Minutes',
        packetId: '5cd39b549fbfa499e27cfd8c',
        messagesOfTheDayForThisPacket: null,
        promotions: null,
      },
      {
        allowedToBuyAnotherPacketOfThisType: null,
        campaignEnd: '1565581227',
        campaignStart: '1563853227',
        currentPrice: '20',
        duration: '120',
        packPrice: '20',
        numberOfPacksForPrice: '1',
        packTitle: '2 Hour Pack',
        packName: 'Data Clock  $20 120 Minutes',
        packetId: '5cd39b549fbfa499e27cfd8d',
        messagesOfTheDayForThisPacket: null,
        promotions: null,
      },
    ];

    expect(TransformationHelpers.getTimePacks(offers)).toEqual([
      {
        disabled: false,
        duration: 120,
        packName: 'Data Clock  $20 120 Minutes',
        messageBody: '',
        messageTitle: '',
        packetId: '5cd39b549fbfa499e27cfd8c',
        price: 20,
      },
      {
        disabled: true,
        duration: 120,
        messageBody: '',
        messageTitle: '',
        packName: 'Data Clock  $20 120 Minutes',
        packetId: '5cd39b549fbfa499e27cfd8d',
        price: 20,
      },
    ]);
  });

  test('getFreePacks', () => {
    const offers = [
      {
        allowedToBuyAnotherPacketOfThisType: null,
        campaignEnd: '7289521200',
        campaignStart: '1563853227',
        currentPrice: '20',
        duration: '120',
        packPrice: '20',
        numberOfPacksForPrice: '1',
        packTitle: '2 Hour Pack',
        packName: 'Data Clock  $20 120 Minutes',
        packetId: '5cd39b549fbfa499e27cfd8c',
        messagesOfTheDayForThisPacket: null,
        promotions: [
          {
            campaignEnd: '1574387490',
            campaignStart: '1569207063',
            numberOfPacksForPrice: '1',
            plannedPack: true,
            promoId: '5d88347ade149877440c6fe9',
            promoPrice: '0',
            promoTitle: 'Free Data Hour',
          },
        ],
      },
    ];

    expect(TransformationHelpers.getFreePacks(offers)).toEqual([
      {
        duration: 120,
        packetId: '5cd39b549fbfa499e27cfd8c',
        promoId: '5d88347ade149877440c6fe9',
        packName: 'Data Clock  $20 120 Minutes',
        title: 'Free Data Hour',
      },
    ]);
  });

  test('transformActivePack', () => {
    const activePack = {
      packDuration: 59.0833333333333,
      packStartTimeUtc: '1567715806',
      packEndTimeUtc: '1567719360',
      packTitle: 'Free Data Hour',
    };
    const queue = {
      queueDuration: 30,
      queueEndTimeUtc: '1567721160',
      queueStartTimeUtc: '1567719360',
    };
    expect(TransformationHelpers.transformActivePack(activePack, null)).toEqual({
      duration: 59.0833333333333,
      startTime: 1567715806000,
      endTime: 1567719360000,
      packTitle: 'Free Data Hour',
    });
    expect(TransformationHelpers.transformActivePack(activePack, queue)).toEqual({
      duration: 59.0833333333333,
      startTime: 1567715806000,
      endTime: 1567721160000,
      packTitle: 'Free Data Hour',
    });
  });
});
