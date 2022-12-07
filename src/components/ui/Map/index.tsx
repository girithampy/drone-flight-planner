import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

// Store
import { addFlight } from "./../../../store/flights/actions";
import { useStoreDispatch, useStoreSelector } from "./../../../store/hooks";
// Google map hook
import useGoogleMap from '../../../hooks/useGoogleMap';
// Config
import config from "../../../config";

import './style.scss';

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

const Map: React.FC<{}> = () => {
    const dispatch = useStoreDispatch()
    const state = useStoreSelector(state => state.flights)
    const ref = useRef<HTMLDivElement>(null);
    const [enableAddCordinates, setEnableAddCordinates] = useState<boolean>(false)
    const [flightCordinates, setFlightCordinates] = useState<google.maps.LatLngLiteral[]>([])
    

    const onMapClicked = (mapsMouseEvent: google.maps.MapMouseEvent) => {
        if (!enableAddCordinates || !mapsMouseEvent.latLng) {
            return;
        }
        const _flightCordinates = flightCordinates.slice();
        _flightCordinates.push(mapsMouseEvent.latLng?.toJSON());
        setFlightCordinates(_flightCordinates)
    }

    const { addFlightPlanCordinates } = useGoogleMap(ref,{
        onClick : onMapClicked
    });

    const onDone = () => {
        setEnableAddCordinates(false);
        const _flightCordinates = flightCordinates.slice();
        dispatch(addFlight(_flightCordinates))
        setFlightCordinates([])
    }

    useEffect(() => {
        if(flightCordinates.length > 0) {
            addFlightPlanCordinates(flightCordinates)
        }else if(state.currentFlightIndex > -1) {
            addFlightPlanCordinates(state.data[state.currentFlightIndex].cordinates)
        }else {
            addFlightPlanCordinates([])
        }
    },[flightCordinates, state.currentFlightIndex, state.data])
    
    return (
        <div className="map-view-container">
            <div className='map-view' ref={ref} />
            <div className="action-container">
                {!enableAddCordinates && <button onClick={() => setEnableAddCordinates(true)}>Add flight planner</button>}
                {enableAddCordinates && <button onClick={onDone}>Done</button>}
            </div>
        </div>
    );
}

export default () => (
    <Wrapper apiKey={config.GOOGLE_API_KEY} render={render}>
        <Map />
    </Wrapper>
)