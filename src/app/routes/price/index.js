

export default {
  path: 'price',
  component: require('../../components/common/Layout').default,

  childRoutes: [
    {
      path: 'moonmat',
      getComponent(nextState, cb){
        System.import('./containers/MoonMatPrice').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'component',
      getComponent(nextState, cb){
        System.import('./containers/СomponentsPrice').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
