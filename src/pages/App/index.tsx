import React from 'react';

// Components
import Header from "./../../components/ui/Header"
import SideBar from "./../../components/ui/SideBar"
import Map from "./../../components/ui/Map"

import './style.scss';

const App: React.FC<{}> = () => {
    // const flights = useStoreSelector(state => state.flights)
    // useEffect(() => {
    //   console.log("flights ",flights)
    // },[flights])
    return (
        <div className="app-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="body-container">
                <div className="side-bar-container">
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