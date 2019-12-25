import React, {Component} from "react";
import {View, WebView, Text,Image} from "react-native";
import Information from './Information';
import styles from "./styles";
import axios from 'axios';

const CLIENT_ID = '28134';
const CLIENT_SECRET = 'b6f39ee4f7c3681fc12c6d63771c1cb0d1f7b4e0';
const URL_SHEME_PREFIX = 'http';
const URL_SHEME_HOST = 'www.strava.com';
const CALL_BACK_URL_SHEME = `${URL_SHEME_PREFIX}://${URL_SHEME_HOST}`;
const INITIAL_URI = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${CALL_BACK_URL_SHEME}/oauth/authorize/&approval_prompt=force`;
let code = '';

export default class Strava extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'flex',
            unshow: 'none',
            client_id: '',
            client_secret: '',
            code: '',
            persons: [],
        };
    }

    onShouldStartLoadWithRequest = url => {
        if (this.webView !== null) {
            if (!url.startsWith(CALL_BACK_URL_SHEME)) {

                code = url.substring(51, 91);
                var bodyFormData = new FormData();
                bodyFormData.append('client_id', CLIENT_ID);
                bodyFormData.append('client_secret', CLIENT_SECRET);
                bodyFormData.append('code', code);

                axios({
                    method: 'post',
                    url: "https://www.strava.com/oauth/token",
                    data: bodyFormData,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }

                })
                    .then(response => {
                        let TOKEN = response.data.access_token;
                        console.log(TOKEN);
                        axios.get('https://www.strava.com/api/v3/athlete?access_token=' + TOKEN)
                            .then(res => {
                                const persons = res.data;
                                this.setState({persons});
                                console.log(persons);
                            })
                    })
                    .catch(error => {

                    });

            } else {
                this.setState(() => ({show: 'none', unshow: 'flex'}));
            }
        }
        return true;
    };

    render() {

        return (

            <View style={{flex: 1}}>
                <View style={styles.login} display={this.state.show}>
                    <WebView
                        userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
                        ref={ref => {
                            this.webView = ref;
                        }}
                        source={{uri: INITIAL_URI}}
                        onNavigationStateChange={event =>
                            this.onShouldStartLoadWithRequest(event.url)}
                        onShouldStartLoadWithRequest={event =>
                            this.onShouldStartLoadWithRequest(event.url)}
                    />
                </View>

                <View style={styles.view} display={this.state.unshow}>

                    <Image style={styles.stravaImg} source={require("./assets/strava.png")}/>
                    <Text style={styles.welcomText}>Welcome</Text>

                    <Information name = "ID" info = {this.state.persons.id}/>
                    <Information name = "First Name" info = {this.state.persons.firstname}/>
                    <Information name = "Last Name" info = {this.state.persons.lastname}/>
                    <Information name = "Country" info = {this.state.persons.country}/>
                    <Information name = "Email" info = {this.state.persons.email}/>
                    <Information name = "Measurement" info = {this.state.persons.measurement_preference}/>

                </View>
            </View>

        );
    }
}
