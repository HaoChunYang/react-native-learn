import PropTypes from 'prop-types';
import React from 'react';
import {
    StyleSheet, Text, View, Image,
} from 'react-native';
import { extend } from 'dayjs';

export default class WaitingLeaf extends React.PureComponent {
    constructor(proos) {
        super(proos);
    }
    render() {

        let imageSource = {
            // uri : 'https://img2018.cnblogs.com/blog/1040075/201901/1040075-20190116111956008-530354835.png',
            uri : 'https://img2018.cnblogs.com/blog/1040075/201901/1040075-20190116111626566-10951833.png',
            // headers : {
            //     Authorization1 : 'someAuthToken',
            //     Authorization2 : 'someAuthToken',
            // }
        }

        return (
            <View style = {styles.container}>
                <Image style = {styles.imageStyle} 
                    source = {imageSource}/>
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

// WaitingLeaf.PropTypes = {
//     phoneNumber : PropTypes.string,
//     userPW : PropTypes.string,
// }

let styles = StyleSheet.create ({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#F5FCFF',
    },
    imageStyle : {
        width : 300,
        height : 300,
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