import { MutableRefObject, useRef } from 'react'
import {renderHook, act, RenderHookResult} from '@testing-library/react'

import useGoogleMap from "./useGoogleMap";
import type { GoogleMap } from "./../interfaces/Hooks";


describe('useGoogleMap', () => {
    test('It initialized correctly', () => {
        const eleHTMLDivElement = document.createElement('div');
        const { result } = renderHook(() => {
            const elementRef = useRef<HTMLDivElement>(eleHTMLDivElement);
            return useGoogleMap(elementRef)
        }) as RenderHookResult<GoogleMap, HTMLDivElement>;
        expect(result.current).toHaveProperty('map')
        expect(result.current).toHaveProperty('addFlightPlanCordinates')
        expect(result.current.map).not.toBeUndefined();
    });
});