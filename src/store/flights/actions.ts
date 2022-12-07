import { PayloadAction } from '@reduxjs/toolkit'
import * as types from "./types";

export const addFlight = (payload: google.maps.LatLngLiteral[]) => ({
    type: types.ADD_FLIGHT,
    payload
});

export const selectFlight = (payload: number) => ({
    type: types.SELECT_FLIGHT,
    payload
});
  