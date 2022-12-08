import { act, render, screen } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
// test-utils
import { renderWithProviders } from "../../../utils/test-utils";

import SideBar from "./index";
import type { RootState } from '../../../store'

describe('<SideBar />', () => {
    let preloadedState: PreloadedState<RootState>;
    beforeEach(() => {
        preloadedState = {
            flights : {
                total: 0,
                currentFlightIndex: -1,
                data: []
            }
        }
    })
    test('It should not render flight list container if store state is empty', () => {
        renderWithProviders(<SideBar />,{ preloadedState});
        expect(screen.queryByTestId("sidebar-flight-list-container")).not.toBeInTheDocument();
    })
    test('It should render flight list container if store state is not empty', () => {
        preloadedState = {
            flights : {
                total: 1,
                currentFlightIndex: -1,
                data: [{
                    name : "Flight 1",
                    cordinates : []
                }]
            }
        }
        renderWithProviders(<SideBar />,{ preloadedState });
        expect(screen.getByTestId("sidebar-flight-list-container")).toBeInTheDocument();
    })
   
})