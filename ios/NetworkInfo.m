//
//  NetworkInfo.m
//  DataClock
//
//  Created by Ken Lee on 12/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

//#import <Foundation/Foundation.h>
#import "NetworkInfo.h"
#import <React/RCTLog.h>

@implementation NetworkInfo

RCT_EXPORT_MODULE();

static NSString *operatorPListSymLinkPath = @"/var/mobile/Library/Preferences/com.apple.operator.plist";

/*
 * file path to operator plist contains network country code
 * e.g. /System/Library/Carrier Bundles/iPhone/53024/carrier.plist
 * 530 = New Zealand, 24 = Two Degrees
 * Country code will change to roaming country
 */
RCT_EXPORT_METHOD(getOperatorPlist:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSFileManager *fm = [NSFileManager defaultManager];
  NSError *error;
  NSString *operatorPListPath = [fm destinationOfSymbolicLinkAtPath:operatorPListSymLinkPath error:&error];

  if (error) {
    resolve(@"0");
  } else {
    resolve(operatorPListPath);
  }
}

@end
