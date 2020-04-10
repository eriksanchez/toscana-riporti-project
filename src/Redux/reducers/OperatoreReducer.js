const initialState = {
  OperatoreList: [],
  OperatoreSelected: null
};

const OperatoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_OPERATORE":
      return {
        ...state,
        OperatoreList: action.payload
      };
    case "SELECT_OPERATORE":
      return {
        ...state,
        OperatoreSelected: action.payload
      };
    default:
      return state;
  }
};

export default OperatoreReducer;
