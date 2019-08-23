import PropTypes from 'prop-types';
import React from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import { extend } from 'dayjs';

export default class WaitingLeaf extends React.PureComponent {
    constructor(proos) {
        super(proos);
    }
    render() {
        return (
            <View style = {styles.container}>
                <Text style = {styles.textPromptStyle}>
                    登录使用手机号码：{this.props.phoneNumber}
                </Text>
                <Text style = {styles.textPromptStyle}>
                    登录使用密码：{this.props.userPW}
                </Text>
                <Text style = {styles.bigTextPrompt}
                    onPress = { () => this.onGobackPressed() }>
                    返回
                </Text>
            </View>
        );
    }
    onGobackPressed () {
        this.props.onGobackPressed();
    }
}

WaitingLeaf.PropTypes = {
    phoneNumber : PropTypes.string,
    userPW : PropTypes.string,
}

let styles = StyleSheet.create ({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#F5FCFF',
    },
    textPromptStyle : {
        fontSize : 20,
    },
    bigTextPrompt : {
        width : 300,
        backgroundColor : 'gray',
        color : 'white',
        textAlign : 'center',
        fontSize : 60,
    }
});