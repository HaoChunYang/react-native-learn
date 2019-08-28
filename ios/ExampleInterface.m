//
//  ExampleInterface.m
//  BuguProject
//
//  Created by gykj-haocy on 2019/8/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ExampleInterface.h"
#import "CallAdressbookViewController.h"


@interface ExampleInterface()
@property (nonatomic, strong) NSDictionary * dic;
@end


@implementation ExampleInterface
{
  RCTPromiseResolveBlock _resolveBlock;
  RCTPromiseRejectBlock _rejectBlock;
}

- (instancetype) init {
  return self;
}

- (NSString *) contactName {
  if (!_contactName) {
    _contactName = @"";
  }
  return _contactName;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

//声明需要提供给RN缓件调用的方法
RCT_EXPORT_METHOD(sendMessage:(NSString *) msg resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSLog(@"收到NR 传来的消息 %@", msg);
  
  _resolveBlock = resolve;
  _rejectBlock = reject;//保存回调参数
  
  //检查收到有消息是否为JSON格式
  NSData * data = [msg dataUsingEncoding:NSUTF8StringEncoding];
  NSError * error ;
  NSDictionary * dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:&error];
  if (error != nil) {
    NSLog(@"解析json错误 %@", error);
  }
  //检查消息的msgType是否为pickContact, 如果是，则初始化挑选联系人界面
  NSString * login = [dic objectForKey:@"msgType"];
  if ([login isEqualToString:@"pickContact"]) {
    [self callAddress];
  }
}

- (void)callAddress {
  UIViewController * controller = (UIViewController *)[[[UIApplication sharedApplication] keyWindow] rootViewController];
  CallAdressbookViewController * addressbookVC = [[CallAdressbookViewController alloc] init];
  [controller presentViewController:addressbookVC animated:YES completion:^{
    NSLog(@"present ok");
  }];
  self.contactName = addressbookVC.contactName;
  self.contactPhoneNumber = addressbookVC.contactPhoneNumber;
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(calendarEventReminderReceived:) name:@"Num" object:nil];
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (void)calendarEventReminderReceived:(NSNotification *)notification {
  if (notification.object == nil) {
    _rejectBlock(@"user canceled", @"user-canceled", nil);
    return;
  }
  self.contactPhoneNumber = notification.object;
  self.contactName = notification.userInfo[@"name"];
  //去除获取到的电话号码中的特殊字符
  self.contactPhoneNumber = [self.contactPhoneNumber stringByReplacingOccurrencesOfString:@"-" withString:@""];
  self.contactPhoneNumber = [self.contactPhoneNumber stringByReplacingOccurrencesOfString:@"(" withString:@""];
  self.contactPhoneNumber = [self.contactPhoneNumber stringByReplacingOccurrencesOfString:@")" withString:@""];
  self.contactPhoneNumber = [self.contactPhoneNumber stringByReplacingOccurrencesOfString:@" " withString:@""];
  
  NSMutableDictionary * dic = [[NSMutableDictionary alloc] init];
  [dic setObject:@"pickContactResult" forKey:@"msgType"];
  if (self.contactPhoneNumber == nil) {
    self.contactPhoneNumber = @"";
  }
  [dic setObject:self.contactPhoneNumber forKey:@"peerNumber"];
  if (self.contactName == nil) {
    self.contactName = @"";
  }
  
  //组装发送给RN侧的消息
  [dic setObject:self.contactName forKey:@"displayName"];
  self.dic = [dic copy];
  NSError * error = [[NSError alloc] init];
  NSData * data = [NSJSONSerialization dataWithJSONObject:self.dic options:0 error:&error];
  NSString * str = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  
  //向rn侧发送消息
//  [self.bridge.eventDispatcher sendAppEventWithName:@"NativeModuleMsg" body:@{@"message":str}];
  _resolveBlock(str);
}

@end
