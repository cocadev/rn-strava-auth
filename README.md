# str - React Native Strava authentication

str is a React Native application consuming Strava RESTFul web service.


# Requirements

* node `^8.11.1`
* npm `^5.6.0`
* axios: "^0.18.0",
* react: "16.2.0",
* react-native: "^0.55.4",
* react-navigation: "^2.3.1"


# Getting Started

* npm install
* npm install -g react-native-cli
* npm run android or react-native run-android

# Strava Application Configuration

* go to http://labs.strava.com/developers/ 
* create an application
* set application settings
* go to https://www.strava.com/settings/api
* retrieve application ID and secret
* create a new .env file at the root of this project
* paste the following code inside your .env file and make sure to replace [XXX] and [YYY] with your info.

```bash
CLIENT_ID=[XXX]
CLIENT_SECRET =[YYY]
```

# Ignition

```bash
react-native start                     # Compile and launch packager
react-native run-ios                   # Start ios application
or
react-native run-android               # Start android application
```

# Debug

If you need to remotely debug this application, just follow this step:

```bash
yarn run remotedev                     # launch remote redux devtools
```

If you need to debug the React application, just fol: 

```bash
yarn run devtools                     # launch react-devtools
```

# Code Analysis

*index.js
 
 import { AppRegistry } from 'react-native';
 import App from './App';

 AppRegistry.registerComponent('tooltipTest', () => App);

First, you can start to work at index.js, then go to the App.js

*App.js
 
 The community solution to navigation is a standalone library that allows developers to set up the screens of an app with just a few lines of code.
 Then you can quickly create an app with a login screen and a Hello screen:

	import {StackNavigator} from 'react-navigation';
	const AppNavigator = StackNavigator({

		LoginScreen: {screen: Login},
        StravaScreen: {screen: Strava},


	}, {
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	});

*Login.js

	Each screen component can set navigation options such as the header title. It can use action creators on the navigation prop to link to other screens:

	  <View>
					<TouchableOpacity  onPress={() => this.props.navigation.navigate('HelloScreen')}>
						<Image source={require("./assets/2.png")}/>
					</TouchableOpacity>
	  </View>
*information.js

 This is the well-structured component.
 Your own components can also use props. This lets you make a single component that is used in many different places in your app, with slightly different properties in each place. Just refer to this.props in your render function.
 
 <View >
        <Text >{this.props.name}</Text>
        <Text >{this.props.info}</Text>
 </View>
 
 Using name and info as a prop lets us customize the Information component, so we can reuse that component for each of our Informations. This code also uses the Information component in JSX, just like the built-in components. The power to do this is what makes React so cool - if you find yourself wishing that you had a different set of UI primitives to work with, you just invent new ones.

 
* Authentication

  Strava uses OAuth2 as an authentication protocol. It allows external applications to request authorization to a user’s private data without requiring their Strava username and password. It allows users to grant and revoke API access on a per-application basis and keeps users’ authentication details safe.
  All developers need to register their application before getting started. A registered application will be assigned a Client ID and Client SECRET. The SECRET should never be shared.
  
* Overview of the 3-legged OAuth flow
  
  If the user authorizes the application, the Strava website will issue a redirect response to a URL of the application’s choosing. This URL will include an authorization code and the scope accepted by the athlete. Using this code, the application must complete the process by exchanging the code for an access token.

  This is done by presenting a client_id and client_secret (obtained during application registration), along with the authorization code, to Strava. Upon success, an access token will be returned that can be used to access the API on behalf of the user.
  
