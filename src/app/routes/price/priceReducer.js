
const initialState = {
  priceResult: {},
};

export default function priceReducer(state = initialState, action) {
  if (action.type === 'SHOW_PRICE') {
    let _state;

    _state = {...state};
    _state.priceResult = action.payload;

    return _state;

  }
  return state;
}
