import {takeEvery, takeLatest} from 'redux-saga/effects'

import firebase from '../Libs/Firebase'

import {StartupTypes} from '../Redux/StartupRedux'
import {startup, startupSuccess} from './StartupSagas'

import {AuthTypes} from '../Redux/AuthRedux'
import {loginUser, logoutUser} from './AuthSagas'

import {ChildTypes} from "../Redux/ChildRedux"
import {addChild, updateChild} from './ChildSagas'

import {FirebaseTypes} from "../Redux/FirebaseRedux"
import {addRef, firebaseChannel, removeRef, watchFirebase} from "./FirebaseSagas"
import {VcardTypes} from "../Redux/VcardRedux";
import {addVcard, updateVcard} from "./VcardSagas";

/* ------------- Connect Types To Sagas ------------- */

const root = function* root() {
    yield [
        takeLatest(StartupTypes.STARTUP, startup,),
        takeLatest(StartupTypes.STARTUP_SUCCESS, startupSuccess),
        takeLatest(AuthTypes.LOGIN_USER, loginUser, firebase),
        takeLatest(AuthTypes.LOGOUT_USER, logoutUser, firebase),
        takeLatest(ChildTypes.ADD_CHILD, addChild, firebase),
        takeLatest(ChildTypes.UPDATE_CHILD, updateChild, firebase),

        takeLatest(VcardTypes.ADD_VCARD, addVcard, firebase),
        takeLatest(VcardTypes.UPDATE_VCARD, updateVcard, firebase),

        takeLatest(FirebaseTypes.ADD_REF, addRef, firebase),
        takeLatest(FirebaseTypes.REMOVE_REF, removeRef, firebase),

        takeEvery(firebaseChannel, watchFirebase),
    ]
}

export default root