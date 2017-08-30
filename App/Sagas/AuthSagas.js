import {call} from 'redux-saga/effects'
import AppConfig from '../Config/AppConfig'
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

const loginUser = function* loginUser(firebase) {

    console.log('login', LoginManager)
    try {
        LoginManager.logInWithReadPermissions(['public_profile'])

        // console.log('results: ', result)
        // if (result.isCancelled === false) {


            // const credential = firebase.auth.FacebookAuthProvider.credential(token)

            // Sign in with credential from the Facebook user.
            // firebase.auth().signInWithCredential(credential)
        // }
    }
    catch (e) {
        console.log('e:', e)
    }
}

const logoutUser = function* logoutUser(firebase) {
    firebase.auth().signOut()
}

export {loginUser, logoutUser}