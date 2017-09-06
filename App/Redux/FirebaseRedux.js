import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    updateUser: null,
    addRef: ['key', 'ref'],
    removeRef: ['ref'],
    setData: ['key', 'data'],
    addData: ['key', 'data'],
    removeData: ['key', 'data'],
    changeData: ['key', 'data'],
})

export const FirebaseTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    lastLogin: null,
    children: {},
    vcards: {},     // for a single chile
    ages: {},
    vaccines: {}
})

/* ------------- Reducers ------------- */

export const updateUser = (state) => state.merge({lastLogin: Date.now()})

export const setData = (state, {key, data}) => {
    // console.log('setData: ', key, data.key, data.val())

    const list = []
    data.forEach((item) => {
        list[item.key] = item.val()
    })

    // console.log('list: ', list)
    return state.set(key, list)
}

export const addData = (state, {key, data}) => {
    // console.log('addData: ', key, data.key, data.val())

    const list = _.clone(state[key])
    list[data.key] = data.val()
    return state.set(key, list)
}

export const changeData = (state, {key, data}) => {
    // console.log('changeData: ', key, data.key, data.val())

    const list = _.clone(state[key])
    list[data.key] = data.val()
    return state.set(key, list)
}

export const removeData = (state, {key, data}) => {
    // console.log('removeData: ', key, data.key, data.val())

    const list = _.clone(state[key])
    delete(list[data.key])
    return state.set(key, list)
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_USER]: updateUser,
    [Types.SET_DATA]: setData,
    [Types.ADD_DATA]: addData,
    [Types.CHANGE_DATA]: changeData,
    [Types.REMOVE_DATA]: removeData
})
