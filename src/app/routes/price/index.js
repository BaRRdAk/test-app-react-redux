

export default {
  path: 'price',
  component: require('../../components/common/Layout').default,

  childRoutes: [
    {
      path: 'all',
      getComponent(nextState, cb){
        System.import('./containers/AllPrice').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
