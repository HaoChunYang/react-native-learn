/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  BackHandler,
  Platform,
} from 'react-native';
import LoginLeaf from './LoginLeaf';
import WaitingLeaf from './WaitingLeaf';

export default class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      currentScene: 'Login',
      phoneNumber: '',
      userPW: '',
    };
    this.handleBackSignal = this.handleBackSignal.bind(this);
    this.onLoginPressed = this.onLoginPressed.bind(this);
  }

  onLoginPressed ( aNumber, aPW){
    this.setState ({
      currentScene: 'Waiting',
      phoneNumber: aNumber,
      userPW: aPW,
    });
  }

  render(){
    if (this.state.currentScene === 'Login'){
      return <LoginLeaf onLoginPressed = {this.onLoginPressed} />
    }else {
      return (
        <WaitingLeaf phoneNumber = {this.state.phoneNumber}
          onGobackPressed = {this.handleBackSignal}
          userPW = {this.state.userPW} />
      )
    }
  }

  handleBackSignal() {
    if (this.state.currentScene === 'Waiting'){
      this.setState ({currentScene : 'Login'});
      return true;
    }
    return false;
  }
  componentDidMount() {
    if (Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackSignal);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === "android"){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackSignal);
    }
  }

};
