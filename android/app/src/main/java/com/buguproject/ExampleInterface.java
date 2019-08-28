package com.buguproject;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ExampleInterface extends ReactContextBaseJavaModule {
    public ExampleInterface(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "ExampleInterface";
    }
    @ReactMethod
    //必须实现ReactMethod注释为React函数才能供 RN调用。并且这些函数不能有返回值，因为被调用的原生代码是异步执行的。
    //只能通过回调函数或者发送消息将结果返回给RN侧
    public void HandleMessage(String aMessage) {
        Log.i("RNMessage", "received message form RN:" +
                aMessage);
    }
}
