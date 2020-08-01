import React, { Component } from 'react';
import DatosCliente from './DatosCliente'
import { OBTENER_PRODUCTOS } from '../../queries';
import { Query } from 'react-apollo';
import '../../Spinner.css'
import ContenidoPedido from './ContenidoPedido'

class NuevoPedido extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <>
        <h1 className="text-center mb-5">Nuevo Pedido</h1>
        <div className="row">
          <div className="col-md-3">
            <DatosCliente id={ id } />
          </div>
          <div className="col-md-9">
            <Query query={OBTENER_PRODUCTOS} >
              {({ loading, error, data}) => {
                if(loading) return (
                  <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                )
                if(error) return `Error ${error}`
                return(
                  <ContenidoPedido
                    productos={data.obtenerProductos}
                    id={id}
                  />
                )
              }}
            </Query>
          </div>
        </div>
      </>
    );
  }
}

export default NuevoPedido;
