import * as FormatHelpers from './format';

describe('Format Helper', () => {
  test('getFormattedMobileNumber', () => {
    expect(FormatHelpers.getFormattedMobileNumber('+6421123456')).toBe('+64 21 123 456');
    expect(FormatHelpers.getFormattedMobileNumber('+64211234567')).toBe('+64 21 123 4567');
    expect(FormatHelpers.getFormattedMobileNumber('+642112345678')).toBe('+64 21 123 45678');

    expect(FormatHelpers.getFormattedMobileNumber('6421123456')).toBe('+64 21 123 456');
    expect(FormatHelpers.getFormattedMobileNumber('64211234567')).toBe('+64 21 123 4567');
    expect(FormatHelpers.getFormattedMobileNumber('642112345678')).toBe('+64 21 123 45678');

    expect(FormatHelpers.getFormattedMobileNumber('006421123456')).toBe('+64 21 123 456');
    expect(FormatHelpers.getFormattedMobileNumber('0064211234567')).toBe('+64 21 123 4567');
    expect(FormatHelpers.getFormattedMobileNumber('00642112345678')).toBe('+64 21 123 45678');

    expect(FormatHelpers.getFormattedMobileNumber('021123456')).toBe('+64 21 123 456');
    expect(FormatHelpers.getFormattedMobileNumber('0211234567')).toBe('+64 21 123 4567');
    expect(FormatHelpers.getFormattedMobileNumber('02112345678')).toBe('+64 21 123 45678');

    expect(FormatHelpers.getFormattedMobileNumber('21123456')).toBe('+64 21 123 456');
    expect(FormatHelpers.getFormattedMobileNumber('211234567')).toBe('+64 21 123 4567');
    expect(FormatHelpers.getFormattedMobileNumber('2112345678')).toBe('+64 21 123 45678');
  });

  test('getLocalFormattedMobileNumber', () => {
    expect(FormatHelpers.getLocalFormattedMobileNumber('21123456')).toBe('021 123456');
    expect(FormatHelpers.getLocalFormattedMobileNumber('211234567')).toBe('021 1234567');
    expect(FormatHelpers.getLocalFormattedMobileNumber('2112345678')).toBe('021 12345678');
  });

  test('parseDuration return either hours or minutes', () => {
    expect(FormatHelpers.parseDuration(30)).toBe(30);
    expect(FormatHelpers.parseDuration(45)).toBe(45);
    expect(FormatHelpers.parseDuration(90)).toBe(90);
    expect(FormatHelpers.parseDuration(60)).toBe(1);
    expect(FormatHelpers.parseDuration(120)).toBe(2);
    expect(FormatHelpers.parseDuration(180)).toBe(3);
  });

  test('getUnit return either minute(s) or hour(s)', () => {
    expect(FormatHelpers.getUnit(1)).toBe('minute');
    expect(FormatHelpers.getUnit(30)).toBe('minutes');
    expect(FormatHelpers.getUnit(45)).toBe('minutes');
    expect(FormatHelpers.getUnit(1, true)).toBe('min');
    expect(FormatHelpers.getUnit(30, true)).toBe('mins');
    expect(FormatHelpers.getUnit(45, true)).toBe('mins');
    expect(FormatHelpers.getUnit(60)).toBe('hour');
    expect(FormatHelpers.getUnit(120)).toBe('hours');
    expect(FormatHelpers.getUnit(180)).toBe('hours');
    expect(FormatHelpers.getUnit(60, true)).toBe('hr');
    expect(FormatHelpers.getUnit(120, true)).toBe('hrs');
    expect(FormatHelpers.getUnit(180, true)).toBe('hrs');
  });

  test('gerFormatedRemainingTime', () => {
    expect(FormatHelpers.gerFormatedRemainingTime(93600)).toBe('1d 2h');
    expect(FormatHelpers.gerFormatedRemainingTime(93650)).toBe('1d 2h');
    expect(FormatHelpers.gerFormatedRemainingTime(5640)).toBe('1h 34m');
    expect(FormatHelpers.gerFormatedRemainingTime(5645)).toBe('1h 34m');
    expect(FormatHelpers.gerFormatedRemainingTime(3610)).toBe('1h');
    expect(FormatHelpers.gerFormatedRemainingTime(125)).toBe('2m 5s');
    expect(FormatHelpers.gerFormatedRemainingTime(30)).toBe('30s');
  });
});
