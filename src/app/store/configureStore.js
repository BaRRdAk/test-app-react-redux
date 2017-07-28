import {createStore, combineReducers,  applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerReducer} from 'react-router-redux'

import ferrogelReducer from '../routes/price/ferrogelReducer.js'
import importReducer from '../routes/import/importReducer.js'

export const rootReducer = combineReducers(
  {
    routing: routerReducer,
    priceStore: ferrogelReducer,
    importStore: importReducer,
  }
);

const store =  createStore(rootReducer,
  applyMiddleware(
    thunk
  )
);

export default store
