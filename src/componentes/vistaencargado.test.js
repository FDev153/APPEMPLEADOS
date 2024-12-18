import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter
import VistaEncargado  from './vistaencargado';

// Desactivar las advertencias de deprecación de `act` y el error de importación
beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation((message) => {
    if (
      !message.includes('Warning: `ReactDOMTestUtils.act` is deprecated') &&
      !message.includes('Cannot use import statement outside a module')
    ) {
      console.error(message);  // Solo muestra otros errores
    }
  });
});

afterAll(() => {
  console.error.mockRestore(); // Restaurar después de que terminen las pruebas
});


test('El componente VistaEncargado se renderiza correctamente', () => {
  const mockPedidos = [
    {
      id_pedido: 1,
      estado: 'En curso',
      productos: [
        { producto_nombre: 'Producto 1', cantidad: 2 },
        { producto_nombre: 'Producto 2', cantidad: 1 },
      ],
      takeaway: '0',
    },
  ];

  const mockActualizarEstado = jest.fn();

  render(
    <BrowserRouter>
      <VistaEncargado pedidos={mockPedidos} actualizarEstado={mockActualizarEstado} />
    </BrowserRouter>
  );

  // Verifica que el título "Empleados" se renderiza
  expect(screen.getByText('Empleados')).toBeInTheDocument();

  // Verifica que el primer pedido se muestra
  expect(screen.getByText('Pedido N° 1')).toBeInTheDocument();

  // Verifica que los productos del pedido se muestran
  expect(screen.getByText('Producto 1')).toBeInTheDocument();
  expect(screen.getByText('Producto 2')).toBeInTheDocument();
});