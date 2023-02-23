//
//  GetNumber.m
//  DataClock
//
//  Created by Ken Lee on 23/10/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(GetNumber, NSObject)

  RCT_EXTERN_METHOD(getMsisdn:
  (RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject)

@end

