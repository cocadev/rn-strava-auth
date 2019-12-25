import React from 'react';
import {View,Text,Image,ActivityIndicator} from 'react-native';
import axios from 'axios';
import styles from '../css/style';
import {TOKEN} from '../config/constant'
import Information from "./Information";

export default class PersonList extends React.Component {

        constructor(props){

            super(props);
            this.state ={
                isLoading: true,
                persons: []
            }
        }

        componentDidMount() {
            axios.get(`https://www.strava.com/api/v3/athlete?access_token=` + TOKEN )
                .then(res => {
                    const persons =  res.data;

                    this.setState({
                        persons,
                        isLoading: false
                    });
                })
        }

    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator color = {'#241'}/>
                </View>
            )
        }

        return (
            <View style={styles.view}>

                    <Image style={styles.stravaImg} source={require("./assets/strava.png")}/>
                    <Text style={styles.welcomText}>Welcome</Text>

                    <Image
                        style={styles.profileImg}
                        source={{uri: this.state.persons.profile}}
                    />

                    <Information name = "ID" info = {this.state.persons.id}/>
                    <Information name = "First Name" info = {this.state.persons.firstname}/>
                    <Information name = "Last Name" info = {this.state.persons.lastname}/>
                    <Information name = "Gender" info = {this.state.persons.sex}/>
                    <Information name = "Email" info = {this.state.persons.email}/>
                    <Information name = "Created Date" info = {this.state.persons.created_at}/>
                    <Information name = "Updated Date" info = {this.state.persons.updated_at}/>

            </View>
        )
    }
}
