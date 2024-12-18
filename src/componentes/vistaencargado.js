//Vista que tendra el empleado tipo encargado
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import './vistas.css';

const VistaEncargado = ({ pedidos, actualizarEstado }) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('En curso');
    const [tipoSeleccionado, setTipoSeleccionado] = useState('todos');

    const actualizar = (id, estado) => {
        if (estado === 'En curso') {
            actualizarEstado(id, 'Listo')
        } else {
            actualizarEstado(id, 'Terminado')
        }
    }

    //Manejo los pedidos correspondientes
    const renderPedidos = (estado) =>
        pedidos
            .filter(
                (pedido) =>
                    pedido.estado === estado &&
                    (tipoSeleccionado === 'todos' ||
                        (tipoSeleccionado === 'domicilio' && pedido.takeaway === "1") ||
                        (tipoSeleccionado === 'recoger' && pedido.takeaway === "0"))
            )
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
                                <CardTitle tag="h2">
                                    <div>
                                        Pedido N° {pedido.id_pedido}
                                    </div>
                                    <hr />
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
                                <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
                            </CardBody>
                        </Card>
                        <div className="botones-accion">
                            <span className="pedido-tipo">
                                {pedido.takeaway === '0' ? 'A Recoger' : 'Domicilio'}

                            </span>
                            <button
                                disabled={pedido.takeaway === '1' || pedido.estado === "En curso"}
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
            })
        ;

    return (
        <div className="vista-cocinero">
            <div className="header">
                <div className="tituloprincipal">
                    <Link to="/">
                        <img
                            className='logoimagen'
                            src={`${process.env.PUBLIC_URL}/logo.png`}
                            alt="Logo"
                        />
                    </Link>
                    <h1>Empleados</h1>
                </div>
                <div className="titulosecundario">
                    <span>ENCARGADO</span>
                    <img
                        src={`${process.env.PUBLIC_URL}/encargado.png`}
                        alt="Imagen de cocinero"
                    />
                </div>
            </div>

            <div className="botones-container">
                <button
                    className={estadoSeleccionado === 'En curso' ? 'activo' : ''}
                    onClick={() => setEstadoSeleccionado('En curso')}
                >
                    Pedidos en Curso
                </button>
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

            {estadoSeleccionado === 'Listo' && (
                <div className="botones-encargado">
                    <button
                        className={tipoSeleccionado === 'recoger' ? 'activo' : ''}
                        onClick={() => setTipoSeleccionado('recoger')}
                    >
                        A Recoger
                    </button>
                    <button

                        className={tipoSeleccionado === 'todos' ? 'activo' : ''}
                        onClick={() => setTipoSeleccionado('todos')}
                    >
                        Todos
                    </button>
                    <button

                        className={tipoSeleccionado === 'domicilio' ? 'activo' : ''}
                        onClick={() => setTipoSeleccionado('domicilio')}
                    >
                        A Domicilio
                    </button>
                </div>
            )}

            <div className="pedidos-lista">
                {renderPedidos(estadoSeleccionado)}
            </div>
        </div>
    );
};

export default VistaEncargado;
