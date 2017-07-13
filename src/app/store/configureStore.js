import {createStore, combineReducers,  applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerReducer} from 'react-router-redux'

export const rootReducer = combineReducers(
  {
    routing: routerReducer
  }
);

const store =  createStore(rootReducer,
  applyMiddleware(
    thunk
  )
);

export default store
