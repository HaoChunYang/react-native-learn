import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

export default class ImageTest extends React.PureComponent {
    componentWillMount(){
        this.image1 = require('../../res/bugu1.png');
        this.image2 = require('../../res/fengjing1.jpeg');
    }
    render(){
        return (
            <View style = {styles.container}>
                <Image style = {styles.imageStyle}
                    resizeMode = {'cover'}
                    source = {this.image2}/>
                <Image style = {styles.imageStyle}
                    resizeMode = {'contain'}
                    source = {this.image2}/>
                <Image style = {styles.imageStyle}
                    resizeMode = {'stretch'}
                    source = {this.image2}/>
                <Image style = {styles.imageStyle}
                    resizeMode = {'center'}
                    source = {this.image2}/>
                <Text style = { styles.backStyle }
                    onPress = { () => this.onGoback()}>
                    go back
                </Text>
            </View>
        );
    }

    onGoback (){
        this.props.onGoback();
    }
}

let styles = StyleSheet.create({
    container : {
        marginTop : 20,
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'grey',
    },
    imageStyle : {
        margin : 2,
        backgroundColor : 'white',
        height : 100,
        width : 100,
    },
    backStyle : {
        width : 60,
        height : 40,
        backgroundColor : 'yellow'
    }
});