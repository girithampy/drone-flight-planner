import { useState, useEffect, RefObject } from 'react';

const mapOptions: google.maps.MapOptions = {
    zoom: 12,
    center: { lat: 52.50517435658768, lng: 13.395197426012093 },
    mapTypeId: "terrain",
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false
}

interface useGoogleMapOptionPropsInterface {
    onClick?: Function | undefined
}
interface useGoogleMapInterface {
    map: google.maps.Map | undefined;
    addFlightPlanCordinates: Function;
}

let flightPath: google.maps.Polyline;

const useGoogleMap = (ele: RefObject<HTMLDivElement | undefined>, options?: useGoogleMapOptionPropsInterface | undefined): useGoogleMapInterface => {

    const [map, setMap] = useState<google.maps.Map>();

    // Hook will load the google map on the dom
    useEffect(() => {
        if (ele.current && !map) {
            setMap(new window.google.maps.Map(ele.current, mapOptions));
        }
    }, [ele, map])

    useEffect(() => {
        if (map) {
            options?.onClick && map.addListener("click", options.onClick);
        }
        return () => map && google.maps.event.clearInstanceListeners(map);
    }, [ options, map])

    // Function will plot path according to the given cordinates
    const addFlightPlanCordinates = (cordinates: google.maps.LatLng[]) => {
        if (map) {
            flightPath && flightPath.setMap(null);
            if(cordinates.length > 0){
                flightPath = new google.maps.Polyline({
                    path: cordinates,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });
                flightPath.setMap(map);
            }
        }
    };

    return {
        map,
        addFlightPlanCordinates
    };
}

export default useGoogleMap