import React, { Component } from 'react';
import { View,Image,TouchableOpacity} from 'react-native';
import styles from '../css/style'

export default class Login extends Component {

    render() {

        return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('StravaScreen')}>
                        <Image style={{width:200,height:40}} source={require("./assets/2.png")}/>
                    </TouchableOpacity>
                </View>
        )
    }
}
