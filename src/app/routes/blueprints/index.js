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
      path: 'compositeReaction',
      getComponent(nextState, cb){
        System.import('./containers/compositeReaction').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'polimerReaction',
      getComponent(nextState, cb){
        System.import('./containers/polimerReaction').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
