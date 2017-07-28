const initialState = {
  importResult: 0,
};

export default function importReducer(state = initialState, action) {

  let _state;

  switch (action.type) {

    case 'IMPORT_PRICE':
      _state = {...state};
      _state.importResult = _state.importResult + action.payload;

      return _state;

    case 'IMPORT_PRICE_CLEAN':
      _state = {...state};
      _state.importResult = 0;

      return _state;

    default:
      return state;
  }



  return state;
}
