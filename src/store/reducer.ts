import { combineReducers} from "@reduxjs/toolkit";

// Reducers
import appReducer from "./slices/appSlice";
import flightReducer from "./slices/flightsSlice";

export default combineReducers({
    appState : appReducer,
    flights : flightReducer,
});