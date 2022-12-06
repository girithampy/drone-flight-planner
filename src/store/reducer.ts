import { combineReducers} from "@reduxjs/toolkit";

// Reducers
import flightReducer from "./flights/reducer";

export default combineReducers({
    flights : flightReducer
});