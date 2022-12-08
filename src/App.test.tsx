import React from 'react';
import { screen } from '@testing-library/react';
// test-utils
import { renderWithProviders } from "./utils/test-utils"

import App from './App';

describe('<App />', () => {
  test('it renders properly', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });
});
