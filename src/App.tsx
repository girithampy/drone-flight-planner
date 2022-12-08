import React from 'react';
import './App.scss';

// Page
import AppPage from "./pages/App";

function App() {
  return (
    <div className="container" data-testid="container">
      <AppPage />
    </div>
  );
}

export default App;
