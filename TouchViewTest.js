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
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#F5FCFF',
    }
});
