export default {
  path: '/',
  component: require('../../components/common/Layout').default,

  childRoutes: [
    {
      path: 'import',
      getComponent(nextState, cb){
        System.import('./containers/importData').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
