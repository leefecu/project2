//
//  GetNumber.swift
//  DataClock
//
//  Created by Ken Lee on 23/10/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(GetNumber)
class GetNumber: NSObject {
  @objc(getMsisdn:rejecter:)
  func getMsisdn(_ resolve: RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
    let userDefaults = UserDefaults(suiteName: "group.nz.co.twodegrees.dataclock")
    if let dictionary = userDefaults?.dictionaryRepresentation() {
      if let data = dictionary["userInfo"] as? Data {
        let str = String(decoding: data, as: UTF8.self)
        var dictonary:NSDictionary?

        if let data = str.data(using: String.Encoding.utf8) {
          do {
            dictonary = try JSONSerialization.jsonObject(with: data, options: []) as? NSDictionary
        
            if let myDictionary = dictonary
            {
              print(" Msisdn is: \(myDictionary["phoneNumber"]!)")
              let msisdn = myDictionary["phoneNumber"] as? String ?? ""
              resolve(msisdn)
            } else {
              resolve("")
            }
          } catch {
            resolve("")
          }
        } else {
          resolve("")
        }
      } else {
        resolve("")
      }
    } else {
      resolve("")
    }
  }
}
