import React, { useRef, useEffect, useState, useCallback } from 'react';

// Store
import { addFlight } from "./../../../store/flights/actions";
import { useStoreDispatch, useStoreSelector } from "./../../../store/hooks";
// Google map hook
import useGoogleMap from '../../../hooks/useGoogleMap';
// Config
import config from "../../../config";

import './style.scss';

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
        if(flightCordinates.length > 0) {
            const _flightCordinates = flightCordinates.slice();
            dispatch(addFlight(_flightCordinates))
            setFlightCordinates([])
        }
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
            <div className='map-view' ref={ref} data-testid="map-view"/>
            <div className="action-container">
                {!enableAddCordinates && <button onClick={() => setEnableAddCordinates(true)} data-testid="map-add-action">Add flight planner</button>}
                {enableAddCordinates && <button onClick={onDone} data-testid="map-done-action">Done</button>}
            </div>
        </div>
    );
}

export default Map;