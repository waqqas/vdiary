import {put} from 'redux-saga/effects'
import {channel} from "redux-saga"
import FirebaseActions from '../Redux/FirebaseRedux'

export const firebaseChannel = channel()

const watchFirebase = function* watchFirebase(action) {
    yield put(action)
}

const addRef = function* addRef(firebase, {key, ref}) {
    ref.on('child_added', (data) => firebaseChannel.put(FirebaseActions.addData(key, data)))
    ref.on('child_changed', (data) => firebaseChannel.put(FirebaseActions.changeData(key, data)))
    ref.on('child_removed', (data) => firebaseChannel.put(FirebaseActions.removeData(key, data)))
}

const removeRef = function* removeRef(firebase, {ref}) {
    ref.off()
}

export {addRef, removeRef, watchFirebase}