* Request access

  To initiate the flow, redirect the user to Strava’s authorization page, GET https://www.strava.com/oauth/authorize. The page will prompt the user to consent access of your application to their data while providing basic information about what is being asked.

  const INITIAL_URI = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${CALL_BACK_URL_SHEME}/oauth/authorize/&approval_prompt=force`;
  
  client_id : The application’s ID, obtained during registration
  redirect_uri : URL to which the user will be redirected with the authorization code
  response_type : Must be `code`
  approval_prompt : `force` or `auto`, use `force` to always show the authorization prompt
  scope : The requested scopes of the eventual token, as a comma delimited string of `view_private` and/or `write`
  state : Returned to your application in the redirect URI. Useful if the authentication is done from various points in an app.

* Token exchange
  Strava will respond to the authorization request by redirecting the user agent to the redirect_uri provided.

  On success, code and scope parameters will be included in the query string
  If the user accepts the request to share access to their Strava data, Strava will redirect back to redirect_uri with the authorization code. The application must now exchange the temporary authorization code for an access token, using its client ID and client secret. The endpoint is POST https://www.strava.com/oauth/token
  
  client_id : The application’s ID, obtained during registration.
  client_secret : The application’s secret, obtained during registration.
  code : The `code` parameter obtained in the redirect.

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

* Access the API using an Access Token
  
	The application will now be able to make requests on the user’s behalf using the access_token query string parameter or by specifying the Authorization header. For instance, using HTTPie:

	$ http https://www.strava.com/api/v3/athlete 'Authorization: Bearer 83ebeabdec09f6670863766f792ead24d61fe3f9'
	$ http 'https://www.strava.com/api/v3/athlete?access_token=83ebeabdec09f6670863766f792ead24d61fe3f9'

	axios.get('https://www.strava.com/api/v3/athlete?access_token=' + TOKEN)
								.then(res => {
									const persons = res.data;
									this.setState({persons});
									console.log(persons);
								})
						})
						.catch(error => {

						});  
						
	Applications should check for a 401 Unauthorized response. Access for those tokens has been revoked by the user.

#React-Native Basic Concept

*Hello World 
	In accordance with the ancient traditions of our people, we must first build an app that does nothing except say "Hello world". Here it is:

	import React, { Component } from 'react';
	import { Text, View } from 'react-native';

	export default class HelloWorldApp extends Component {
	  render() {
		return (
		  <View>
			<Text>Hello world!</Text>
		  </View>
		);
	  }
	}

	If you are feeling curious, you can play around with sample code directly in the web simulators. You can also paste it into your App.js file to create a real app on your local machine.

*Props
	Most components can be customized when they are created, with different parameters. These creation parameters are called props.

	import React, { Component } from 'react';
	import { AppRegistry, Text, View } from 'react-native';

	class Greeting extends Component {
	  render() {
		return (
		  <Text>Hello {this.props.name}!</Text>
		);
	  }
	}

	export default class LotsOfGreetings extends Component {
	  render() {
		return (
		  <View style={{alignItems: 'center'}}>
			<Greeting name='Rexxar' />
			<Greeting name='Jaina' />
			<Greeting name='Valeera' />
		  </View>
		);
	  }
	}

	// skip this line if using Create React Native App
	AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);

*State
	There are two types of data that control a component: props and state. props are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, we have to use state.

	import React, { Component } from 'react';
	import { AppRegistry, Text, View } from 'react-native';

	class Blink extends Component {
	  constructor(props) {
		super(props);
		this.state = {isShowingText: true};

		// Toggle the state every second
		setInterval(() => {
		  this.setState(previousState => {
			return { isShowingText: !previousState.isShowingText };
		  });
		}, 1000);
	  }

	  render() {
		let display = this.state.isShowingText ? this.props.text : ' ';
		return (
		  <Text>{display}</Text>
		);
	  }
	}

	export default class BlinkApp extends Component {
	  render() {
		return (
		  <View>
			<Blink text='I love to blink' />
			<Blink text='Yes blinking is so great' />
			<Blink text='Why did they ever take this out of HTML' />
			<Blink text='Look at me look at me look at me' />
		  </View>
		);
	  }
	}

	// skip this line if using Create React Native App
	AppRegistry.registerComponent('AwesomeProject', () => BlinkApp);

	In a real application, you probably won't be setting state with a timer. You might set state when you have new data arrived from the server, or from user input. You can also use a state container like Redux or Mobx to control your data flow. In that case you would use Redux or Mobx to modify your state rather than calling setState directly.

	When setState is called, BlinkApp will re-render its Component. By calling setState within the Timer, the component will re-render every time the Timer ticks.

*Style
	With React Native, you don't use a special language or syntax for defining styles. You just style your application using JavaScript. All of the core components accept a prop named style. The style names and values usually match how CSS works on the web, except names are written using camel casing, e.g backgroundColor rather than background-color.

	 <View>
			<Text style={styles.red}>just red</Text>
			<Text style={styles.bigblue}>just bigblue</Text>
			<Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
			<Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
	 </View>
	 
	 const styles = StyleSheet.create({
	  bigblue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 30,
	  },
	  red: {
		color: 'red',
	  },
	});

*axios
	$ npm install axios --save

	If we then create a new component named PersonList, we’d be able to hook into the componentDidMount lifecycle hook and perform a GET request after importing axios.

	import React from 'react';

	import axios from 'axios';

	export default class PersonList extends React.Component {
	  state = {
		persons: []
	  }

	  componentDidMount() {
		axios.get(`https://jsonplaceholder.typicode.com/users`)
		  .then(res => {
			const persons = res.data;
			this.setState({ persons });
		  })
	  }

	  render() {
		return (
		  <ul>
			{ this.state.persons.map(person => <li>{person.name}</li>)}
		  </ul>
		)
	  }
	}

	Using axios.get(url) we then get a promise which returns a response object. As we’re looking for the response data, we’ve assigned the value of person to res.data.

	We can also get other information about our request such as the status code under res.status or more information inside of res.request.


# References

* Strava API: https://strava.github.io/api/
* Strava Labs: http://labs.strava.com/
* Strava Authentication: https://developers.strava.com/docs/authentication/



