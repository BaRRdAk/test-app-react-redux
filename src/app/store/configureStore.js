import {createStore, combineReducers,  applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerReducer} from 'react-router-redux'

import priceReducer from '../routes/price/priceReducer'
import importReducer from '../routes/import/importReducer'
import blueprintReducer from '../routes/blueprints/blueprintReducer'

export const rootReducer = combineReducers(
  {
    routing: routerReducer,
    priceStore: priceReducer,
    importStore: importReducer,
    blueprintStore: blueprintReducer,
  }
);

const store =  createStore(rootReducer,
  applyMiddleware(
    thunk
  )
);

export default store
