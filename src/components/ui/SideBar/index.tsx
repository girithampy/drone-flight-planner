import React, { useEffect } from 'react';

// Store
import { useStoreSelector, useStoreDispatch } from "./../../../store/hooks";
import { toogleSideBar } from "./../../../store/slices/appSlice";
import { selectFlight } from "../../../store/slices/flightsSlice";

// Icon
import MapIcon from "../../../icons/svg/map.svg"

import './style.scss';

const SideBar: React.FC<{}> = () => {
    const dispatch = useStoreDispatch();
    const state = useStoreSelector(state => state.flights)

    /**
     * Function will select the flight plan and populate to map
     * @param index 
     */
    const onFlightPlanClick = (index: number) => {
        dispatch(selectFlight({ flightIndex : index }));
        dispatch(toogleSideBar());
    }
    return (
        <div className='sidebar'>
            <div className='image-section'>
                <span className='image-wrap'>
                    <img src={MapIcon} />
                </span>
            </div>
            {state.data.length === 0 && <div className='content-container' data-testid="sidebar-flight-empty-container">
                <div className='list-item empty-message'>
                    <label className='list-item-text'>No saved flight plans</label>
                </div>
            </div>}

            {state.data.length > 0 && <div className='content-container' data-testid="sidebar-flight-list-container">
                {React.Children.toArray(state.data.map((d,i) => (
                    <div className='list-item' onClick={() => onFlightPlanClick(i)}>
                        <label className='list-item-text'>{d.name}</label>
                    </div>
                )))}
            </div>}
        </div>
    )
}

export default SideBar;