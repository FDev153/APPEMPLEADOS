import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './componentes/login';
import VistaCocinero from './componentes/vistacocinero';
import VistaEncargado from './componentes/vistaencargado';
import VistaRepartidor from './componentes/vistarepartidor';
import axios from 'axios';
import { PHPESTADO, PHPTODOSPEDIDOS } from './datos/Datos.js';

function App() {
  const [todospedidos, setTodospedidos] = useState([]);

  const estadopedido = (id_pedido, estado_pedido) => {
    axios
      .put(PHPESTADO, JSON.stringify({ id_pedido: id_pedido, estado_pedido: estado_pedido }))
      .then(() => {
   
        const nuevosPedidos = todospedidos.map((pedido) =>
          pedido.id_pedido === id_pedido
            ? { ...pedido, estado: estado_pedido }
            : pedido
        );
        setTodospedidos(nuevosPedidos);
      })
      .catch((error) => {
        console.error('Error al actualizar el estado del pedido:', error);
      });
  };


  const cargarPedidos = () => {
    axios
      .get(PHPTODOSPEDIDOS)
      .then((response) => {
        setTodospedidos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener todos los pedidos:', error);
      });
  };


  useEffect(() => {
    cargarPedidos();

  
    const intervalo = setInterval(cargarPedidos, 5000);

   
    return () => clearInterval(intervalo);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/cocinero" 
          element={<VistaCocinero pedidos={todospedidos} actualizarEstado={estadopedido} />} 
        />
        <Route 
          path="/encargado" 
          element={<VistaEncargado pedidos={todospedidos} actualizarEstado={estadopedido} />} 
        />
        <Route 
          path="/repartidor" 
          element={<VistaRepartidor pedidos={todospedidos} actualizarEstado={estadopedido} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

