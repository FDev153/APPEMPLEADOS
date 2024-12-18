import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter
import VistaCocinero from './vistacocinero';

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

describe('VistaCocinero', () => {
  test('El componente se renderiza correctamente', () => {
    const pedidosMock = [
      {
        id_pedido: 1,
        estado: 'En curso',
        productos: [{ producto_nombre: 'Hamburguesa', cantidad: 2 }],
        takeaway: '0',
      },
      {
        id_pedido: 2,
        estado: 'Listo',
        productos: [{ producto_nombre: 'Papas Fritas', cantidad: 1 }],
        takeaway: '1',
      },
    ];

    const actualizarEstadoMock = jest.fn();

    render(
      <BrowserRouter>
        <VistaCocinero pedidos={pedidosMock} actualizarEstado={actualizarEstadoMock} />
      </BrowserRouter>
    );

    // Verificar que el título principal esté en el documento
    expect(screen.getByText(/Empleados/i)).toBeInTheDocument();

    // Verificar que se muestre al menos un pedido
    expect(screen.getByText(/Pedido N° 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Hamburguesa/i)).toBeInTheDocument();
  });
});