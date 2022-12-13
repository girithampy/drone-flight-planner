import { useState, useEffect, RefObject } from 'react';
// Interface
import { GoogleMapOptionProps, GoogleMap} from "../interfaces/Hooks";

const mapOptions: google.maps.MapOptions = {
    zoom: 13,
    center: { lat: 52.50517435658768, lng: 13.395197426012093 },
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl : false,
    scaleControl: false,
    zoomControl: true,
    clickableIcons : false
}

let flightPath: google.maps.Polyline;

const useGoogleMap = (ele: RefObject<HTMLDivElement>, options?: GoogleMapOptionProps): GoogleMap => {
    const [map, setMap] = useState<google.maps.Map>();

    // Hook will load the google map on the dom
    useEffect(() => {
        if (ele.current && !map) {
            setMap(new window.google.maps.Map(ele.current, {
                ...mapOptions,  
                zoomControlOptions: {
                    position: google?.maps.ControlPosition.TOP_RIGHT,
                },
            }));
        }
    }, [ele, map])

    useEffect(() => {
        if (map) {
            options?.onClick && map.addListener("click", options.onClick);
        }
        return () => map && google.maps.event.clearInstanceListeners(map);
    }, [ options, map])

    /**
     * Function will plot path according to the given cordinates
     * */ 
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