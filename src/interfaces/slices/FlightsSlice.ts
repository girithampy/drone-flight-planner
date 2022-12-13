import Flight from "../Flight";

// State
export interface State {
    total: number;
    currentFlightIndex: number;
    data: Array<Flight>;
}

// Action payloads
export interface AddFlightPayload {
    cordinates : google.maps.LatLngLiteral[]
}
export interface SelectFlightPayload {
    flightIndex : number
}

