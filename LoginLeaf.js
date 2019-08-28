import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
	TextInput,
	Alert,
} from 'react-native';

let widthOfMargin = Dimensions.get('window').width * 0.05;

export default class LoginLeaf extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      inputedNum: '',
      inputedPW: ''
    };
    this.updatePW = this.updatePW.bind(this);
  }

  updateNum(newText) {
    this.setState ((state) => {
      return {
        inputedNum: newText,
      };
    });
  }

  updatePW(newText) {
    this.setState (() => {
      return {
        inputedPW: newText,
      };
    });
  }

//   shouldComponentUpdate() {
//     if (this.state.inputedNum.length < 3) return false;
//     return true;
//   }

  render() {
    return (
      <View style = {styles.container}>
        <TextInput style = {styles.textInputStyle}
          placeholder = {'请输入手机号码'}
          onChangeText = { (newText) => this.updateNum(newText) }
        />
        <Text style = {styles.textPromptStyle}>
          您输入的手机号码：{this.state.inputedNum}
        </Text>
        <TextInput style = {styles.textInputStyle}
          placeholder = {'请输入密码'}
          secureTextEntry = {true}
          onChangeText = {this.updatePW}
        />
        <Text style = {styles.bigTextPrompt} onPress = {() => this.userPressConfirm()}>确定</Text>
        <Text style = {styles.bigTextPrompt}
          onPress = {()=>this.userPressAddressBook()}>
            通讯录
        </Text>
      </View>
    );
	}
	userPressConfirm(){
		// this.props.onLoginPressed ( this.state.inputedNum, this.state.inputedPW);
		Alert.alert (
			'提示',
			'确定使用' + this.state.inputedNum + '号码登录吗?',
			[{text : '确定', onPress : this.jumpToWaiting.bind(this) },
			// {text : '选项2', onPress : this.option2Selected }, 
			{text : '取消', onPress : this.option3Selected , style : 'cancel'},
			// {text : '选项4', onPress : this.option4Selected },
			],
			{
				onDismiss : () => {
					console.log('Android 平台点击非Alert窗口区域让Alert窗口消失时，这个回调函数将被调用。');
				}
			},
			{
				cancelable : false  //加上此行，禁止安卓上用户通过点击屏幕上非Alert窗口区域让Alert窗口消失。
			}
		);
	}
	jumpToWaiting () {
		this.props.onLoginPressed (this.state.inputedNum, this.state.inputedPW);
	}
	option1Selected() {
		console.log('option1 Selected.');
	}
	option2Selected() {
		console.log('option2 Selected.');
	}
	option3Selected() {
		console.log('option3 Selected.');
	}
	option4Selected() {
		console.log('option4 Selected.');
	}
	userPressAddressBook () {
		console.log('user press address book is called.');
		var { NativeAppEventEmitter } = require('react-native');
		this.NativeMsgSubscription = NativeAppEventEmitter.addListener(
			'NativeModuleMsg', (reminder) => { this.handleNativeInterfaceMsg (reminder.message);}
		);
		let ExampleInterface = require('react-native').NativeModules.ExampleInterface;
		ExampleInterface.sendMessage('{\"msgType\": \"pickContact\"}');
	}

	handleNativeInterfaceMsg (aMsg) {
		console.log(aMsg);
		let msgObj = JSON.parse (aMsg);
		this.setState({inputedNum : msgObj.peerNumber });
	}
};

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex : 1,
    backgroundColor: 'white',
  },
  textInputStyle: {
    margin: widthOfMargin,
    backgroundColor: 'gray',
    height: 30,
    fontSize: 20,
  },
  textPromptStyle: {
    margin: widthOfMargin,
    fontSize:20,
    backgroundColor: 'gray',
  },
  bigTextPrompt: {
    margin: widthOfMargin,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    paddingHorizontal: 24,
  },
});
