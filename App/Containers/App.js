import '../Config'
import React, {Component} from 'react'
import {Provider} from 'react-redux'

import RootContainer from './RootContainer'
import createStore from '../Redux'


// create our store
const store = createStore()

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <RootContainer/>
            </Provider>
        )
    }
}
