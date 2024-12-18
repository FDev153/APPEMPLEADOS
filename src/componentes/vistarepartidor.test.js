import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter
import VistaRepartidor from './vistarepartidor';

test('El componente VistaRepartidor se renderiza correctamente', () => {
  const mockPedidos = [
    {
      id_pedido: 1,
      estado: 'Listo',
      productos: [
        { producto_nombre: 'Hamburguesa', cantidad: 2 },
        { producto_nombre: 'Papas Fritas', cantidad: 1 },
      ],
      takeaway: '1',
    },
  ];

  const mockActualizarEstado = jest.fn();

  render(
    <BrowserRouter>
      <VistaRepartidor pedidos={mockPedidos} actualizarEstado={mockActualizarEstado} />
    </BrowserRouter>
  );

  // Verifica que el subtítulo "REPARTIDOR" se renderiza
  expect(screen.getByText('REPARTIDOR')).toBeInTheDocument();

  // Verifica que el primer pedido se muestra
  expect(screen.getByText('Pedido N° 1')).toBeInTheDocument();

  // Verifica que los productos del pedido se muestran
  expect(screen.getByText('Hamburguesa')).toBeInTheDocument();
  expect(screen.getByText('Papas Fritas')).toBeInTheDocument();

  // Verifica que el botón "Listo" está presente
  expect(screen.getByText('Listo')).toBeInTheDocument();
});
