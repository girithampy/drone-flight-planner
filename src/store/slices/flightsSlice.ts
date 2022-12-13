import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Interface
import { State, AddFlightPayload, SelectFlightPayload } from "../../interfaces/slices/FlightsSlice"
// Constant
import { MAP_DATA } from "../../utils/constant";

const initialState: State = {
    total: 0,
    currentFlightIndex: -1,
    data: [ ...MAP_DATA ]
};

const flightSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        addFlight: (state, action: PayloadAction<AddFlightPayload>) => {
            return {
                ...state,
                currentFlightIndex: -1,
                total: state.total + 1,
                data: [
                    ...state.data,
                    { name: `Flight ${state.data.length + 1}`, cordinates: action.payload.cordinates }
                ]
            };
        },
        selectFlight: (state, action: PayloadAction<SelectFlightPayload>) => {
            return {
                ...state,
                currentFlightIndex: action.payload.flightIndex
            }
        },
        unSelectFlight: (state) => {
            return {
                ...state,
                currentFlightIndex: -1
            }
        },
    }
});

export const { addFlight, selectFlight, unSelectFlight } = flightSlice.actions

export default flightSlice.reducer