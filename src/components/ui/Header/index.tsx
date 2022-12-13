import React, { useEffect } from 'react';
import './style.scss';
// Store
import { useStoreDispatch } from "./../../../store/hooks";
import { toogleSideBar } from "./../../../store/slices/appSlice";
// Icon
import ListIcon from "../../../icons/svg/list.svg"

const Header: React.FC<{}> = ({ }) => {
    const dispatch = useStoreDispatch();
    return (
        <div className='header-container'>
            <div className='title-section'>
                <span className='menu-icon icon' onClick={() => dispatch(toogleSideBar())}>
                    <img src={ListIcon} className="img" alt="menu"/>
                </span>
                <h2 className='title'>Drone Flight Planner</h2>
            </div>
        </div>
    )
}

export default Header;