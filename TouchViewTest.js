import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class TouchViewTest extends React.PureComponent {
    constructor(props){
        super(props);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
    }
    _onTouchMove (event){
        console.log("thouch move :" + event.timeStamp + ', X :' + event.nativeEvent.locationX + ', Y :' + event.nativeEvent.locationY);
    }
    _onTouchStart (event) {
        console.log("touch start :" + event.timeStamp + ', x : ' + event.nativeEvent.locationX + ', Y : ' + event.nativeEvent.locationY);
    }
    _onTouchEnd = (event) => {
        console.log("touch end :" + event.timeStamp + ', x : ' + event.nativeEvent.locationX + ', Y : ' + event.nativeEvent.locationY);
    }
    render(){
        return(
            <View style = {styles.container}
                onTouchMove = {this._onTouchMove}
                onTouchStart = {this._onTouchStart}
                onTouchEnd = {this._onTouchEnd}>
                <Text style = {styles.bigTextPrompt}
                    onPress = {()=>{this.onGobackPress()}}>
                    返回
                </Text>
            </View>
        );
    }

    onGobackPress () {
        console.log('back touch');
        this.props.touchBlack();
    }
}

let styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#F5FCFF',
        alignItems : 'center',
        justifyContent : 'center',
    },
    bigTextPrompt : {
        width : 200,
        backgroundColor : 'gray',
        textAlign : 'center',
        fontSize : 40,
    }
});
