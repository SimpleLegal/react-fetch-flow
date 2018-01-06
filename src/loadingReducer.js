import { SET_LOADING_FLAGS } from './actionTypes'
import { createReducer } from 'redux-create-reducer'

const initialState = {}

const loadingReducer = createReducer(initialState, {
  [SET_LOADING_FLAGS](state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
})

export default loadingReducer
