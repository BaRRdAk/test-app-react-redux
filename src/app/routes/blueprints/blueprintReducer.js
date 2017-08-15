const initialState = {
  blueprints: [],
};

export default function blueprintReducer(state = initialState, action) {
  if (action.type === 'SHOW_BLUEPRINTS') {
    let _state;

    _state = {...state};
    _state.blueprints = action.payload;

    return _state;

  }
  return state;
}
