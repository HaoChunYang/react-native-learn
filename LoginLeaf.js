import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
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
		this.props.onLoginPressed ( this.state.inputedNum, this.state.inputedPW);
	}
	userPressAddressBook () {}
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
