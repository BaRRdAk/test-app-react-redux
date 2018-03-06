const initialState = {
  blueprints: [],
  reactionBlueprints: [],
};

export default function blueprintReducer(state = initialState, action) {

  let _state;

  switch (action.type) {

    case 'SHOW_BLUEPRINTS':
      _state = {...state};
      _state.blueprints = action.payload;

      return _state;

    case 'SHOW_REACTION_BLUEPRINTS':
      _state = {...state};
      _state.reactionBlueprints = action.payload;

      return _state;

    case 'SYSTEM_INDEX':
      _state = {...state};
      _state.systemIndex = action.payload;

      return _state;

    default:
      return state;
  }


  return state;
}
