const initialState = {
  startTimeAttrezzaggio: "",
  sospendiLog: [],
  riprendiLog: [],
  completatoAttrezzaggio: ""
};

const TimeStampReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_START_ATTREZZAGGIO":
      return {
        ...state,
        startTimeAttrezzaggio: action.payload
      };
    case "ADD_SOSPENDI_DATE":
      return {
        ...state,
        sospendiLog: [...state.sospendiLog, action.payload]
      };
    case "ADD_RIPRENDI_DATE":
      return {
        ...state,
        riprendiLog: [...state.riprendiLog, action.payload]
      };
    case "SET_COMPLETATO_ATTREZZAGGIO":
      return {
        ...state,
        completatoAttrezzaggio: action.payload
      };
    default:
      return state;
  }
};

export default TimeStampReducer;
