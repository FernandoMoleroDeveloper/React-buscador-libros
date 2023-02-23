import './App.css';
import Buscador from './components/Buscador/Buscador';
import React from 'react';


function App() {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className="App">
      <h1>Buscador de la libreria The Valley</h1>
      <button onClick={ ()=> setVisible(!visible) }>Mostrar / ocultar buscador</button>
      { visible ? <Buscador></Buscador> : '' }
    </div>
    );
}

export default App;

