import {put} from "redux-saga/effects";
import StartupActions from "../Redux/StartupRedux";


const startup = function* startup() {
    yield put(StartupActions.startupSuccess())
}

const startupSuccess = function* startupSuccess() {
}

export {startup, startupSuccess}
