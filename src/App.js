import React, { useState } from 'react';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>Burger Queen em construção!</h1>
      
    </div>
  );
}

function App2() {
  
  const [counter, setCounter] = useState(0)
  
  return (
    <>
      <p>{counter}</p>
      <button onClick= {() => setCounter(counter+1)}>Contador</button>
    </>
  );
}

export default App2;



