const initialState = {
  players: [{
    name: 'ricky',
    point: 10,
  }],
  loading: false,
};
const reducer = (state = initialState, action) => {
  // console.log(actionTypes)
  if (action.type === 'ADD') {
    return {
      ...state,
      players: [...state.players, action.payload],
    };
  } if (action.type === 'LOADING') {
    return {
      ...state,
      loading: action.payload,
    };
  }
  return state;
};

export default reducer;
