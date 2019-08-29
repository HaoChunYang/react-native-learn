import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class PointerEventsTest extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bigButtonPointerEvents : null
        }
    }
    onBigButtonPressed = () => {
        console.log('big button pressed');
    }
    onSmallButtonPressed = () => {
        if (this.state.bigButtonPointerEvents === null){
            console.log('big button will not pressed');
            this.setState ({bigButtonPointerEvents : 'none'});
            return;
        }
        console.log('big button will pressed');
        this.setState ({bigButtonPointerEvents : null});
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.sButtonStyle}
                    onPress = {this.onSmallButtonPressed}>
                    Small button 关闭大按钮
                </Text>
                <Text style = {styles.bButtonStyle}
                    onPress = {this.onBigButtonPressed}
                    pointerEvents = {this.state.bigButtonPointerEvents}>
                    Bit button
                </Text>
                <Text style = {styles.bButtonStyle}
                    onPress = { this.onGoback.bind(this)}
                    pointerEvents = {this.state.bigButtonPointerEvents}>
                    返回
                </Text>
            </View>
        );
    }

    onGoback(){
        this.props.pointerEventsBack();
    }
}

let styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    sButtonStyle : {
        fontSize : 20,
        left : 130, 
        top : 50,
        width : 250,
        height : 35,
        backgroundColor : 'grey',
    },
    bButtonStyle : {
        marginTop : 50,
        fontSize : 30,
        left : 130, 
        top : 100, 
        width : 150, 
        height : 70,
        backgroundColor : 'grey',
    }
});