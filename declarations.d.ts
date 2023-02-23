interface PacketDailyMSG {
  messageBody: string;
  messageId: string;
  messagePriority: string;
  messageTitle: string;
}

interface TActiveResponse {
  packDuration: number;
  packEndTimeUtc: string;
  packStartTimeUtc: string;
  packTitle: string;
}

interface TActivePack {
  duration: number;
  startTime: number;
  endTime: number;
  packTitle: string;
}

interface TQueueResponse {
  queueDuration: number;
  queueEndTimeUtc: string;
  queueStartTimeUtc: string;
}

interface TPromotion {
  campaignEnd: string;
  campaignStart: string;
  numberOfPacksForPrice: string;
  plannedPack: boolean;
  promoId: string;
  promoPrice: string;
  promoTitle: string;
  validDayTimes?: {
    daysOfWeek: {
      friday: string;
      monday: string;
      saturday: string;
      sunday: string;
      thursday: string;
      tuesday: string;
      wednesday: string;
    };
  };
}

interface TOffer {
  allowedToBuyAnotherPacketOfThisType: boolean | null;
  campaignEnd: string;
  campaignStart: string;
  duration: string;
  numberOfPacksForPrice: string;
  packPrice: string;
  packName: string;
  packTitle: string;
  packetId: string;
  messagesOfTheDayForThisPacket: Array<PacketDailyMSG> | null;
  promotions: Array<TPromotion> | null;
  validDayTimes?: {
    daysOfWeek: {
      friday: string;
      monday: string;
      saturday: string;
      sunday: string;
      thursday: string;
      tuesday: string;
      wednesday: string;
    };
  };
}

interface TStash {
  duration: number;
  grantedForFree: boolean;
  packetId: string;
  packetInstanceId: string;
  packName: string;
  packTitle: string;
  packActivationsRemaining: number;
}

interface TStashResponse {
  duration: string;
  grantedForFree: string;
  packetId: string;
  packetInstanceId: string;
  packName: string;
  packTitle: string;
  packActivationsRemaining: string;
  purchaseDate: string;
}

interface TTimePack {
  disabled?: boolean;
  duration: number;
  messageBody?: string;
  messageTitle?: string;
  packName: string;
  packetId: string;
  price: number;
}

interface TFreeDataHour {
  duration: number;
  packetId: string;
  packName: string;
  promoId: string;
  title: string;
}

interface TNewPurchase {
  currentBalance: number;
  duration: number;
  newPackEndTimeUtc: string;
  newPackStartTimeUtc: string;
}

interface TMigrationData {
  number: string;
  upgrade: boolean;
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';

  const content: React.ComponentClass<SvgProps, any>;
  export default content;
}

declare module 'react-native-image-sequence' {
  import { Component } from 'react';
  import { StyleProp, ViewStyle } from 'react-native';

  interface ImageSequenceProps {
    /** An array of source images. Each element of the array should be the result of a call to require(imagePath). */
    images: any[];
    /** Which index of the images array should the sequence start at. Default: 0 */
    startFrameIndex?: number;
    /** Playback speed of the image sequence. Default: 24 */
    framesPerSecond?: number;
    /** Should the sequence loop. Default: true */
    loop?: boolean;
    style: StyleProp<ViewStyle>;
  }

  declare class ImageSequence extends Component<ImageSequenceProps> {}

  export default ImageSequence;
}

declare module 'react-native-sms-retriever' {
  interface SMS_RETRIEVER {
    requestPhoneNumber: any;
    startSmsRetriever: any;
    addSmsListener: any;
    removeSmsListener: any;
  }

  const SmsRetriever: SMS_RETRIEVER;
  export default SmsRetriever;
}

declare module 'react-native-carrier-info' {
  interface CARRIER_INFO {
    allowsVOIP: any;
    carrierName: any;
    isoCountryCode: any;
    mobileCountryCode: any;
    mobileNetworkCode: any;
    mobileNetworkOperator: any;
  }

  const CarrierInfo: CARRIER_INFO;
  export default CarrierInfo;
}

declare module 'react-native-orientation' {
  interface ORIENTATION {
    getOrientation: () => void;
    getSpecificOrientation: () => void;
    lockToPortrait: () => void;
    lockToLandscape: () => void;
    lockToLandscapeRight: () => void;
    lockToLandscapeLeft: () => void;
    unlockAllOrientations: () => void;
    addOrientationListener: () => void;
    removeOrientationListener: () => void;
    addSpecificOrientationListener: () => void;
    removeSpecificOrientationListener: () => void;
    getInitialOrientation: () => void;
  }

  const orientation: ORIENTATION;
  export default orientation;
}
