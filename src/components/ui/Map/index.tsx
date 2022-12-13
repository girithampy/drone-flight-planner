import React, { useRef, useEffect, useState } from 'react';

// Store
import { toogleSideBar } from "./../../../store/slices/appSlice";
import { addFlight, unSelectFlight } from "../../../store/slices/flightsSlice";
import { useStoreDispatch, useStoreSelector } from "./../../../store/hooks";
// Google map hook
import useGoogleMap from '../../../hooks/useGoogleMap';
// Icon
import PlusIcon from "../../../icons/svg/plus.svg"
import CheckIcon from "../../../icons/svg/check.svg"
// Styles
import './style.scss';

const Map: React.FC<{}> = () => {
    const dispatch = useStoreDispatch()
    const appState = useStoreSelector(state => state.appState)
    const state = useStoreSelector(state => state.flights)
    const ref = useRef<HTMLDivElement>(null);
    const [enableAddCordinates, setEnableAddCordinates] = useState<boolean>(false)
    const [flightCordinates, setFlightCordinates] = useState<google.maps.LatLngLiteral[]>([])

    /**
     * Function will get called when clicked on the map
     * @param mapsMouseEvent 
     * @returns 
     */
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

    /**
     * Function will enable mode to add cordinates in the map
     */
    const enableAddCordinateMode = () => {
        setEnableAddCordinates(true);
        setFlightCordinates([])
        dispatch(unSelectFlight())
        appState.sideBarOpen && dispatch(toogleSideBar())
    }

    /**
     * Function will update the add cordinates to the store
     */
    const onDone = () => {
        setEnableAddCordinates(false);
        if(flightCordinates.length > 0) {
            const _flightCordinates = flightCordinates.slice();
            dispatch(addFlight({ cordinates : _flightCordinates }))
            dispatch(toogleSideBar())
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
                {!enableAddCordinates && <div className='action' data-testid="map-add-action" onClick={enableAddCordinateMode}>
                    <img src={PlusIcon} />
                </div>}
                {enableAddCordinates && <div className='action' data-testid="map-done-action" onClick={onDone}>
                    <img src={CheckIcon} />
                </div>}
            </div>
        </div>
    );
}

export default Map;