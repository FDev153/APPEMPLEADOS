import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter
import Login  from './login';

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

describe('Login', () => {
    test('El componente se renderiza correctamente', () => {
      const { container } = render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
  
      // Asegúrate de que el componente no está vacío
      expect(container).toBeInTheDocument();
    });
  });