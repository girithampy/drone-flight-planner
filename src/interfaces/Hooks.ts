export interface GoogleMapOptionProps {
    onClick?: Function | undefined
}

export interface GoogleMap {
    map: google.maps.Map | undefined;
    addFlightPlanCordinates: Function;
}


export interface Location {
    loading: boolean;
    position: GeolocationPosition | undefined;
    findMyLocation: Function
}