export default {
  path: 'blueprints',
  component: require('../../components/common/Layout').default,

  childRoutes: [
    {
      path: 'info',
      getComponent(nextState, cb){
        System.import('./containers/blueprintInfo').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
