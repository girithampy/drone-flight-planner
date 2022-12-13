import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Interface
import { State } from "../../interfaces/slices/AppSlice"

const initialState: State = {
    sideBarOpen : false,
};

const appSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        toogleSideBar: (state) => {
            return {
                ...state,
                sideBarOpen : !state.sideBarOpen
            };
        }
    }
});

export const { toogleSideBar } = appSlice.actions

export default appSlice.reducer