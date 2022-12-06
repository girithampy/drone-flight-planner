import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as types from "./types";

interface Flights {
    total: number;
    data: Array<any>;
}


const initialState: Flights = {
    total: 0,
    data: []
};

export default (state = initialState, action: PayloadAction<number>) => {
    switch (action.type) {
        case types.ADD_FLIGHT:
            state.total += 1;
            state.data.push(action.payload);
            return state;
        default:
            return state;
    }
};