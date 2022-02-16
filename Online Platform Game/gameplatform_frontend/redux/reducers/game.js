const initialState = {
  round: 2,
  scoreSelf: 0,
  scoreComp: 0,
  maxround: 3,
  stateResult: 'MENANG',
  games: [
    {
      id: 1,
      name: 'games 1',
      leaderboarddummy: [{
        name: 'ricky',
        score: 10,
      }],
    },
  ],
};
const reducer = (state = initialState, action) => {
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
