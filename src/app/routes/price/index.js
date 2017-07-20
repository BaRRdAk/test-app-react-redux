

export default {
  path: 'price',
  component: require('../../components/common/Layout').default,

  childRoutes: [
    {
      path: 'ferrogelprice',
      getComponent(nextState, cb){
        System.import('./containers/FerrogelPrice').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
