import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

import './vistas.css';
const VistaRepartidor = ({ pedidos, actualizarEstado }) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Listo');


    const actualizar = (id, estado) => {
        if (estado === 'En curso') {
            actualizarEstado(id, 'Listo')
        } else {
            actualizarEstado(id, 'Terminado')
        }
    }

    const renderPedidos = (estado) =>
        pedidos
            .filter((pedido) => pedido.estado === estado && pedido.takeaway === '1')
            .map((pedido) => {
                let estadoClase;
                if (pedido.estado === 'En curso') {
                    estadoClase = 'en-curso';
                } else if (pedido.estado === 'Listo') {
                    estadoClase = 'listo';
                } else if (pedido.estado === 'Terminado') {
                    estadoClase = 'terminado';
                }

                return (
                    <div key={pedido.id_pedido} className="pedido-card">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h2"><div>
                                    Pedido N° {pedido.id_pedido}</div>
                                    <hr></hr>
                                </CardTitle>
                                <CardText>
                                    <div className="productos-pedido">
                                        {pedido.productos.map((producto, index) => (
                                            <div key={index} className="producto-carta">
                                                <li>{producto.producto_nombre}</li>
                                                <span>{producto.cantidad}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardText>
                                <CardSubtitle className="mb-2 text-muted" tag="h6">
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                        <div className='botones-accion'>
                            <span className="pedido-tipo">
                                {pedido.takeaway === '0' ? 'A Recoger' : 'Domicilio'}

                            </span>
                            <button
                                disabled={pedido.takeaway === '0' || pedido.estado === "En curso"}
                                className={`estado-boton ${estadoClase}`}
                                onClick={() => actualizar(pedido.id_pedido, pedido.estado)}
                            >
                                {pedido.estado === 'En curso' && 'En Curso'}
                                {pedido.estado === 'Terminado' && 'Terminado'}
                                {pedido.estado === 'Listo' && 'Listo'}
                            </button>
                        </div>
                    </div>
                )
            });

    return (
        <div className="vista-cocinero">
            <div className='header'>
                <div className='tituloprincipal'>
                    <Link to="/">
                        <img
                            className='logoimagen'
                            src={`${process.env.PUBLIC_URL}/logo.png`}
                            alt="Logo"
                        />
                    </Link>

                    <h1>Empleados</h1>
                </div>
                <div className='titulosecundario'>
                    <span>REPARTIDOR</span>
                    <img src={`${process.env.PUBLIC_URL}/repartidor.png`} alt='Imagen de cocinero' />
                </div>
            </div>

            <div className="botones-container">
                <button
                    className={estadoSeleccionado === 'Listo' ? 'activo' : ''}
                    onClick={() => setEstadoSeleccionado('Listo')}
                >
                    Pedidos Listos
                </button>
                <button
                    className={estadoSeleccionado === 'Terminado' ? 'activo' : ''}
                    onClick={() => setEstadoSeleccionado('Terminado')}
                >
                    Pedidos Terminados
                </button>
            </div>

            <div className="pedidos-lista">
                {renderPedidos(estadoSeleccionado)}
            </div>
        </div>
    );
};

export default VistaRepartidor;