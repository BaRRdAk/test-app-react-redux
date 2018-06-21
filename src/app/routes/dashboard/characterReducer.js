const initialState = {
  wallet: 0,
  orders: [],
  jobs: [],
  wallet_transactions: [],
};

export default function characterReducer(state = initialState, action) {

  let _state;

  switch (action.type) {

    case 'SHOW_CHARACTER_WALLET':
      _state = {...state};
      _state.wallet = action.payload;

      return _state;

    case 'SHOW_CHARACTER_WALLET_TRANSACTIONS':
      _state = {...state};
      _state.wallet_transactions = action.payload;

      return _state;

    case 'SHOW_CHARACTER_ORDERS':
      _state = {...state};
      _state.orders = action.payload;

      return _state;

    case 'SHOW_CHARACTER_JOBS':
      _state = {...state};
      _state.jobs = action.payload;

      return _state;

    default:
      return state;
  }


  return state;
}
