import {call} from 'redux-saga/effects'
import AppConfig from '../Config/AppConfig'
// const FBSDK = require('react-native-fbsdk');
// const {
//     LoginManager,
// } = FBSDK;

const loginUser = function* loginUser(firebase) {

    try {
        // const result = yield call(LoginManager.logInWithReadPermissions, AppConfig.facebook.options)

        // console.log('results: ', result)
        // if (result.isCancelled === false) {


            // const credential = firebase.auth.FacebookAuthProvider.credential(token)

            // Sign in with credential from the Facebook user.
            // firebase.auth().signInWithCredential(credential)
        // }
    }
    catch (e) {
    }
}

const logoutUser = function* logoutUser(firebase) {
    firebase.auth().signOut()
}

export {loginUser, logoutUser}