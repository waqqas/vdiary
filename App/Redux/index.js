import {combineReducers} from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas'

export default () => {
    /* ------------- Assemble The Reducers ------------- */
    const rootReducer = combineReducers({
        nav: require('./NavigationRedux').reducer,
        startup: require('./StartupRedux').reducer,
        firebase: require('./FirebaseRedux').reducer
    })

    return configureStore(rootReducer, rootSaga)
}
