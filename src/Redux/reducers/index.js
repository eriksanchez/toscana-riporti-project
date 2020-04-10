import { combineReducers } from "redux";

import OperatoreReducer from "./OperatoreReducer";
import BarcodeReducer from "./BarcodeReducer";
import TimeStampReducer from "./TimeStampReducer";

const rootReducer = combineReducers({
  Operatore: OperatoreReducer,
  Barcode: BarcodeReducer,
  TimeStamp: TimeStampReducer
});

export default rootReducer;
