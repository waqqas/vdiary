import {call} from 'redux-saga/effects'
import AppConfig from '../Config/AppConfig'

const loginUser = function* loginUser(firebase) {

    try {
        // const {type, token} = yield call(Facebook.logInWithReadPermissionsAsync, AppConfig.facebook.appId, AppConfig.facebook.options)

        const type = 'facebook.com'
        const token = '1234'

        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            // Sign in with credential from the Facebook user.
            firebase.auth().signInWithCredential(credential)
        }
    }
    catch (e) {
    }
}

const logoutUser = function* logoutUser(firebase) {
    firebase.auth().signOut()
}

export {loginUser, logoutUser}