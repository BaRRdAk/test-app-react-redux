export default {
  path: 'blueprints',
  component: require('../../components/common/Layout').default,

  childRoutes: [
    {
      path: 'advancedComponents',
      getComponent(nextState, cb){
        System.import('./containers/blueprintInfo').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'reaction',
      getComponent(nextState, cb){
        System.import('./containers/reaction').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
