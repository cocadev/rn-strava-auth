import React from 'react';
import {View,Text} from 'react-native';
import '../css/style';

export default class Information extends React.Component {
    render(){
        return(
            <View style={{flexDirection:'row',marginHorizontal:'7%'}}>

                <Text style={{flex:5,fontSize:15,color:"#456",fontWeight:'600'}}>{this.props.name}</Text>
                <Text style={{flex:6,fontSize:15}}>{this.props.info}</Text>

            </View>
        );
    }
}