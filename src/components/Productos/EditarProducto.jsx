import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PRODUCTO } from '../../queries';
import FormularioEditarProducto from './FormularioEditarProducto'

class EditarProducto extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <>
        <h1 className="text-center">Editar Producto</h1>
        <div className="row justify-content-center">
          <Query query={OBTENER_PRODUCTO} variables={{ id }}>
            {({ loading, error, data}) => {
              if(loading) return 'Cargando...'
              if(error) return `Error ${error.message}`

              return (
                <FormularioEditarProducto
                  producto={data}
                  id={id}
                />
              )
            }}
          </Query>
        </div>
      </>
    );
  }
}

export default EditarProducto;
