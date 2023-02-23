export const getFormattedMobileNumber = (number: string): string => {
  const prefix = '+64';
  const numberParts = [];
  if (number.startsWith('+64')) {
    numberParts.push(number.substring(3, 5));
    numberParts.push(number.substring(5, 8));
    numberParts.push(number.substring(8, 13));
  } else if (number.startsWith('64')) {
    numberParts[0] = number.substring(2, 4);
    numberParts.push(number.substring(4, 7));
    numberParts.push(number.substring(7, 12));
  } else if (number.startsWith('0064')) {
    numberParts[0] = number.substring(4, 6);
    numberParts.push(number.substring(6, 9));
    numberParts.push(number.substring(9, 14));
  } else if (number.startsWith('02')) {
    numberParts[0] = number.substring(1, 3);
    numberParts.push(number.substring(3, 6));
    numberParts.push(number.substring(6, 12));
  } else if (number.startsWith('2')) {
    numberParts[0] = number.substring(0, 2);
    numberParts.push(number.substring(2, 5));
    numberParts.push(number.substring(5, 12));
  }

  return `${prefix} ${numberParts.join(' ')}`;
};

// number is always in the format of 22xxxyyyy
export const getLocalFormattedMobileNumber = (number: string): string => {
  return `0${number.substring(0, 2)} ${number.substring(2, 13)}`;
};

export const parseDuration = (duration: number): number =>
  duration % 60 === 0 ? duration / 60 : duration;

export const getUnit = (duration: number, short: boolean = false): string => {
  if (duration % 60 === 0) {
    const hour = duration / 60;
    return `${short ? 'hr' : 'hour'}${hour > 1 ? 's' : ''}`;
  }
  return `${short ? 'min' : 'minute'}${duration > 1 ? 's' : ''}`;
};

const DAY = 86400;
const HOUR = 3600;
const MIN = 60;

export const gerFormatedRemainingTime = (time: number): string => {
  let remainingTime = Math.ceil(Number(time));
  let displayFormatFactor = 0;
  const timeTokens = [];
  if (remainingTime >= DAY) {
    timeTokens.push(`${Math.floor(remainingTime / DAY)}d`);
    remainingTime %= DAY;
    displayFormatFactor = DAY;
  }
  if (remainingTime >= HOUR) {
    timeTokens.push(`${Math.floor(remainingTime / HOUR)}h`);
    remainingTime %= HOUR;
    if (!displayFormatFactor) {
      displayFormatFactor = HOUR;
    }
  }
  if (displayFormatFactor <= HOUR && timeTokens.length < 2 && remainingTime >= MIN) {
    timeTokens.push(`${Math.floor(remainingTime / MIN)}m`);
    remainingTime %= MIN;
    if (!displayFormatFactor) {
      displayFormatFactor = MIN;
    }
  }
  if (displayFormatFactor <= MIN && timeTokens.length < 2 && remainingTime > 0) {
    timeTokens.push(`${remainingTime}s`);
  }
  return timeTokens.join(' ');
};
