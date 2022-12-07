import React from 'react';

// Store
import { selectFlight } from "./../../../store/flights/actions";
import { useStoreSelector, useStoreDispatch } from "./../../../store/hooks";

import './style.scss';


const SideBar: React.FC<{}> = () => {
    const dispatch = useStoreDispatch();
    const state = useStoreSelector(state => state.flights)

    return (
        <div className='sidebar'>
            <h2>Sidebar</h2>
            <div className='list-container'>
                {React.Children.toArray(state.data.map((d,i) => (
                    <label onClick={() => dispatch(selectFlight(i))}>{d.name}</label>
                )))}
            </div>
        </div>
    )
}

export default SideBar;