import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
// test-utils
import { renderWithProviders } from "../../../utils/test-utils";

import Map from "./index";

describe('<Map />', () => {

    test('It should render Map component properly', () => {
        renderWithProviders(<Map />);
        expect(screen.getByTestId("map-view")).toBeInTheDocument();
        expect(screen.getByTestId("map-add-action")).toBeInTheDocument();
        expect(screen.queryByTestId("map-done-action")).not.toBeInTheDocument();
    })

    test('When click add action button it should show done action button and hide add action button and vice verse', async () => {
        renderWithProviders(<Map />);
        await act(() => {
            screen.getByTestId("map-add-action").click();
        })
        expect(screen.queryByTestId("map-add-action")).not.toBeInTheDocument();
        expect(screen.getByTestId("map-done-action")).toBeInTheDocument();
        await act(() => {
            screen.getByTestId("map-done-action").click();
        })
        expect(screen.getByTestId("map-add-action")).toBeInTheDocument();
        expect(screen.queryByTestId("map-done-action")).not.toBeInTheDocument();
    });
})