import {takeEvery, takeLatest} from 'redux-saga/effects'

import AppConfig from '../Config/AppConfig'
import firebase from '../Libs/Firebase'

import {StartupTypes} from '../Redux/StartupRedux'
import {startup, startupSuccess} from './StartupSagas'

import {AuthTypes} from '../Redux/AuthRedux'
import {loginUser, logoutUser} from './AuthSagas'

import {ChildTypes} from "../Redux/ChildRedux"
import {addChild, updateChild} from './ChildSagas'

import {FirebaseTypes} from "../Redux/FirebaseRedux"
import {addRef, removeRef, watchFirebase, firebaseChannel} from "./FirebaseSagas"

/* ------------- Connect Types To Sagas ------------- */

const root = function* root() {
    yield [
        takeLatest(StartupTypes.STARTUP, startup, ),
        takeLatest(StartupTypes.STARTUP_SUCCESS, startupSuccess),
        takeLatest(AuthTypes.LOGIN_USER_WITH_FACEBOOK, loginUser, firebase),
        takeLatest(AuthTypes.LOGOUT_USER, logoutUser, firebase),
        takeLatest(ChildTypes.ADD_CHILD, addChild, firebase),
        takeLatest(ChildTypes.UPDATE_CHILD, updateChild, firebase),

        takeLatest(FirebaseTypes.ADD_REF, addRef, firebase),
        takeLatest(FirebaseTypes.REMOVE_REF, removeRef, firebase),

        takeEvery(firebaseChannel, watchFirebase),
    ]
}

export default root