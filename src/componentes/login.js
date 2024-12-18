//Login de la aplicacion donde podras elegir la vista de cada usuario
import { Link } from 'react-router-dom';
import '../App.css';

function Login() {
  
  return (
    <div className="App">
      <div className="login-container">
        <img  src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo" />
        <h1>LOGIN</h1>
        <div className="buttons">
          <Link to="/cocinero">
            <button className="login-button">COCINERO</button>
          </Link>
          <Link to="/encargado">
            <button className="login-button">ENCARGADO PEDIDO</button>
          </Link>
          <Link to="/repartidor">
            <button className="login-button">REPARTIDOR</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
