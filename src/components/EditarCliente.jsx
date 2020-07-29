import React, { Component } from 'react';
import { CLIENTE_QUERY } from '../queries';
import { Query } from 'react-apollo';
import FormularioEditarCliente from './FormularioEditarCliente'

class EditarCliente extends Component {
  state = {}
  render() {
    const { id } = this.props.match.params
    return (
      <>
        <h2 className="text-center">Editar Cliente</h2>
        <div className="row justify-content-center mt-4">
          <Query query={CLIENTE_QUERY} variables={{id}}>
            {({loading, error, data}) => {
              if(loading) return 'Cargando...';
              if(error) return `Error ${error.message}`
              return (
                <FormularioEditarCliente
                  cliente={data.getCliente}
                />
              )
            }}
          </Query>
        </div>
      </>
    );
  }
}

export default EditarCliente;
