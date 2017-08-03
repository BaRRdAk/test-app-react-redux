import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, hashHistory} from 'react-router'

import store from './store/configureStore'

const history = syncHistoryWithStore(hashHistory, store);

const routes = {

  path: '/',
  indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
  childRoutes: [
    require('./routes/dashboard').default,
    require('./routes/price').default,
    require('./routes/import').default,
    require('./routes/blueprints').default,

    // comment unused routes
    // this will speed up builds
  ]
};


ReactDOM.render((
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>
), document.getElementById('app-root'));
