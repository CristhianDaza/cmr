import React from 'react';
import{ Query } from 'react-apollo';
import { OBTENER_PEDIDOS, CLIENTE_QUERY } from '../../queries';
import '../../Spinner.css'
import Pedido from './Pedido';
import { Link } from 'react-router-dom';

export default function PedidosCliente(props) {
  const cliente = props.match.params.id
  const id = props.match.params.id
  return (
    <>
      <Query query={CLIENTE_QUERY} variables={{id}} pollInterval={500}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if(loading) return 'Cargando...'
          if(error) return `Error: ${error.message}`;
          const { nombre, apellido  } = data.getCliente;
          return (
            <h1 className="text-center mb-5">Pedidos de {nombre} {apellido}</h1>
          )
        }}
      </Query>
      <Link to="/clientes">
        <button type="button" className="btn btn-info mb-3">
          Volver
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
