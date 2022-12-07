import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as types from "./types";

interface Flight {
    name: string;
    cordinates: google.maps.LatLngLiteral[]
}
interface Flights {
    total: number;
    currentFlightIndex: number;
    data: Array<Flight>;
}


const initialState: Flights = {
    total: 0,
    currentFlightIndex: -1,
    data: []
};

export default (state = initialState, action: PayloadAction<google.maps.LatLngLiteral[]>) : Flights => {
    switch (action.type) {
        case types.ADD_FLIGHT:
            return {
                ...state,
                currentFlightIndex: -1,
                total: state.total + 1,
                data: [
                    ...state.data,
                    { name: `Flight ${state.data.length + 1}`, cordinates: action.payload }
                ]
            };
        case types.SELECT_FLIGHT:
            return {
                ...state,
                currentFlightIndex : Number(action.payload)
            }
        default:
            return state;
    }
};