import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    logoutUser: null,
    selectVcard: ['vcard'],
    addVcard: ['childKey', 'form'],
    updateVcard: ['childKey', 'form']
})

export const VcardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

/* ------------- Reducers ------------- */

export const logoutUser = (state) => state.merge(INITIAL_STATE)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGOUT_USER]: logoutUser,
})
