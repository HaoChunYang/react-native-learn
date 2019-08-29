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
import TouchViewTest from './TouchViewTest';

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

  onTouchViewPressed = () => {
    this.setState ({ currentScene : 'Touch' });
  }

  render(){
    if (this.state.currentScene === 'Login'){
      return <LoginLeaf onLoginPressed = {this.onLoginPressed}
        onTouchViewPressed = {this.onTouchViewPressed} />
    }else if(this.state.currentScene === 'Waiting'){
      return (
        <WaitingLeaf phoneNumber = {this.state.phoneNumber}
          onGobackPressed = {this.handleBackSignal}
          userPW = {this.state.userPW} />
      )
    }else{
      return(
        <TouchViewTest onTouchViewPressed = {this.onTouchViewPressed.bind(this)} 
          touchBlack = {this.touchBlack.bind(this)}/>
      )
    }
  }

  touchBlack(){
    if(this.state.currentScene === 'Touch'){
      this.setState({currentScene : 'Login'});
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
