import React, {Component} from 'react';

import {StackNavigator} from 'react-navigation';
import Login from './Components/Login';
import Strava from './Components/Strava';

const AppNavigator = StackNavigator({

    LoginScreen: {screen: Login},
    StravaScreen: {screen: Strava},


}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default class App extends Component {

    render() {
        return (
            <AppNavigator/>
        );
    }
}