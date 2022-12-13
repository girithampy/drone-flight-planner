import React, { useState } from 'react';

// Components
import Header from "./../../components/ui/Header"
import SideBar from "./../../components/ui/SideBar"
import Map from "./../../components/ui/Map"

// Store
import { useStoreSelector } from "./../../store/hooks";

import './style.scss';

const App: React.FC<{}> = () => {
    const state = useStoreSelector(state => state.appState)
    return (
        <div className="app-container">
            <Header/>
            <div className="body-container">
                <div className={`side-bar-container ${state.sideBarOpen && 'open'}`}>
                    <SideBar />
                </div>
                <div className="map-container">
                    <Map />
                </div>
            </div>
            
        </div>
    )
}

export default App;