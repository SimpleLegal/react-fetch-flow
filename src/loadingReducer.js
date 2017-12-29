import * as ACT from 'actionTypes'
import { createReducer } from 'redux-create-reducer'

const initialState = {}

const loadingReducer = createReducer(initialState, {
  [ACT.SET_LOADING_FLAGS](state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
})

export default loadingReducer
