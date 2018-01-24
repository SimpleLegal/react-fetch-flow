import { combineReducers } from "redux";
import { loadingReducer } from "redux-fetch-flow";

const initialState = {
  invoices: [],
  todos: []
}

const appReducer = (state = {}, action) => {
  switch(action.type){
    case "TODOS_LIST_SUCCESS":
      const { todos } = action.payload
      return {
        ...state,
        todos
      }
    case "INVOICES_LIST_SUCCESS":
      const { invoices } = action.payload
      return {
        ...state,
        invoices
      }
  }
}


const rootReducer = combineReducers({
  //...other reducers
  app: appReducer,
  loading: loadingReducer
});

export default rootReducer;
