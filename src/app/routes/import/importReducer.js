const initialState = {
  importResult: 0,
  importPriceHistoryResult: 0,
  importStaticDataResult: 0,
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

    case 'IMPORT_PRICE_HISTORY':
      _state = {...state};
      _state.importPriceHistoryResult = _state.importPriceHistoryResult + action.payload;

      return _state;

    case 'IMPORT_PRICE_HISTORY_CLEAN':
      _state = {...state};
      _state.importPriceHistoryResult = 0;

      return _state;

    case 'IMPORT_STATIC_DATA':
      _state = {...state};
      if(action.payload == 0){
        _state.importStaticDataResult = action.payload;
      } else {
        _state.importStaticDataResult += action.payload;
      }


      return _state;

    default:
      return state;
  }

  return state;
}
