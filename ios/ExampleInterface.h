//
//  ExampleInterface.h
//  BuguProject
//
//  Created by gykj-haocy on 2019/8/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

NS_ASSUME_NONNULL_BEGIN

@interface ExampleInterface : NSObject<RCTBridgeModule>

@property (nonatomic, strong) NSString * contactName;
@property (nonatomic, strong) NSString * contactPhoneNumber;

@end

NS_ASSUME_NONNULL_END
