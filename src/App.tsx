import React from 'react';
// Page
import AppPage from "./pages/App";
import './App.scss';

function App() {
  return (
    <div className="container" data-testid="container">
      <AppPage />
    </div>
  );
}

export default App;
