import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({

    container: {

        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',

    },

    button: {
        borderRadius: 20,
        margin: 40,
        shadowColor: '#303838',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },

    welcomText: {
        fontSize: 30,
        marginTop: 10
    },

    view: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    stravaImg: {
        width: '70%',
        height: 60,
    },

    profileImg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth:2,
        borderColor:'#475',
        marginVertical: 30
    },

});