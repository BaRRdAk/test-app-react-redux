export default {
  path: 'import',
  component: require('../../components/common/Layout').default,

  childRoutes: [
    {
      path: 'moonmat',
      getComponent(nextState, cb){
        System.import('./containers/MoonMatImport').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
