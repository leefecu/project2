import { NativeModules, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import CarrierInfo from 'react-native-carrier-info';
import RNFS from 'react-native-fs';

const NZ_MCC = '530';
const NZ_COUNTRY_CODE = 'nz';
const IS_IOS = Platform.OS === 'ios';

const NetworkInfo = NativeModules.RNNetworkInfo;

export const isSimulator = async (): Promise<boolean> => {
  const isEmulator = await DeviceInfo.isEmulator();
  return isEmulator;
};

export const isSimIn = async () => {
  // react-native-carrier-info does not work in simulator
  if (await isSimulator()) {
    return true;
  }

  try {
    // mobileCountryCode method fails when no SIM card in the device
    await CarrierInfo.mobileCountryCode();
    return true;
  } catch (e) {
    return false;
  }
};

export const checkForRoaming = async (debug: boolean = false): Promise<boolean> => {
  // react-native-carrier-info does not work in simulator
  if (await isSimulator()) {
    return debug;
  }

  try {
    if (Platform.OS === 'ios') {
      const operatorPlist = await NativeModules.NetworkInfo.getOperatorPlist();
      const mcc = operatorPlist.match(/\d+\/carrier.plist/g);
      if (mcc && mcc.length > 0) {
        return mcc[0].substr(0, 3) !== NZ_MCC;
      }
      return false;
    }
    const countryCode = await NetworkInfo.isoCountryCode();
    return countryCode !== NZ_COUNTRY_CODE;
  } catch (e) {
    return false;
  }
};

const majorVersionIOS: number = parseInt(`${Platform.Version}`, 10);

export const isAutoFillSupported: boolean = IS_IOS && majorVersionIOS >= 12;

// Figured out how current(old) DataClock app stores msisdn
// it's stored in xml file
// shared_prefs/nz.co.twodegreesmobile.comptelfwd.smpl.Account.xml
const msisdnFileName = 'nz.co.twodegreesmobile.comptelfwd.smpl.Account.xml';
const msisdnFolderName = 'shared_prefs';
const msisdnRegex = /com.comptel.smpl.interaction.Account.PHONE_NUMBER_KEY">\d+<\/string/g;

export const getExistingMsisdn = async (): Promise<TMigrationData> => {
  if (IS_IOS) {
    try {
      const msisdn = await NativeModules.GetNumber.getMsisdn();
      return { number: msisdn, upgrade: !!msisdn };
    } catch (e) {
      return { number: '', upgrade: false };
    }
  }
  // This method only works with Android
  try {
    // e.g. RNFS.DocumentDirectoryPath = '/data/user/0/nz.co.twodegreesmobile.comptelfwd.smpl/files',
    const paths = RNFS.DocumentDirectoryPath.split('/');
    // need to remove "/files" and replace with "shared_prefs"
    paths[paths.length - 1] = msisdnFolderName;
    const path = paths.join('/');
    const xmlPath = `${path}/${msisdnFileName}`;
    const existingAccount = await RNFS.readFile(xmlPath);
    const match = msisdnRegex.exec(existingAccount);
    if (match && match.length > 0) {
      const msisdn = match[0]
        .replace('com.comptel.smpl.interaction.Account.PHONE_NUMBER_KEY">', '')
        .replace('</string', '');

      return { number: msisdn, upgrade: true };
    }
    return { number: '', upgrade: false };
  } catch (e) {
    return { number: '', upgrade: false };
  }
};
