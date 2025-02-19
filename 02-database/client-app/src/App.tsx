import React from 'react';
import './App.css';
import Feature1 from './components/Feature1';
import Feature2 from './components/Feature2';
import Feature3 from './components/Feature3';


function App() {
  return (
    <>
      <h1>Feature Flags</h1>
      <div className="card">
        <Feature1 />
      </div>
      <div className="card">
        <Feature2 />
      </div>
      <div className="card">
        <Feature3 />
      </div>
    </>
  );
}

export default App;
