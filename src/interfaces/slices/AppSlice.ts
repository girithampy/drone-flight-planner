
// State
export interface State {
    sideBarOpen : boolean;
}

// Action payloads
export interface AddFlightPayload {
    cordinates : google.maps.LatLngLiteral
}