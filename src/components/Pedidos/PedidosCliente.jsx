import React from 'react';
import{ Query } from 'react-apollo';
import { OBTENER_PEDIDOS } from '../../queries';
import '../../Spinner.css'
import Pedido from './Pedido';
import { Link } from 'react-router-dom';

export default function PedidosCliente(props) {
  const cliente = props.match.params.id

  return (
    <>
      <h1 className="text-center mb-5">Pedidos del Cliente</h1>
      <Link to="/clientes">
        <button type="button" className="btn btn-danger mb-3">
          Cancelar
        </button>
      </Link>
      <div className="row">
        <Query query={OBTENER_PEDIDOS} variables={{cliente}} pollInterval={500}>
          {({loading, error, data, startPolling, stopPolling}) => {
            if(loading) return (
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            )
            if(error) return `Error ${error.message}`;
            return (
              data.obtenerPedidos.map(pedido => (
                <Pedido
                  key={pedido.id}
                  pedido={pedido}
                  cliente={cliente}
                />
              ))
            )
          }}
        </Query>
      </div>
    </>
  )
}
